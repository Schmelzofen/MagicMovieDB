const { MongoClient } = require("mongodb")
require('dotenv').config()

let _db

async function connect() {
    if (_db) {
        return _db
    } else {
        const url = process.env.URL;
        const client = new MongoClient(url)
        const connected_client = await client.connect()
        _db = connected_client.db("sc")
        return _db
    }
}

module.exports = { connect }