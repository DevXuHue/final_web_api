import express from "express";
import { billController } from "src/controllers/bill.controller";
import { authorizeRoles, isAuthenticated } from "src/middleware/auth";

const billRouer = express.Router();

billRouer.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  billController.getBills
);
billRouer.get("/me", isAuthenticated, billController.getBillsUserId);
billRouer.get("/room/:id", isAuthenticated, billController.getBillsRoonId);
billRouer.get("/:id", isAuthenticated, billController.getBillsParams);

export default billRouer;
