import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";

const router = express.Router();

//read routes
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//patch routes
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
