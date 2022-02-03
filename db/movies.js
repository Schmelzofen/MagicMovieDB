const { connect } = require("./connection")
var ObjectId = require('mongodb').ObjectId

async function getAllMovies() {
    const db = await connect()
    const moviePromise = db.collection("movies")
        .find()
        .toArray()
    return moviePromise
}

async function getSingleMovie(id) {
    const db = await connect()
    return db.collection("movies")
        .findOne({ "_id": id })
}

async function getFavMovies() {
    const db = await connect()
    const moviePromise = db.collection("favorite")
        .find()
        .toArray()
    return moviePromise
}

async function addMovie(movie) {
    const db = await connect()
    return db.collection("movies")
        .insertOne(movie)
}

async function removeFromFav(id) {
    const db = await connect()
    return db.collection("favorite")
        .deleteOne({ "_id": id })
}

async function addToFav(movie) {
    const db = await connect()
    return db.collection("favorite")
        .insertOne(movie)
}

async function editMovie(id, movie) {
    const db = await connect()
    return db.collection("movies")
        .updateOne({ _id: id }, { $set: movie }, { upsert: true })
}

async function searchMovies(query) {
    console.log(query)
    const db = await connect()
    const foundMovies = await db.collection("movies")
        .find({ "title": { $regex: query } })
        .toArray()
    return foundMovies
}

module.exports = {
    getAllMovies,
    getFavMovies,
    addMovie,
    removeFromFav,
    addToFav,
    getSingleMovie,
    editMovie,
    searchMovies,
}