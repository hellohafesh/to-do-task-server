const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 7000;
// const jwt = require('jsonwebtoken');
require('dotenv').config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Server Rinning');
})



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s3uhktq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const mytaskCollection = client.db('todotask').collection('mytask')







        app.post('/addtask', async (req, res) => {
            const task = req.body;
            const result = await mytaskCollection.insertOne(task);
            res.send(result);
        })


        app.get('/task/:uid', async (req, res) => {
            const uid = req.params.uid;
            const query = { uid: uid };
            const filter = { complete: false };

            const task = await mytaskCollection.find(query).toArray();
            res.send(task,);
        })



        app.get('/completedtask/:uid', async (req, res) => {
            const uid = req.params.uid;
            const query = { uid: uid };
            const filter = { complete: true };

            const task = await mytaskCollection.find(query).toArray();
            res.send(task,);

        })
        app.put('/complete/:id', async (req, res) => {
            const id = req.params.id;

            console.log(id)
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    complete: true,
                }
            }
            const result = await mytaskCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })





        app.delete('/delete/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await mytaskCollection.deleteOne(filter);
            res.send(result);
        })


    }
    finally {

    }
}
run().catch(console.log);


app.listen(port, () => console.log(`Server Running On ${port}`));