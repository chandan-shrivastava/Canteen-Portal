var express = require("express");
var router = express.Router();

const fooditem = require("../models/fooditem");


router.get("/", function (req, res) {
    fooditem.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});


router.post("/addfood", (req, res) => {

    const newUser = new fooditem({
        name: req.body.name,
        price: req.body.price,
        shopname: req.body.shopname,
        rating: req.body.rating,
        vegornveg: req.body.vegornveg,
        addon1: req.body.addon1,
        addon2: req.body.addon2,
        addon3: req.body.addon3,
        addon4: req.body.addon4,
        tags: req.body.tags,
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

router.post("/fooditem/delete", (req, res) => {

    const newUser = new fooditem({
        _id: req.body._id,
    });
    newUser.deleteOne({ _id: newUser._id })
        .then(function () {
            console.log("Document deleted");
        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = router;
