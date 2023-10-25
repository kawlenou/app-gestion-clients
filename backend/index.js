import express from "express";
import{ MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app = express();
const port = 4000;

app.use(cors())
app.use(express.json())

const uri = process.env.STRING_URI;
const client = new MongoClient(uri);

app.get("/", (req, res) =>{
    async function main() {
        await client.connect()
        console.log("Connexion ok");

        const db = client.db("blog");
        const collection = db.collection("posts");
        const findResult = await collection.find({}).toArray();
        res.status(200).send(findResult);
        return 'done.';
    }

    main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
});

const obj = {title : "Titre", content : "contenu..."}
app.post("/insert", (req, res) =>{

    async function main() {
        await client.connect()
        console.log("Connexion ok");

        const db = client.db("blog");
        const collection = db.collection("posts");
        const insertResult = await collection.insertMany([req.body]);
        res.status(200).send(insertResult);
        return 'done.';
    }

    main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
})
      


app.listen(port, () =>{
    console.log("serveur demarré avec le port 4000")
})
