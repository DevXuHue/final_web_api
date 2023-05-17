import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { userController } from "./../controllers";
import express from "express";

const userRoutes = express.Router();

userRoutes.post(
  "/register",
  isAuthenticated,
  authorizeRoles("admin"),
  userController.register
);
userRoutes.post("/login", userController.login); // POST http://localhost:4444/api/dev/v1/users/login
userRoutes.get("/logout", userController.logout); // GET http://localhost:4444/api/dev/v1/users/logout
userRoutes.get("/me", isAuthenticated, userController.me); // GET http://localhost:4444/api
userRoutes.post("/forgot-password", userController.forgotPassword);
userRoutes.post("/reset-password/:token", userController.resetPassword);
userRoutes.get(
  "/admin/customers/",
  isAuthenticated,
  authorizeRoles("admin"),
  userController.getAllCustomer
);

export default userRoutes;
