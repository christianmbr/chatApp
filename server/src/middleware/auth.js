import jwt from "jsonwebtoken";
import config from "../../../config.js";

export default function Authenticate(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, config["secretPassJsonWebToken"]);
    req.decodedToken.id;
    next();
  } else {
    res.status(401).json({
      response: "Token expired",
    });
  }
}
