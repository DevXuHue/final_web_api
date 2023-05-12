import { authorizeRoles, isAuthenticated } from "./../middleware/auth";
import { categoriesPostController } from "./../controllers";
import express from "express";

const routerCategoryPost = express.Router();

routerCategoryPost.get("/", categoriesPostController.findCategories);
routerCategoryPost.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  categoriesPostController.create
);
routerCategoryPost.get("/:id", categoriesPostController.findCategoriesPostById);
routerCategoryPost.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  categoriesPostController.update
);
export default routerCategoryPost;
