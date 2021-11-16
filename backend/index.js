import { textsearch } from "./search.js";
import express from "express";
import cros from "cors";

const app = express();
const port = 3000;
const randomtext = ["가", "나", "다", "라", "마", "바", "사", "아", "자"];
app.use(cros());

app.get("/search", async (req, res) => {
  let text = req.param("text");
  let return_text = await textsearch(text);
  res.send(return_text);
});
app.get("/random", async (req, res) => {
  let text = randomtext[Math.floor(Math.random() * 8)];
  let return_text = await textsearch(text);
  res.send(return_text);
});

app.listen(port, () => {
  console.log(`server on ${port}`);
  console.log(`http://localhost:${port}`);
});
