const movies = require("../db/movies")

async function search(query) {
    const filme = await movies.searchMovies(query)
    return filme
}

module.exports = search