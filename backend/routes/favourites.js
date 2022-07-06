var express = require("express");
var router = express.Router();

const favourites = require("../models/favourites");


router.get("/", function (req, res) {
    favourites.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/addfav", (req, res) => {

    const itemname=req.body.itemname;
    const newUser = new favourites({
        itemname: req.body.itemname,
        buyername: req.body.buyername,
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
    favourites.findOne({ itemname }).then(user => {
        if (!user) {
            newUser.save()
                .then(user => {
                    res.send("Favourited succesfully");
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            res.send("Already in favourite");
        }

    });
});

module.exports = router;
