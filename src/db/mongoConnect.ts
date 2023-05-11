import mongoose from "mongoose";
import { devConfig } from "./../configs";

class Database {
  private static instance: Database;
  constructor() {
    this.connect();
  }

  connect(type: string = "mongodb") {
    if (type === "mongodb") {
      mongoose
        .connect(devConfig.db.url)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error: any) =>
          console.log("error to connect to MongoDB", error)
        );
      if (devConfig.app.mode === "dev") {
        mongoose.set("debug", true);
        mongoose.set("debug", { color: true });
      }
    }
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb: Database = Database.getInstance();
export default instanceMongodb;
