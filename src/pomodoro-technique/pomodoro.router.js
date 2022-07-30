import express from 'express';
import { getPomodoroInfo } from './pomodoro.controller.js';

const router = express.Router();

router.route('/')
    .get(getPomodoroInfo)


export default router;