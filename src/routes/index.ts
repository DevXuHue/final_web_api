import express, { Request, Response } from "express";
import { SuccessResponse } from "../core";
import routerCategoryPost from "./category-post.routes";
import commonRouter from "./common.routes";
import postRouter from "./post.routes";
import reportTypeRouter from "./report-type.routes";
import reportRouter from "./report.routes";
import roomTypeRouter from "./room-type.routes";
import userRoutes from "./user.routes";
import roomRouter from "./room.routes";
import utilsRoter from "./utils.routes";

const router = express.Router();
router.get("/hello", (_req: Request, res: Response): void => {
  new SuccessResponse({
    message: "hello trường",
    metadata: null,
  }).send(res);
});

router.use("/users", userRoutes);
router.use("/categories-post", routerCategoryPost);
router.use("/post", postRouter);
router.use("/report-type", reportTypeRouter);
router.use("/report", reportRouter);
router.use("/room-types", roomTypeRouter);
router.use("/admin", commonRouter);
router.use("/room", roomRouter);
router.use("/util", utilsRoter);

export default router;
