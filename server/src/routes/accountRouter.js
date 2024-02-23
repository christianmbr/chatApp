import express from "express";
import accountRouter from "../controller/accountController.js";
import authenticate from "../middleware/auth.js";

const account = express.Router();

account.post("/register", accountRouter.register);
account.post("/login", accountRouter.login);
account.get("/user", accountRouter.findUser);

// account.get("/user", authenticate, (req, res) => {
//   res.status(200).json({
//     response: "Hello world this is an user",
//   });
// });
// account.get("/validate/:token", accountRouter.validateToken);

export default account;
