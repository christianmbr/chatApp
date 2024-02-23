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

      res.cookie("token", newUserToken, {
        maxAge: 60000,
      });

      return res.status(200).json({
        response: {
          message: "The user has been created",
        },
      });
    } else {
      res.status(409).json({
        response: {
          message: response,
        },
      });
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
      // Configurate token.
      res.cookie("token", newUserToken, {
        maxAge: 60000,
      });

      res.status(200).json({
        response: {
          message: "Successful login",
        },
      });
    } else {
      res.status(401).json({
        response: {
          message: "Unable to register",
        },
      });
    }
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

async function findUser(req, res) {
  const token = req.headers.access;

  if (token) {
    try {
      const userInfo = jwt.verify(token, config["secretPassJsonWebToken"]);
      const response = await accountDb.findUser(userInfo.id);
      if (typeof response == "object") {
        return res.status(200).json({
          response: {
            message: "welcome",
            name: response.name,
          },
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return res.status(401).json({
    response: {
      message: "unauthorized",
    },
  });
}

export default { register, login, validateToken, findUser };
