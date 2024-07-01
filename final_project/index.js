const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
let users = require("./router/auth_users.js").users;

// let users = [{"username": "admin", "password": "1111"}];

// Check if the user with the given username and password exists
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

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    //Write the authenication mechanism here

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
        console.log('User logged in. Session authorization: ' + JSON.stringify(req.session.authorization) + ', session ID: ' + req.session.id);
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }

});
 
const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running on port " + PORT));
