import dotenv from "dotenv";

dotenv.config();

export default {
  severPort: 3000,
  conectionString: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.vqipidq.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
};
