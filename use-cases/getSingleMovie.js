const movies = require("../db/movies")

function singleMovie(id) {
    return movies.getSingleMovie(id)
}

module.exports = singleMovie