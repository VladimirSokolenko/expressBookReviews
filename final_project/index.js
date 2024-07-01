const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
let users = require("./router/auth_users.js").users;

// let users = [{"username": "admin", "password": "1111"}];

// // Check if the user with the given username and password exists
// const authenticatedUser = (username, password) => {
//     console.log('Existing users: ' + JSON.stringify(users))
//     // Filter the users array for any user with the same username and password
//     let validusers = users.filter((user) => {
//         return (user.username === username && user.password === password);
//     });
//     console.log('Find users: ' + JSON.stringify(authenticatedUser))
//     // Return true if any valid user is found, otherwise false
//     if (validusers.length > 0) {
//         console.log('User loged in');
//         return true;
//     } else {
//         console.log('User log in failed');
//         return false;
//     }
// }

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    //Write the authenication mechanism here

    console.log('Books. Session authorization: ' + req.session.authorization + ', session ID: ' + req.session.id);
    // Check if user is logged in and has valid access token
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken'];

        // Verify JWT token
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                console.log("User succesfully authenticated" );
                req.user = user;
                next(); // Proceed to the next middleware
            } else {
                console.log("User not authenticated" );
                return res.status(403).json({ message: "User not authenticated"});
            }
        });
    } else {
        console.log("User not logged in");
        next(); // Remove after tests
        // return res.status(403).json({ message: "User not logged in" });
    }

});
 
const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running on port " + PORT));
