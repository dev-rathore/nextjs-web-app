import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB database successfully");
    });

    connection.on("error", (error) => {
      console.error("Error connecting to database:", error);
      process.exit();
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
