const { connect } = require("./connection")
var ObjectId = require('mongodb').ObjectId

function getAllMovies() {
    return connect()
        .then((db) => {
            const moviePromise = db.collection("movies")
                .find()
                .toArray()
            return moviePromise
        })
}

function getSingleMovie(id) {
    return connect()
        .then((db) => {
            return db.collection("movies")
                .findOne({ "_id": id })
        })
}

function getFavMovies() {
    return connect()
        .then((db) => {
            const moviePromise = db.collection("favorite")
                .find()
                .toArray()
            return moviePromise
        })
}

function addMovie(movie) {
    return connect()
        .then((db) => {
            return db.collection("movies")
                .insertOne(movie)
        })
}

function removeFromFav(id) {
    return connect()
        .then((db) => {
            return db.collection("favorite")
                .deleteOne({ "_id": id })
        })
}

function addToFav(movie) {
    return connect()
        .then((db) => {
            return db.collection("favorite")
                .insertOne(movie)
        })
}

function editMovie(id, movie) {
    return connect()
        .then((db) => {
            return db.collection("movies")
                .updateOne({ _id: id }, { $set: movie }, { upsert: true })
        })
}

module.exports = {
    getAllMovies,
    getFavMovies,
    addMovie,
    removeFromFav,
    addToFav,
    getSingleMovie,
    editMovie,
}