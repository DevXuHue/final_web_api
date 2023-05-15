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
userRoutes.post("/forgot-password", userController.forgotPassword);
userRoutes.post("/reset-password/:token", userController.resetPassword);

export default userRoutes;
