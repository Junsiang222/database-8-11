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

//declare schema for shows
const showschema = new mongoose.Schema({
  title:String,
  creator:String,
  premiere_year:Number,
  end_year:Number,
  seasons:Number,
  genre:String,
  rating:Number
});

//create a Modal from the schema
const show = mongoose.model("show",showschema)

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});
/*
Routes for shows
Get /shows -list all the shows
GET /shows/68943cf564aa9f8354cef260 - get a specific show
PUT /shows/68943cf564aa9f8354cef260 - update show
DELETE /shows/68943cf564aa9f8354cef260 - delete show
*/

app.get("/shows", async(req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;
  

//crate a empty container for filter
let filter={};
//if genre exists , then only add it into the filter container
if(genre){
  filter.genre=genre;
}
//if rating exists , then only add it into the filter container
if(rating){
  filter.rating={ $gt:rating};
}

//if premiere_year exists , then only add it into the filter container
if(premiere_year){
  filter.premiere_year={ $gt:premiere_year};
}
  //load the shows data from Moogodb
  const shows = await show.find(filter);
  res.send(shows);
});

//GET /shows/id - get a specific show
app.get("/shows/:id", async(req, res) => {
 const id = req.params.id;
 //load the shows data based on id
 const show = await show.findById(id);
  res.send(show);
});


// start the express server
app.listen(5524, () => {
  console.log("server is running at http://localhost:5524");
});
