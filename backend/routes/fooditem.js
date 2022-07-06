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

router.post("/fooditem/edit", (req, res) => {

    const name = req.body.name;
    const oldname = req.body.oldname;
    const price = req.body.price;
    const shopname = req.body.shopname;
    const vegornveg = req.body.vegornveg;
    const addon1 = req.body.addon1;
    const addon2 = req.body.addon2;
    const addon3 = req.body.addon3;
    const addon4 = req.body.addon4;
    fooditem.findOneAndUpdate({ name: oldname },
        { name: name, price: price, shopname: shopname, vegornveg: vegornveg, addon1: addon1, addon2: addon2, addon3: addon3, addon4: addon4 }, null, function (err, docs) {
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
            res.send("Document deleted");
        })
        .catch(function (error) {
            console.log(error);
            res.send("Error");
        });
});



// router.post("/rating", (req, res) => {

//     const rating = req.body.rating;
//     const id = req.body.id;
//     fooditem.findOne({ id }).then(user => {
//         if (!user) {
//             return res.status(404).json({
//                 error: "Email not found",
//             });
//         }
//         else {
//             fooditem.findOneAndUpdate({ name: oldname },
//                 { rating: rating }, null, function (err, docs) {
//                     if (err) {
//                         console.log(err);
//                         res.send(err);
//                     }
//                     else {
//                         console.log(docs);
//                         res.send(docs);
//                     }
//                 });
//         }
//     });
// });

module.exports = router;
