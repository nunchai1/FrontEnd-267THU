const express = require("express");
const axios = require("axios");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");

// Base URL for the API
// const base_url = "http://api.example.com";
const base_url = "https://node71794-env-2601767.proen.app.ruk-com.cloud";

app.set("view", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));