const movies = require("../db/movies")

async function addMovieToDb(movie) {
    const film = await movies.addMovie(movie)
}

module.exports = addMovieToDb