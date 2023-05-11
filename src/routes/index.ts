import express, { Request, Response } from "express";
import { NotFoundRequestError, SuccessResponse } from "../core";

const router = express.Router();

router.get("/hello", (_req: Request, res: Response): void => {
  new SuccessResponse({
    message: "hello sỹ bình",
    metadata: null,
  }).send(res);
});

router.use("*", (_req: Request, _res: Response) => {
  throw new NotFoundRequestError();
});

export default router;
