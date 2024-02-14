import accountDb from "../model/accountDb.js";
import config from "../../../config.js";
import jwt from "jsonwebtoken";

function validateInputs(name, password = null) {
  return name.includes(" ") ? false : true;
}

async function register(req, res) {
  const { name, password } = req.body;
  // Validate inputs.
  if (!validateInputs(name)) {
    return res.sendStatus(400);
  }
  try {
    // Cresting the new user.
    const response = await accountDb.register(name, password);

    if (typeof response === "object") {
      const newUserToken = jwt.sign(
        { id: response._id },
        config["secretPassJsonWebToken"],
        {
          expiresIn: "1m",
        }
      );

      return res.status(200).json({
        response: {
          token: newUserToken,
        },
      });
    } else {
      res.sendStatus(409);
    }
  } catch (error) {
    console.error(error.code);
  }
}

async function login(req, res) {
  const { name, password } = req.body;

  try {
    const userFound = await accountDb.login(name, password);
    if (userFound) {
      // Sign token for user found.
      const newUserToken = jwt.sign(
        { id: userFound._id },
        config["secretPassJsonWebToken"],
        {
          expiresIn: "1m",
        }
      );
      // Send token.
      res.status(200).json({
        response: {
          token: newUserToken,
        },
      });
    }
    res.sendStatus(401);
  } catch (err) {
    console.error(err.message);
  }
}

async function validateToken(req, res) {
  try {
    const token = req.params.token;
    const response = jwt.verify(token, config["secretPassJsonWebToken"]);
    console.log(response);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(401).json({
      response: error.message,
    });
  }
}

export default { register, login, validateToken };
