const express=require("express")
const cors=require("cors")
const {StreamChat}=require("stream-chat")
const {v4} =require("uuid")
const bcrypt=require("bcrypt")
const app = express();

app.use(cors());
app.use(express.json());
const api_key = "dnkx7pvtvsqg";
const api_secret =
  "98dhq3e3qa3q6fx3nxdnwq3fyvbc6nrd6sq2vbg5ctwxdmvzpd29fxmb4ngva72b";

const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = v4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.json({ message: "User not found" });

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});




/*const express = require("express");
const connection = require("./configs/db");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const wd = require("word-definition");
const randomWords = require('random-words');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.status(200).send("Hello! welcome to the backend side");
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});


app.get("/random-words", async (req, res) => {
  try {
    const words = randomWords({ exactly: 16, maxLength: 6 });
    const data = await Promise.all(
      words.map((word) =>
        new Promise((resolve) =>
          wd.getDef(word, "en", null, (definition) => resolve(definition))
        )
      )
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

app.use("/users", userRouter)

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Connected the server at 8080`);
});*/
