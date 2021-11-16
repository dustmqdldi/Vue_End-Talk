import qs from "querystring";
import cheerio from "cheerio-httpcli";

function textsearch(usertext) {
  let line = Math.floor(Math.random() * 6);
  let text = String(usertext) + "로시작하는단어";
  let queryusetest = qs.escape(text);
  let msg = "";
  const url = `https://dict.naver.com/search.dict?dicQuery=${queryusetest}`;
  return new Promise(function (resolve, reject) {
    cheerio.fetch(url, function (error, data, response, body) {
      data(".c_b")
        .eq(line)
        .each(function (idx) {
          msg = data(this).text();
        });
      if (msg == "") {
        resolve("lose");
      } else {
        resolve(msg);
      }
    });
  });
}

export { textsearch };
