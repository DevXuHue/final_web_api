import express from "express";
import { utilsController } from "../controllers/utils.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const utilsRoter = express.Router();

utilsRoter.get("/", utilsController.getAll);
utilsRoter.get("/:id", utilsController.getOne);
utilsRoter.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  utilsController.create
);
utilsRoter.post(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  utilsController.update
);

export default utilsRoter;
