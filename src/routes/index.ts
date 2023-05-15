import express, { Request, Response } from "express";
import { SuccessResponse } from "../core";
import userRoutes from "./user.routes";
import routerCategoryPost from "./category-post.routes";
import postRouter from "./post.routes";
import reportTypeRouter from "./report-type.routes";
import reportRouter from "./report.routes";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */
router.get("/hello", (_req: Request, res: Response): void => {
  new SuccessResponse({
    message: "hello sỹ bình",
    metadata: null,
  }).send(res);
});

router.use("/users", userRoutes);
router.use("/categories-post", routerCategoryPost);
router.use("/post", postRouter);
router.use("/report-type", reportTypeRouter);
router.use("/report", reportRouter);

export default router;
