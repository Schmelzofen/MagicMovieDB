const express = require('express')
const formidable = require('formidable')
require('dotenv').config()
var ObjectId = require('mongodb').ObjectId


const getAllMovies = require("./use-cases/getMovies")
const singleMovie = require("./use-cases/getSingleMovie")
const addToFavorites = require("./use-cases/addToFav")
const getFavoriteMovies = require("./use-cases/getFavMovies")
const removeFromFavorites = require("./use-cases/removeFromFavorites")
const addMovieToDb = require("./use-cases/addMovieToDb")
const edit = require("./use-cases/edit")

const app = express()
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(express.json())

app.get("/", function getAllMoviesController(req, res) {
    getAllMovies()
        .then((movies) => {
            res.render("pages/index", {
                movies,
            })
        })
})

app.get("/movie/:id", function getSingleMovieController(req, res) {
    const id = req.params.id
    const o_id = new ObjectId(id)
    singleMovie(o_id)
        .then((movie) => {
            let myArr = []
            myArr.push(movie)
            res.render("pages/detail", {
                movie: myArr,
                film: movie,
            })
        })
})

app.post("/addtofavorite", function addFavoriteMovieController(req, res) {
    const form = formidable({ multiples: true })
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
        }
        const movieId = fields.Movie
        const o_id = new ObjectId(movieId)
        console.log(movieId)
        singleMovie(o_id)
            .then((movie) => {
                addToFavorites(movie)
                    .then(() => {
                        res.redirect("back")
                    })
                    .catch(() => {
                        res.send("already in list!")
                    })
            })
    })
})

app.post("/remove", function removeFromFavoritesController(req, res) {
    const form = formidable({ multiples: true })
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
        }
        const movieId = fields.Movie
        const o_id = new ObjectId(movieId)
        removeFromFavorites(o_id)
            .then(() => {
                res.redirect("back")
            })
            .catch(() => {
                res.send("something bad happened")
            })
    })
})

app.get("/favorites", function getFavoriteMoviesController(req, res) {
    getFavoriteMovies()
        .then((movies) => {
            res.render("pages/favorites", {
                movies,
            })
        })
})

app.get("/addmovie", function addMovieController(req, res) {
    res.render("pages/addmovie")
}).post("/addmovie", function addMovieController(req, res) {
    const form = formidable({ multiples: true })
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
        }
        const movie = fields
        addMovieToDb(movie)
            .then(() => {
                res.redirect("back")
            })
            .catch((err) => {
                console.log(err)
                res.send("Somethind bad happened")
            })
    })
})

app.post("/editmovie", function editMovieController(req, res) {
    const form = formidable({ multiples: true })
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
        }
        const movie = {
            "title": fields.title,
            "year": fields.year,
            "director": fields.director,
            "genre": fields.genre,
            "rate": fields.rate,
            "movieposter": fields.movieposter,
            "description": fields.description,
        }
        const id = ObjectId(`${fields._id}`)
        edit(id, movie)
            .then(() => res.redirect("back"))
            .catch((err) => {
                console.log(err)
                res.send("something bad happenend")
            })
    })
})

app.listen(process.env.PORT, function () {
    console.log("Server is listening on port " + process.env.PORT)
})