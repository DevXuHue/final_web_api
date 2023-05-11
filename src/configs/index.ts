import cloundinary from "cloudinary";
import { CorsOptions } from "cors";

export interface ConfigAppWithMongo {
  app: App;
  db: DB;
  corsConfig?: CorsOptions;
}

type App = {
  port: number;
  mode?: "dev" | "production";
};

type DB = {
  url: string;
};

export const devConfig: ConfigAppWithMongo = {
  app: {
    port: Number(process.env.PORT) || 3333,
    mode: process.env.NODE_MODE === "dev" ? "dev" : "production",
  },
  db: {
    url: process.env.MONGODB_URL_CONNECT as string,
  },
  corsConfig: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
};

export const configCloundinary: () => void = () => {
  cloundinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};
