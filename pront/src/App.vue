<template>
  <div class="app">
    <div class="container">
      <div class="borderbox">
        <div class="circle">
          <div class="n_counting">
            <span class="counting_text">{{ counting }}</span>
          </div>
        </div>
        <div class="title">
          <h1 class="computer">{{ computer_text }}</h1>
        </div>
        <div class="inpos">
          <input
            type="text"
            class="new-input"
            placeholder="단어를 입력하세요"
            @keypress.enter="submit(this.usertext)"
            v-model="usertext"
          />
        </div>
        <div class="btnwap">
          <button @click="random_text">상대방 먼저 시작</button>
        </div>
        <!-- 패배창 -->
        <popup_component
          class="popup"
          v-if="popup_state"
          v-on:close="close_popup"
          :reason="reason"
          :result="popup_type"
          :poptext="poptext"
        ></popup_component>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import popup_component from "./components/popup.vue";

export default {
  name: "App",
  components: {
    popup_component,
  },
  data() {
    return {
      computer_text: "상대방", //컴퓨터의 텍스트
      usertext: "", //사용자의 텍스트
      texts: [], //중복 검사를 위한 배열
      popup_state: false, //패배창
      popup_type: false,
      reason: "", //패배창 설명
      counting: 0, //몇번 티키타카했는지
      poptext: "",
    };
  },

  methods: {
    async submit(usertext) {
      if (this.counting == 0) {
        this.counting += 1;
        let data = await this.search_text(usertext);
        this.texts.push(data);
        this.computer_text = data;
      } else {
        this.counting += 1;
        this.userlose_Check(usertext);
        let data = await this.search_text(usertext);
        this.texts.push(data);
        this.computer_text = data;
      }
      // console.log(data);
    },

    overlap_check(text) {
      for (const arr of this.texts) {
        if (text == arr) {
          return true;
        }
      }
      this.texts.push(text);
    },

    split_text(text, splitType) {
      if (splitType == 1) {
        let splitText = text.split("");
        let lastText = splitText[Number(splitText.length) - 1];
        return lastText;
      } else if (splitType == 0) {
        let splitText = text.split("");
        let lastText = splitText[0];
        this.usertext = "";
        return lastText;
      }
    },
    async random_text() {
      let text = await axios.get("http://localhost:3000/random");
      this.computer_text = text.data;
    },
    async search_text(usertext) {
      let text = this.split_text(usertext, 1);
      let req_text = await axios.get(
        `http://localhost:3000/search?text=${text}`
      );
      let data = req_text.data.replace(/(\r\n|\n|\r|\t)/gm, "");
      if (this.overlap_check(data)) {
        this.show_popup(
          "상대방이 중복된 단어를 말했습니다!",
          true,
          this.computer_text
        );
      } else if (data == "lose") {
        this.show_popup(
          "상대방이 단어를 찾지못했습니다.",
          true,
          this.computer_text
        );
      }
      while (data == usertext) {
        req_text = await axios.get(`http://localhost:3000/search?text=${text}`);
        data = req_text.data.replace(/(\r\n|\n|\r|\t)/gm, "");
      }
      return data;
    },
    userlose_Check(usertext) {
      let text = this.split_text(usertext, 0);
      if (this.overlap_check(usertext) == true) {
        this.show_popup("이미 입력된 단어입니다", false, this.usertext);
      } else if (text != this.split_text(this.computer_text, 1)) {
        this.show_popup(
          "끝음절로 시작하는 단어가 아닙니다",
          false,
          this.usertext
        );
      }
    },
    show_popup(msg, type, text) {
      this.popup_state = true;
      this.reason = msg;
      this.popup_type = type;
      this.poptext = text;
    },
    close_popup() {
      location.reload();
    },
    time_count() {
      let count;
      for (count = 0; count < 10; count++) {
        setTimeout(() => {
          console.log(count);
        }, 1000);
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
  background: #000c29;
}

.popup {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  position: fixed;
}

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.borderbox {
  width: 900px;
  height: 500px;
  background: #081636;
  border-radius: 20px;
  /* flex  */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 11px 12px 0px 11px #000018;
  /* overflow: hidden; */
}
button {
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 5px;
  background: rgb(52, 58, 64);
  padding: 10px;
  box-shadow: 0px 0px 40px 3px #000018;
  transition: all 1s;
  margin-top: 50px;
}
button:hover {
  background: rgb(45 97 151);
}
button:active {
  background: rgb(186 220 255);
}
.new-input {
  width: 500px;
  border: none;
  background: none;
  border-bottom: 1px solid #ffca00;
  text-align: center;
  color: white;
  padding: 10px;
  font-size: 30px;
}

.new-input:focus {
  outline: none;
}
.computer {
  font-size: 50px;
  font-weight: bold;
  color: #ffca00;
  /* position: absolute;
  top: 220px; */
}
.n_counting {
  position: relative;
  top: -43px;
  font-size: 30px;
  background: #ffca00;
  border-radius: 100%;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.counting_text {
  color: black;
  position: relative;
  bottom: -22px;
}
.circle {
  height: 110px;
  position: relative;
  bottom: 55px;
  overflow: hidden;
}
.title {
  position: relative;
  bottom: 90px;
}

.inpos {
  position: relative;
  bottom: 40px;
}
.btnwap {
  position: relative;
  bottom: 30px;
}

@media screen and (max-width: 610px) {
  .new-input {
    width: 400px;
  }
}
</style>
