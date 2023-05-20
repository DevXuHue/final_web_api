import express from "express";
import { roomController } from "../controllers/room.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const roomRouter = express.Router();

roomRouter.get("/", roomController.getAll);
roomRouter.get("/me", isAuthenticated, roomController.getRoomUser);
roomRouter.get("/type/:id", roomController.getRoomByType);
roomRouter.get("/:id", roomController.getRoom);
roomRouter.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  roomController.createRoom
);
roomRouter.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  roomController.updateRoom
);

export default roomRouter;
