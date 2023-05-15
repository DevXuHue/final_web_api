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
reportRouter.get("/:id", isAuthenticated, reportController.getById);

export default reportRouter;
