const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');

// Base URL for the API
const base_url = "http://localhost:3001"; // ใช้ URL ของ API ที่กำหนด

// Set the template engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(__dirname + '/public'));

// Home page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(base_url + '/books');
    res.render("books", { books: response.data });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send('Error while fetching books');
  }
});

// View specific book details
app.get("/book/:id", async (req, res) => {
  try {
    const response = await axios.get(base_url + '/books/' + req.params.id);
    res.render('book', { book: response.data });
  } catch (err) {
    console.error(`Error fetching book with ID ${req.params.id}:`, err);
    res.status(500).send('Error while fetching book details');
  }
});

// Create book form
app.get("/create", (req, res) => {
  res.render("create");
});

// Create book (POST request)
app.post("/create", async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      author: req.body.author,
    };
    await axios.post(base_url + '/books', data); 
    res.redirect("/");
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).send('Error while creating book');
  }
});

// Edit book form
app.get("/update/:id", async (req, res) => {
  try {
    const response = await axios.get(base_url + '/books/' + req.params.id);
    res.render("update", { book: response.data });
  } catch (err) {
    console.error(`Error fetching book with ID ${req.params.id} for update:`, err);
    res.status(500).send('Error while fetching book for update');
  }
});

// Update book (POST request)
app.post("/update/:id", async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      author: req.body.author,
    };
    await axios.put(base_url + "/books/" + req.params.id, data);
    res.redirect("/");
  } catch (err) {
    console.error(`Error updating book with ID ${req.params.id}:`, err);
    res.status(500).send('Error while updating book');
  }
});

// Delete book
app.get("/delete/:id", async (req, res) => {
  try {
    await axios.delete(base_url + '/books/' + req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(`Error deleting book with ID ${req.params.id}:`, err);
    res.status(500).send('Error while deleting book');
  }
});

// Start server on port 5501
app.listen(5501, () => {
  console.log("Server started on port 5501");
});
