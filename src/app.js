import express from "express";
import cors from "cors";
import authRouter from "./auth/auth.router.js";
import usersRouter from "./users/users.router.js";
import { validateAuth } from "./auth/auth.middleware.js";
import EmotionsManage from "./emotions-manage/emotions-m.router.js";
import Emotions from "./emotions/emotions.router.js";
import Pomodoro from "./pomodoro-technique/pomodoro.router.js";
import MailManagement from "./mail-management/mail.m-router.js";
import ImagesManagemnt from "./images-management/images-m.routes.js";

export const app = express();

app.get("/hello", (_req, res) => {
  res.send(`Hello world desde express: ${process.env.DB_USER}`);
});

//EL USE SIGNIFICA QUE ES PARA TODA LA APP
app.use(cors());
app.use(express.json()); // permitimos que el app procese JSON en el body de la request

app.get("/pum", (_req, res) => res.send("pim"));
app.use("/auth", authRouter); // declaramos el router de autenticación
app.use("/users", validateAuth, usersRouter); //el middleware es lo que está en medio obviamente jej

app.use("/emotions-manage", EmotionsManage);
app.use("/emotions", Emotions);
app.use("/pomodoro-technique", Pomodoro);
app.use("/mail", MailManagement);
app.use("/images", ImagesManagemnt);

app.use("/static/", express.static("assets"));
// app.use("/images", ImagesManagement);

app.get(
  "/demo",
  (req, res, next) => {
    const cumpleValidacion = true;
    if (!cumpleValidacion) {
      res.status(400).send(); // envio un 400
      // ya no se ejecuta nada mas se termina la peticion
    } else {
      next(); // sirve para pasar el control al siguiente controlador registrado
    }
  },
  (_req, res) => {
    res.send("Hello demo");
  }
);

// import express from 'express';
// import usersRouter from './users/users.router.js';
// import authRouter from './auth/auth.router.js';

// export const app = express();

// // app.use(cors());

// app.use(express.json()); // permitimos que el app procese JSON en el body de la request

// app.get('/ping', (_req,res) => res.send('pong'));

// app.use('/users', usersRouter); // ahora en /students se encuentran TODAS las rutas y subrutas definidas por studentRouter

// app.use('/auth', authRouter); // declaramos el router de autenticación
