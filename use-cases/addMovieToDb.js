const movies = require("../db/movies")

function addMovieToDb(movie) {
    console.log(movie)
    return new Promise((resolve, reject) => {
        movies.addMovie(movie).then((result) => {
            console.log(result)
            resolve(result)
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

module.exports = addMovieToDb