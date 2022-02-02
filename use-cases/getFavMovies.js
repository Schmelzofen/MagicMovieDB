const movies = require("../db/movies")

function getFavMovies() {
    return new Promise((resolve) => {
        movies.getFavMovies().then((movies) => {
            resolve(movies)
        })
    })
}

module.exports = getFavMovies