import express from "express";
import { getEmotionsManageInfo } from "./emotions-m.controller.js";

const router = express.Router();

router.route("/").get(getEmotionsManageInfo);

export default router;
