import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("successfully connected");
      })
      .catch((err) => {
        console.log(err);
        console.log("database connection problem");
      });
  } catch (error) {
    console.log(error);
  }
};
