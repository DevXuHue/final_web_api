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

export const optionsSwaggerExpress = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BinhHo Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      contact: {
        name: "HoBinh",
        url: "https://github/hosybinhkog",
        email: "hosybinhkog@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4444/api/dev/v1",
      },
    ],
  },
  apis: ["../routes/*.js", "./routes/*.js", "../routes/*.ts"],
  title: "Music API Documentation",
};
