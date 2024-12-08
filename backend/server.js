const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
require("dotenv").config();

app.get("/api/home", (req, res) => {
  console.log("req hit");
  res.json("this is home route");
});

app.listen(port, () => {
  console.log("Server is listening on port : " + port);
});
