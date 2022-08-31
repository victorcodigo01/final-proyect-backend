// GET ALL
import { MongoClient, GridFSBucket } from "mongodb";
import { createReadStream, createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  src_idx = __dirname.indexOf("\\src");

console.log(__dirname);

export const postImage = async (req, res) => {
  // ir a BBDD y almacenar una imagen cuyo nombre pasaremos como parte del cuerpo de la petición
  //const db = req.app.locals.ddbbClient.db("final-project"); // cojo la BBDD
  //console.log(req.app.locals)
  const client = new MongoClient(req.app.locals.ddbbClient.s.url),
    db = client.db("final-project"),
    bucket = new GridFSBucket(db, { bucketName: "imagesBucket" }),
    image_name = req.body.name,
    dot_idx = image_name.indexOf("."),
    bucket_image_name = image_name.substr(0, dot_idx),
    image_filename = `${__dirname.substring(0, src_idx)}/assets/${image_name}`;

  console.table({ dot_idx: dot_idx });
  console.log(image_name.substr(0, dot_idx));
  console.log(__dirname);

  createReadStream(image_filename).pipe(
    bucket.openUploadStream(bucket_image_name, {
      chunkSizeBytes: 1048576,
      metadata: { field: "Author", value: "Victor Martín" },
    })
  );

  res.status(200).json({ image_filename: image_filename });
};

export const downLoadIImage = async (req, res) => {
  const client = new MongoClient(req.app.locals.ddbbClient.s.url),
    db = client.db("final-project"),
    bucket = new GridFSBucket(db, { bucketName: "imagesBucket" }),
    image_name = req.body.name,
    dot_idx = image_name.indexOf("."),
    bucket_image_name = image_name.substr(0, dot_idx),
    image_filename = `${__dirname.substring(
      0,
      src_idx
    )}/assets/outputs/${image_name}`;

  bucket
    .openDownloadStreamByName(bucket_image_name)
    .pipe(createWriteStream(image_filename));

  res.status(200).json({ image_filename: image_filename });
};

export const getImage = async (req, res) => {
  const image_name = req.params.name,
    image_filename = `${__dirname.substring(
      0,
      src_idx
    )}\\assets\\outputs/${image_name}`,
    readStream = createReadStream(image_filename);
  console.log(image_filename);
  readStream.on("open", () => readStream.pipe(res));
};
