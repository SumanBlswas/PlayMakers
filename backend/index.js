import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./configs/db.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.status(200).send("Hello welcome to the backend side");
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

app.listen(process.env.PORT_LINK, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Connected the server at ${process.env.PORT_LINK}`);
});
