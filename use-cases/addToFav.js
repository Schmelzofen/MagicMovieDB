const movies = require("../db/movies")

function addToFavorites(movie) {
    return new Promise((resolve, reject) => {
        movies.addToFav(movie).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = addToFavorites