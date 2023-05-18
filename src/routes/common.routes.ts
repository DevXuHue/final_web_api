import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { commonController } from "../controllers";
const commonRouter = express.Router();

commonRouter.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  commonController.dataIndex
);

export default commonRouter;
