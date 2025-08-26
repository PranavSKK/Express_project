import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const psql = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "mytestdb",
  password: "welcome123",
  port: 5432
});

psql.connect();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs"); 
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await psql.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      const result = await psql.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, password]
      );
      console.log(result);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try{
    const email = req.body.username;
    const password = req.body.password;
    const user = await psql.query("SELECT * FROM users  WHERE email = $1",[email]);
    if(user.rows[0].password == password){
      res.render("secrets.ejs");
    }else{
      res.json("Invalid Password");
    };
  }catch(err){
    res.send(err);
    console.log(err);
  };
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
