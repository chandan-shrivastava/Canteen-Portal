const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var FoodItem = require("./routes/fooditem");
var Orders = require("./routes/orders");
var Favourites = require("./routes/favourites");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb+srv://chandan:Chandan@2002@cluster0.g1axb.mongodb.net/tutorial?retryWrites=true&w=majority', { useNewUrlParser: true });
// mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/vendor", FoodItem);
app.use("/orders", Orders);
app.use("/favourites", Favourites);

app.listen(process.env.PORT || 4000, function() {
    console.log("Server is running");
});
