import accountDb from "../model/accountDb.js";

async function register(req, res) {
  const { name, password } = req.body;
  try {
    const response = await accountDb.register(name, password);

    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.error(error.code);
  }
}

export default { register };
