const express = require("express");
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
});
