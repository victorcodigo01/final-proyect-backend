import { ObjectId } from "mongodb";
import { getEmailToken } from "../auth/auth.middleware.js";

// GET ALL
export const getEmotionsManageInfo = async (req, res) => {
  // ir a BBDD y devolver TODOS los users
  const email = getEmailToken(req, res);
  const db = req.app.locals.ddbbClient.db("final-project"); // cojo la BBDD
  const col = db.collection("emotions-manage"); // cojo la collection
  const emotions = await col.find({ userCreator: email }).toArray(); // busco TODOS y lo paso a array
  res.json(emotions); // devuelvo el resultado al cliente
};

export const createEmotionManage = async (req, res) => {
  const db = req.app.locals.ddbbClient.db("final-project"); // cojo la BBDD
  const col = db.collection("emotions-manage"); // cojo la collection
  const email = getEmailToken(req, res);
  console.log(" mi email es ", email);
  const emotion = req.body; // cojo el body del cliente
  emotion.userCreator = email;
  if (emotion.url == "") delete emotion.url;
  console.log(emotion);
  const result = await col.insertOne(emotion); // inserto el user en la collection
  res.json(result); // devuelvo el resultado al cliente
};

export const deleteEmocion = async (req, res) => {
  // let ObjectId = require("mongodb").ObjectId;
  console.log("mi request de id");

  const id = req.params._id;

  const db = req.app.locals.ddbbClient.db("final-project");
  const col = db.collection("emotions-manage");
  if (id) {
    const emocion = await col.find({ _id: id });

    const r = await col.findOneAndDelete({ _id: ObjectId(id) });

    res.status(200).json(r);
  } else {
    res.status(400).json({ error: "Not found" });
  }
};

export const editEmotionManage = async (req, res) => {
  const db = req.app.locals.ddbbClient.db("final-project"); // cojo la BBDD
  const col = db.collection("emotions-manage"); // cojo la collection
  const id = req.params._id;
  const email = getEmailToken(req, res);
  const emotion = req.body; // cojo el body del cliente
  emotion.userCreator = email;
  const result = await col.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: emotion },
    { useFindAndModify: false }
  ); // inserto el user en la collection
  res.json(result); // devuelvo el resultado al cliente
};
