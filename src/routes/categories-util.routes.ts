import express from "express";
import { categoriesUtilsController } from "../controllers";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const categoriesUtilsRouter = express.Router();

categoriesUtilsRouter.get("/", categoriesUtilsController.getAll);
categoriesUtilsRouter.get(
  "/utils/:id",
  categoriesUtilsController.getUtilsByCategoris
);
categoriesUtilsRouter.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  categoriesUtilsController.create
);
categoriesUtilsRouter.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  categoriesUtilsController.update
);
categoriesUtilsRouter.get("/:id", categoriesUtilsController.getOne);

export default categoriesUtilsRouter;
