const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;
const boards = require("./routes/allBoards.js");

app.use(cors());
app.use(express.json());
app.use("/boards", boards);

app.listen(PORT, () => {
  console.log(`This app is listening to the http://localhost:${PORT}`);
});
