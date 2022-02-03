const movies = require("../db/movies")

async function addToFavorites(movie) {

    const film = await movies.addToFav(movie)

}

module.exports = addToFavorites