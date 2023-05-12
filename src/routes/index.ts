import express, { Request, Response } from "express";
import { SuccessResponse } from "../core";
import userRoutes from "./user.routes";
import routerCategoryPost from "./category-post.routes";
import postRouter from "./post.routes";

const router = express.Router();

router.get("/hello", (_req: Request, res: Response): void => {
  new SuccessResponse({
    message: "hello sỹ bình",
    metadata: null,
  }).send(res);
});

router.use("/users", userRoutes);
router.use("/categories-post", routerCategoryPost);
router.use("/post", postRouter);

export default router;
