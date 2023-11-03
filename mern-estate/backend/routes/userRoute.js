import express from "express";
import { testUser } from "../controllers/userController.js";

const router = express.Router();

router.route('/').get(testUser);

export default router;
