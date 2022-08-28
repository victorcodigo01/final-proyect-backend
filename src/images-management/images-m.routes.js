import express from "express";
import {
  createEmotionManage,
  getEmotionsManageInfo,
} from "./emotions-m.controller.js";

const router = express.Router();

router.route("/").get(getEmotionsManageInfo);

router.route("/create").post(createEmotionManage);
// router.route("/create").post(postEmotionsManageCard);

export default router;
