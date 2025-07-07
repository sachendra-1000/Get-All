const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url, { connectTimeoutMS: 30000, serverSelectionTimeoutMS: 30000 });
const dbName = "Get-All";

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

connectToMongoDB();

const app = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(cors());

// Get all products
app.get('/', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('Products-Data');
        const findResult = await collection.find({}).toArray();
        console.log(`Fetched ${findResult.length} products`);
        res.json(findResult);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// Get a single product by ID
app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching product with ID: ${id}`);
    try {
        const db = client.db(dbName);
        const collection = db.collection('Products-Data');
        let product;
        // Try finding by string _id first
        product = await collection.findOne({ _id: id });
        if (!product) {
            // Try finding by ObjectId if string _id fails
            try {
                product = await collection.findOne({ _id: new ObjectId(id) });
            } catch (e) {
                console.warn(`ID ${id} is not a valid ObjectId`);
            }
        }
        if (!product) {
            console.log(`Product with ID ${id} not found`);
            return res.status(404).json({ error: `Product with ID ${id} not found` });
        }
        console.log(`Found product: ${product.productName}`);
        res.json(product);
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Save a product
app.post('/', async (req, res) => {
    try {
        const product = req.body;
        const db = client.db(dbName);
        const collection = db.collection('Products-Data');
        const result = await collection.insertOne(product);
        console.log(`Inserted product: ${product.productName}`);
        res.json({ success: true, result });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: 'Failed to save product' });
    }
});

// Delete a product by ID
app.delete('/', async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
        const db = client.db(dbName);
        const collection = db.collection('Products-Data');
        let result;
        // Try deleting by string _id first
        result = await collection.deleteOne({ _id });
        if (result.deletedCount === 0) {
            // Try deleting by ObjectId if string _id fails
            try {
                result = await collection.deleteOne({ _id: new ObjectId(_id) });
            } catch (e) {
                console.warn(`ID ${_id} is not a valid ObjectId`);
            }
        }
        if (result.deletedCount === 0) {
            console.log(`Product with ID ${_id} not found for deletion`);
            return res.status(404).json({ error: 'Product not found' });
        }
        console.log(`Deleted product with ID ${_id}`);
        res.json({ success: true, result });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});