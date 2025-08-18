import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));

var isUserAuth = false;

function passwordCheck(req,res,next){
    if(req.body.password == "Pranav@123"){
        isUserAuth = true;
    };
    next()
};

app.use(passwordCheck);

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
});

app.post("/check", (req,res)=>{
    if(isUserAuth){
        res.sendFile(__dirname + "/public/secret.html")
    } else {
        res.sendFile(__dirname + "/public/index.html")
    };
});

app.listen(port, ()=>{
    console.log(`Listening to ${port}`)
});