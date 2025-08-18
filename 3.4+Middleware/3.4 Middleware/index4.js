import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));

function logger(req,res,next){
  console.log(req.url);
  next()
};

app.use(logger);

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/public/index.html")
});

app.post("/submit", (req,res) => {
  res.send(`Street is ${req.body.street} and Pet is ${req.body.pet}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
