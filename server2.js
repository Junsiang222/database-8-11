const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
}

// trigger the connection with MongoDB
connectToMongoDB();

//declare schema for movies
const movieSchema = new mongoose.Schema({
  title:String,
  director:String,
  release_year:Number,
  genre:String,
  rating:Number
});

//create a Modal from the schema
const Movie = mongoose.model("Movie",movieSchema)

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});
/*
Routes for movies
Get /movies -list all the movies
GET /movies/68943cf564aa9f8354cef260 - get a specific movie
PUT /movies/68943cf564aa9f8354cef260 - update movie
DELETE /movies/68943cf564aa9f8354cef260 - delete movie
*/

app.get("/movies", async(req, res) => {
  const director = req.query.director;
  const genre = req.query.genre;
  const rating = req.query.rating;
  

//crate a empty container for filter
let filter={};
//if director exists , then only add it into the filter container
if(director){
  filter.director=director;
}
//if genre exists , then only add it into the filter container
if(genre){
  filter.genre=genre;
}
//if rating exists , then only add it into the filter container
if(rating){
  filter.rating={ $gt:rating};
}



  //load the movies data from Moogodb
  const movies = await Movie.find(filter);
  res.send(movies);
});

//GET /movies/id - get a specific movie
app.get("/movies/:id", async(req, res) => {
 const id = req.params.id;
 //load the movies data based on id
 const movie = await Movie.findById(id);
  res.send(movie);
});


// start the express server
app.listen(5123, () => {
  console.log("server is running at http://localhost:5123");
});
