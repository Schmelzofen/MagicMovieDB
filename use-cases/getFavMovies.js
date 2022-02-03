const movies = require("../db/movies")

async function getFavMovies() {
    return film = await movies.getFavMovies()
}

module.exports = getFavMovies