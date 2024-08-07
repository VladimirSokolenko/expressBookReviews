const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username": "admin", "password": "1111"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username, password) => {
  console.log('Existing users: ' + JSON.stringify(users))
  // Filter the users array for any user with the same username and password
  let validusers = users.filter((user) => {
      return (user.username === username && user.password === password);
  });
  console.log('Find users: ' + JSON.stringify(authenticatedUser))
  // Return true if any valid user is found, otherwise false
  if (validusers.length > 0) {
      console.log('User loged in');
      return true;
  } else {
      console.log('User log in failed');
      return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.query.username;
    const password = req.query.password;
    console.log('User login. Received request: ' + JSON.stringify(req.query));
    console.log('User login. Received username: ' + username + ', received password: ' + password);
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        console.log('User logged in. Session authorization: ' + JSON.stringify(req.session.authorization) + 
                    ', session ID: ' + req.session.id + ', user name: ' + req.session.authorization.username);
        return res.status(200).json({message: "User successfully logged in"});
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }

  // return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  console.log('Book reviews adding');
  console.log('Request: ' + JSON.stringify(req.query));

  let username = 'unknown';
  // console.log(req.session.authorization);
  // Getting the user name
  if (req.session.authorization) {
    username = req.session.authorization['username'];
  }
  // Getting the review string
  let review = req.query.review;
  // Updating the review
  const isbn = req.params.isbn;
  books[isbn].reviews[username] = review;
  console.log('Book reviews: ' + JSON.stringify(books[isbn].reviews));
  let resString = "Review added: " + review + ". Reviewer: " + username;
  return res.status(200).json({message: resString});
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  console.log('Book review deleting');
  console.log('Request: ' + JSON.stringify(req.query));

  let username = 'unknown';
  // console.log(req.session.authorization);
  // Getting the user name
  if (req.session.authorization) {
    username = req.session.authorization['username'];
  }
  // Getting the review string
  let review = req.query.review;
  // Updating the review
  const isbn = req.params.isbn;
  delete books[isbn].reviews[username]; // Delete the user's review
  console.log('Book reviews: ' + JSON.stringify(books[isbn].reviews));
  let resString = "Review deleted. Reviewer: " + username;
  return res.status(200).json({message: resString});
  // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
