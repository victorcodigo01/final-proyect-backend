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
