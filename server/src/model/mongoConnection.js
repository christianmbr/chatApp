import mongoose from "mongoose";
import config from "../../../config.js";

function connect() {
  return mongoose
    .connect(config["conectionString"], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log("Error connecting to MongoDB Atlas: " + err));
}

export default { connect };
