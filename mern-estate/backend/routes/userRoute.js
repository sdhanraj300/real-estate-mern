import express from "express";
import {
  deleteUser,
  getUserListings,
  testUser,
  updateUser,
  getUser
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/test", testUser);
router.post("/update/:id", verifyToken, updateUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id",getUser);
export default router;
