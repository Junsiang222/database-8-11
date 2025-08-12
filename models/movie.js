const mongoose = require("mongoose");

// declare schema for Movies
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creator:{
     type:String,
     required:true,
  },
  premiere_year: {
    type: Number,
    required: true,
  },
  end_year: {
    type: Number,
    required: true,
  },
  seasons:{
    type:Number,
    required:true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

// create a Modal from the schema
const Movie =mongoose.model("Movie", movieSchema);

// export the Modal
module.exports = Movie;
