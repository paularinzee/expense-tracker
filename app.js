require("express-async-errors");
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const errorHandler = require("./handlers/errorHandler");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connection to mongodb

// mongoose
//     .connect(
//         process.env.mongo_connection,
//         {}
//     )
//     .then(() => {
//         console.log("Connection to mongodb successful !");
//     })
//     .catch(() => {
//         console.log("Connection to mongodb failed!");
//     });


mongoose.connect(process.env.DATABASE,
{} 
)
.then(() => {
    console.log("Connection to mongodb successful !");
})
.catch(() => {
    console.log("Connection to mongodb failed!");
});


  // Initialize models
  require("./models/Users");
  require("./models/Transaction");



// routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);



app.use(errorHandler);


app.all('*', (req, res, next) => {
    res.status(404).json({
        status:"Not Found",
        message: `Can't find ${req.originalUrl} on this server`,
    });

});
app.listen(3000, () => {
    console.log("Server started Successfully");
});