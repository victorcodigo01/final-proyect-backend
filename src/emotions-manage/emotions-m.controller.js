// GET ALL
export const getEmotionsManageInfo = async (req, res) => {
  // ir a BBDD y devolver TODOS los users
  const db = req.app.locals.ddbbClient.db("final-project"); // cojo la BBDD
  const col = db.collection("emotions-manage"); // cojo la collection
  const emotions = await col.find().toArray(); // busco TODOS y lo paso a array
  res.json(emotions); // devuelvo el resultado al cliente
};

// CREATE ONE
export const createEmotionManage = (req, res) => {
  const { title, emotionsManage, image } = req.body // Get the emotion data from the request body

  const db = req.app.locals.ddbbClient.db("final-project"); // cojo la BBDD
  const col = db.collection("emotions-manage") // cojo la collection
  col.insertOne({ title, emotionsManage, image });
  res.sendStatus(200);
}
