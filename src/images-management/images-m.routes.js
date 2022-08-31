import express from "express";
import { downLoadIImage, getImage, postImage } from "./images-m.controller.js";

const router = express.Router();

router.route("/").post(postImage);
router.route("/:name").get(getImage);
router.route("/download").post(downLoadIImage);
// router.route("/create").post(postEmotionsManageCard);

export default router;
