import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { postController } from "./../controllers/post.controller";
import express from "express";

const postRouter = express.Router();

postRouter.get("/", postController.getAllPost);
postRouter.get("/me", isAuthenticated, postController.getPostsMe);
postRouter.get(
  "/categories/:id",
  isAuthenticated,
  postController.getPostByCategoriesId
);
postRouter.get("/author/:id", postController.getPostsAuthorParam);
postRouter.get(
  "/publish/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  postController.publish
);
postRouter.get(
  "/un-publish/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  postController.unPublish
);
postRouter.get("/:id", postController.getPost);
postRouter.post("/", isAuthenticated, postController.create);
postRouter.put("/:id", isAuthenticated, postController.update);

export default postRouter;
