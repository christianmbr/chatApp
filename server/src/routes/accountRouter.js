import express from "express";
import accountRouter from "../controller/accountController.js";

const account = express.Router();

account.post("/register", accountRouter.register);
account.post("/login", accountRouter.login);
account.get("/validate/:token", accountRouter.validateToken);

export default account;
