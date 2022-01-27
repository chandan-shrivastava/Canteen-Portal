var express = require("express");
var router = express.Router();

// Load User model
const orders = require("../models/orders");

router.get("/", function (req, res) {
    orders.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});


router.post("/placeorder", (req, res) => {

    const newUser = new orders({
        item: req.body.item,
        buyername: req.body.buyername,
        buyeremail: req.body.buyeremail,
        cost: req.body.cost,
        vendorname: req.body.vendorname,
        vegornveg: req.body.vegornveg,
        quantity: req.body.quantity,
        addon: req.body.addon,
        date:   req.body.date,
        status: req.body.status,
        rating: req.body.rating,
    });
    console.log(newUser);
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});




router.post("/changestatus", (req, res) => {

    const id = req.body.id;
    const status = req.body.status;
    orders.findOneAndUpdate({ _id: id },
        { status: status }, null, function (err, docs) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                console.log(docs);
                res.send(docs);
            }
        });
});



module.exports = router;
