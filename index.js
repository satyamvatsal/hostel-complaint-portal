const { connectDB } = require("./db/db");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const complainRouter = require("./routes/complainRouter");
require("dotenv").config({ path: ".env.local" });

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./public"));
connectDB();

app.use("/user", userRouter);
app.use("/complain", complainRouter);

const port = process.env.PORT;
app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
