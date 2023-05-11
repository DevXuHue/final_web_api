import express, { Request, Response } from "express";
import { SuccessResponse } from "../core";
import userRoutes from "./user.routes";

const router = express.Router();

router.get("/hello", (_req: Request, res: Response): void => {
  new SuccessResponse({
    message: "hello sỹ bình",
    metadata: null,
  }).send(res);
});

router.use("/users", userRoutes);

export default router;
