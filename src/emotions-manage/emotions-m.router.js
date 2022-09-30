import express from "express";
import {
  createEmotionManage,
  getEmotionsManageInfo,
  deleteEmocion,
  editEmotionManage,
} from "./emotions-m.controller.js";

const router = express.Router();

router.route("/").get(getEmotionsManageInfo);

router.route("/create").post(createEmotionManage); //asocias una ruta con una funcion

router.route("/:_id").delete(deleteEmocion);

router.route("/:_id").put(editEmotionManage);

export default router;
