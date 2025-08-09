const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env.local" });

const SECRET = process.env.JWT_SECRET;

function authMiddleare(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/admin/login");
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    if (req.user.type !== "admin") {
      return res.redirect("/admin/login");
    }
    next();
  } catch (err) {
    console.log("Token verification failed ", err);
    return res.redirect("/user/login");
  }
}
module.exports = authMiddleare;
