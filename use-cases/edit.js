const movies = require("../db/movies")

function edit(id, movie) {
    return new Promise((resolve, reject) => {
        movies.editMovie(id, movie).then((result) => {
            resolve(result)
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

module.exports = edit