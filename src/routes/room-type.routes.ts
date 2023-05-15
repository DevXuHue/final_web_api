import express from "express";
import { roomTypeController } from "../controllers";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const roomTypeRouter = express.Router();

roomTypeRouter.get("/", roomTypeController.findAllRoomType);
roomTypeRouter.get("/:id", roomTypeController.findOneById);
roomTypeRouter.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  roomTypeController.create
);

roomTypeRouter.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  roomTypeController.update
);

export default roomTypeRouter;
