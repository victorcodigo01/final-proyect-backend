import { ObjectId } from "mongodb";

// GET ALL
export const getEmotionsManageInfo = async (req, res) => {
  // ir a BBDD y devolver TODOS los users
  console.log(req);
  const db = req.app.locals.ddbbClient.db("final-project"); // cojo la BBDD
  const col = db.collection("emotions-manage"); // cojo la collection
  const emotions = await col.find().toArray(); // busco TODOS y lo paso a array
  res.json(emotions); // devuelvo el resultado al cliente
};

export const createEmotionManage = async (req, res) => {
  const db = req.app.locals.ddbbClient.db("final-project"); // cojo la BBDD
  const col = db.collection("emotions-manage"); // cojo la collection
  const emotion = req.body; // cojo el body del cliente
  const result = await col.insertOne(emotion); // inserto el user en la collection
  res.json(result); // devuelvo el resultado al cliente
};

export const deleteEmocion = async (req, res) => {
  // let ObjectId = require("mongodb").ObjectId;
  console.log("mi request de id");
  console.log(req);
  const id = req.params._id;
  console.log(id);
  const db = req.app.locals.ddbbClient.db("final-project");
  const col = db.collection("emotions-manage");
  if (id) {
    const emocion = await col.find({ _id: id });
    console.log(emocion);
    const r = await col.findOneAndDelete({ _id: ObjectId(id) });
    console.log(r);
    res.status(200).json(r);
  } else {
    res.status(400).json({ error: "Not found" });
  }
};

export const editEmotionManage = async (req, res) => {
  const db = req.app.locals.ddbbClient.db("final-project"); // cojo la BBDD
  const col = db.collection("emotions-manage"); // cojo la collection
  const id = req.params._id;
  const emotion = req.body; // cojo el body del cliente
  const result = await col.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: emotion },
    { useFindAndModify: false }
  ); // inserto el user en la collection
  res.json(result); // devuelvo el resultado al cliente
};
