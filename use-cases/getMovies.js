const movies = require("../db/movies")

async function getAllMovies() {
    return await movies.getAllMovies()
}

module.exports = getAllMovies