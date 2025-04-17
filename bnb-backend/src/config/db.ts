import mongoose from "mongoose";
import app from "../index";
import { MONGO_URI, PORT } from "../constants/env";

export const connectDBAndStartServer = async () => {
  try {
    console.log("Connecting to database.... " + MONGO_URI);
    await mongoose.connect(MONGO_URI).then(() => {
      console.log("");
      app.listen(PORT, () => {
        console.log(`Connected to DB and Server is listening on port ${PORT} `);
      });
    });
  } catch (error: any) {
    process.exit(1);
    // throw new Error("Could not connect to database")
  }
};

export const connectToDBAlone = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to the database.");
      return;
    }

    console.log("🔄 Connecting to the database...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    console.log("✅ Database connection successful.");
  } catch (error) {
    console.error("❌ Could not connect to the database:", error);
    throw new Error("Could not connect to the database");
  }
};