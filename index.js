const { connectDB } = require("./db/db");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const complainRouter = require("./routes/complainRouter");
const authMiddleare = require("./middleware/auth");
const adminRouter = require("./routes/adminRouter");
const healthCheckRouter = require("./routes/healthCheckRouter");
require("dotenv").config({ path: ".env.local" });

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./public"));
connectDB();

app.use("/user", userRouter);
app.use("/complaint", authMiddleare, complainRouter);
app.use("/admin", adminRouter);
app.use("/health", healthCheckRouter);
app.all("/{*splat}", (req, res) => res.redirect("/user"));
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Hostel complaint server listening on port ${port}`);
});
