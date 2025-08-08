const { connectDB } = require("./db/db");
const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
require("dotenv").config({ path: ".env.local" });

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));
connectDB();

app.use("/user", userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
