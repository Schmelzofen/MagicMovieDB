const movies = require("../db/movies")

async function edit(id, movie) {
    return await movies.editMovie(id, movie)
}

module.exports = edit