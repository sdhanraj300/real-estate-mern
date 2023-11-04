import express from "express";
import { deleteUser, testUser, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").get(testUser);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken,deleteUser);

export default router;
