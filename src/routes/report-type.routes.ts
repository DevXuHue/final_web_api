import express from "express";
import { typeReportController } from "../controllers";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const reportTypeRouter = express.Router();

reportTypeRouter.get("/", typeReportController.findAll);
reportTypeRouter.get("/:id", typeReportController.findOne);
reportTypeRouter.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  typeReportController.create
);
reportTypeRouter.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  typeReportController.update
);

export default reportTypeRouter;
