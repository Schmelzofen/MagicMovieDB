const movies = require("../db/movies")

function singleMovie(id) {
    return new Promise((resolve) => {
        movies.getSingleMovie(id).then((movie) => {
            resolve(movie)
        })
    })
}

module.exports = singleMovie