import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { reportController } from "../controllers";
const reportRouter = express.Router();

reportRouter.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  reportController.getAll
);
reportRouter.get("/me", isAuthenticated, reportController.getMe);
reportRouter.post(
  "/check",
  isAuthenticated,
  authorizeRoles("admin"),
  reportController.check
);
reportRouter.get("/:id", isAuthenticated, reportController.getById);
reportRouter.post("/", isAuthenticated, reportController.create);

export default reportRouter;
