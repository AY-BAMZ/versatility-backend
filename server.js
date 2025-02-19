require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const formData = require("express-form-data");
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db');
// const connectDB = require('./config/db');

// dotenv.config();
async function start() {
 
    console.log("ksisjdsn")

    try {
        const app = express();
        const PORT = process.env.PORT || 8080;
        var whitelist = ["http://localhost:3000"];
    
        app.use(
          cors({
            origin(requestOrigin, callback) {
              if (requestOrigin) {
                if (whitelist.indexOf(requestOrigin) !== -1) {
                  callback(null, true);
                } else {
                  callback(new Error("Not allowed by CORS"));
                }
              } else {
                callback(null, true);
              }
            },
          })
        );
        // app.use(cors());
        app.use(express.json());
    
        app.use(formData.parse());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        // Connect to Database
        await mongoose.connect(process.env.MONGO_URI, {});
            console.log("DB is Connected here");

        // Middleware
        app.use(cors());
        // app.use(bodyParser.json());

        // Routes
        app.use('/api/auth', require('./routes/auth'));
        app.use('/api/admin', require('./routes/admin'));
        app.use('/api/student', require('./routes/student'));
        app.use('/api/tutor', require('./routes/tutor'));
        app.use('/api/payment', require('./routes/payment'));


        app.use("*", (req, res) => {
            res.status(404).json({ message: "This routeeeee Not Found" });
          });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        console.log("reaches here")
    } catch (error) {
        console.log("error", error)
    }
}

start().catch((error) => {
    console.error(error);
    process.exit(1);
});