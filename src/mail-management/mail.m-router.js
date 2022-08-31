import express from "express";
import { sendMail } from "./mail.m-controller.js";

const router = express.Router();

router.route("/").post(sendMail);

export default router;
