
//GET ALL

export const getEmotionsInfo = async (req, res) => {
    // ir a BBDD y devolver TODOS los users
    const db = req.app.locals.ddbbClient.db('final-project'); // cojo la BBDD
    const col = db.collection('emotions'); // cojo la collection
    const emotion = await col.find().toArray(); // busco TODOS y lo paso a array
    res.json(emotion); // devuelvo el resultado al cliente
}