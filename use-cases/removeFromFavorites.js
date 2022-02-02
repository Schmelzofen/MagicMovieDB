const movies = require("../db/movies")

function removeFromFavorites(id) {
    return new Promise((resolve, reject) => {
        movies.removeFromFav(id).then((movie) => {
            resolve(movie)

        }).catch((err) => {
            console.log("Cant delete movie", err)
            reject(err)
        })
    })
}

module.exports = removeFromFavorites