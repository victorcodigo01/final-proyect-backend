//GET ALL

export const getPomodoroInfo = async (req, res) => {
  // ir a BBDD y devolver TODOS los users
  const db = req.app.locals.ddbbClient.db("final-project"); // cojo la BBDD
  const col = db.collection("pomodoro-technique"); // cojo la collection
  const pomodoro = await col.find().toArray(); // busco TODOS y lo paso a array
  res.json(pomodoro); // devuelvo el resultado al cliente
};
