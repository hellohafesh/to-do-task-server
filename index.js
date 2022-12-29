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


        app.get('/task', async (req, res) => {

            const filter = { complete: false };

            const task = await mytaskCollection.find(filter).toArray();
            res.send(task,);
            // }

            // else {
            //     const query = { category: category, booking: "false" };
            //     const products = await productCollection.find(query).toArray();
            //     res.send(products);
            // }
        })
        app.get('/completedtask', async (req, res) => {

            const filter = { complete: true };

            const task = await mytaskCollection.find(filter).toArray();
            res.send(task,);
            // }

            // else {
            //     const query = { category: category, booking: "false" };
            //     const products = await productCollection.find(query).toArray();
            //     res.send(products);
            // }
        })
    }
    finally {

    }
}
run().catch(console.log);


app.listen(port, () => console.log(`Server Running On ${port}`));