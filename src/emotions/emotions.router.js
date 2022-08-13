import express from "express";
import { getEmotionsInfo } from "./emotions.controller.js";

const router = express.Router();

router.route("/").get(getEmotionsInfo);

export default router;
