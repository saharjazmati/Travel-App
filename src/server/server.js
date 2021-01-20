// create an empty object to act as endpoint
let projectData = [];
const express = require("express");
// Start up an instance
const app = express();
// Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

// Initialize dist folder
app.use(express.static("dist"));

// Setup the Server on 7777 port
const port = 7777;
const server = app.listen(port, () => {
  console.log(`running on port: ${port}`);
});
// setup Get route
app.get("/data", (req, res) => {
  res.send(projectData);
});
// setup Geonames Post route
app.post("/geonames", (req, res) => {
  dataGeonames = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };
  projectData.push(dataGeonames);
  res.send(projectData);
});
// setup weatherBit Post Route
app.post("/weatherbit", (req, res) => {
  dataWeatherbit = {
    high: req.body.high,
    low: req.body.low,
    description: req.body.description,
  };
  projectData.push(dataWeatherbit);
  res.send(projectData);
});
// setup pixabay Post Route
app.post("/pixabay", (req, res) => {
  dataPixabay = {
    image: req.body.image,
  };
  projectData.push(dataPixabay);
  res.send(projectData);
});
// finally export the server
module.exports = server;
