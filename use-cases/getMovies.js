const movies = require("../db/movies")

function getAllMovies() {
    return new Promise((resolve) => {
        movies.getAllMovies().then((movies) => {
            resolve(movies)
        })
    })
}

module.exports = getAllMovies