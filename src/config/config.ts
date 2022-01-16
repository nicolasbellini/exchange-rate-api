import dotenv from 'dotenv';

dotenv.config();

const APIKEY = {
    key: 'b6d5a2cd13cf62f5f3ce88d9'
};

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};

const MONGO = {
    options: MONGO_OPTIONS,
    url: `mongodb+srv://nicolastest1:edsiWXKDGktwe88@cluster0.38nwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mongo: MONGO,
    server: SERVER,
    api: APIKEY
};

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://nicolastest1:<password>@cluster0.38nwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((error: any) => {
    const collection = client.db('test').collection('devices');
    // perform actions on the collection object
    client.close();
});

export default config;
