import dotenv from "dotenv";
import app from "./app";
import { devConfig } from "./configs";
dotenv.config();

const PORT: number = devConfig.app.port;

const server = app.listen(PORT, () => {
  console.log("serer is running on port:::", PORT);
});

process.on("SIGINT", (): void => {
  server.close((): void => console.log("server is close"));
});
