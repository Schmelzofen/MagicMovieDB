const movies = require("../db/movies")

async function removeFromFavorites(id) {
    return await movies.removeFromFav(id)
}

module.exports = removeFromFavorites