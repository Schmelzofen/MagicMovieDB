const { MongoClient } = require("mongodb")
require('dotenv').config()

let _db

function connect() {
    return new Promise((resolve, reject) => {
        if (_db) {
            // hier ist die datenbank verbindung schon aufrecht
            // ich kann direkt die Promise von oben resolven...
            // ich muss keine weitere verbindung aufbauen...
            resolve(_db);
        } else {
            const url = process.env.URL;
            const client = new MongoClient(url)

            client
                .connect()
                .then((connected_client) => {
                    _db = connected_client.db('sc');
                    resolve(_db)
                })
                .catch((err) => reject(err))
        }
    })
}

module.exports = { connect }