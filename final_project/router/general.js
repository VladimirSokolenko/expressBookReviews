const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books}, null, 4));
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

  // Retrieve the isbn parameter from the request URL and send the corresponding book's details
  const isbn = req.params.isbn;
  console.log('ISBN requested: ' + isbn);
  return res.send(books[isbn]);

  // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  // Extract the author parameter from the request URL
  const author = req.params.author;
  console.log('Author requested: ' + author);
  // Filter the books array to find books which author matches the extracted author parameter
  let filtered_author = Object.values(books).filter((book) => book.author === author);

  res.send(filtered_author);

  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  const title = req.params.title;
  console.log('Title requested: ' + title);
  // Filter the books array to find books which title matches the extracted title parameter
  let filtered_title = Object.values(books).filter((book) => book.title === title);

  res.send(filtered_title);

  // return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  // Retrieve the isbn parameter from the request URL and send the corresponding book's reviews
  const isbn = req.params.isbn;
  console.log('ISBN requested: ' + isbn);
  console.log('Book reviews: ' + JSON.stringify(books[isbn].reviews));
  return res.send(books[isbn].reviews);

  // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
