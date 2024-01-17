import express from "express";
import accountRouter from "../controller/accountController.js";

const account = express.Router();

export default account.post("/register", accountRouter.register);
