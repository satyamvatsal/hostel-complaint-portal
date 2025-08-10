const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env.local" });

const SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/user/login");
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token verification failed ", err);
    return res.redirect("/user/login");
  }
}
module.exports = authMiddleware;
