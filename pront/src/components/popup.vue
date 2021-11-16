<template>
  <div>
    <div v-if="result == 0" class="lose">
      <div class="pop_container">
        <div class="pop_borderBox">
          <h1 class="Over_text">Game</h1>
          <h1 class="Over_text Over_stick">Over</h1>
          <div class="sub_text">
            <h2 class="reason_title lose-text">패배 사유</h2>
            <p class="reason">{{ reason }}</p>
            <p class="text">입력한 단어 [{{ poptext }}]</p>
            <p @click="close_popup" class="exit">종료하려면 클릭하세요</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="result == 1" class="win">
      <div class="pop_container">
        <div class="pop_borderBox">
          <h1 class="Over_text">Your</h1>
          <h1 class="Over_text Over_stick">victory!</h1>
          <div class="sub_text">
            <h2 class="reason_title win-text">승리 사유</h2>
            <p class="reason">{{ reason }}</p>
            <p class="text">상대방이 말한 단어 [ {{ poptext }} ]</p>
            <p @click="close_popup" class="exit">종료하려면 클릭하세요</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "popup",
  props: ["reason", "result", "poptext"],
  data() {
    return {
      state: this.pop_state,
    };
  },
  methods: {
    close_popup() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.pop_container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pop_borderBox {
  width: 300px;
  background: #000c29;
  border: 4px solid white;
  border-radius: 20px;
}
.Over_text {
  text-align: center;
  font-size: 40px;
  position: relative;
  top: 10px;
  color: #ffca00;
}
.Over_stick {
  padding-bottom: 20px;
  border-bottom: 2px solid #ffca00;
  width: 250px;
  margin: auto;
  margin-top: -20px;
}
.sub_text {
  color: white;
  text-align: center;
  margin-top: 30px;
}
.reason_title {
  font-size: 25px;
}
.lose-text {
  color: #ff4e4e;
}
.win-text {
  color: #79ff4e;
}
.exit {
  color: #999;
  font-size: 15px;
  margin-top: 20px;
  transition: all 0.5s;
}

.exit:hover {
  font-weight: bold;
  font-size: 16px;
  color: rgb(240, 240, 240);
}
.reason {
  font-size: 18px;
  font-weight: bold;
}
</style>
