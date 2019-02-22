const express = require("express");

const mongoose = require("mongoose");
const routes = require("./server/routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

// Define middleware here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wreck-ur-life", { useNewUrlParser: true });

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
