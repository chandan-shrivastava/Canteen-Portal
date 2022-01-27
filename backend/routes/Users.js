var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const email = req.body.email;

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        Type: req.body.Type,
        age: req.body.age,
        passwd: req.body.passwd,
        batch: req.body.batch,
        shopname: req.body.shopname,
        openingtime: req.body.openingtime,
        closingtime: req.body.closingtime,
        wallet: req.body.wallet,
        date: req.body.date
    });

    User.findOne({ email }).then(user => {
        console.log(user);
        if (user) {
            res.status(200).send("Email already exists");
        }
        else {
            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    });
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const passwd = req.body.passwd;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            if (passwd === user.passwd) {
                res.send(user);
            }
            else {
                return res.status(404).json({
                    error: "Wrong Password",
                });
            }
        }
    });
});

router.post("/profile/edit", (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const oldemail = req.body.oldemail;
    const contact = req.body.contact;
    const Type = req.body.Type;
    const age = req.body.age;
    const passwd = req.body.passwd;
    const batch = req.body.batch;
    const shopname = req.body.shopname;
    const openingtime = req.body.openingtime;
    const closingtime = req.body.closingtime;
    const date = req.body.date;
    User.findOneAndUpdate({ email: oldemail },
        { name: name, email: email, contact: contact, Type: Type, age: age, passwd: passwd, batch: batch, shopname: shopname, openingtime: openingtime, closingtime: closingtime, date: date }, null, function (err, docs) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(docs);
            }
        });
});

router.post("/addmoney", (req, res) => {
    const email = req.body.email;
    var wallet = req.body.wallet;
    // Find user by email
    User.findOne({ email }).then(user => {
        wallet = parseInt(wallet) + parseInt(user.wallet);
        User.findOneAndUpdate({ email: email },
            { wallet: wallet }, null, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                else {
                    User.findOne({ email }).then(user => {
                        res.send(user);
                    });
                }
            });

    });
});

router.post("/ordermoneyadd", (req, res) => {
    const email = req.body.buyeremail;
    var wallet = req.body.cost;
    User.findOne({ email }).then(user => {
        wallet = parseInt(user.wallet) - parseInt(wallet);
        User.findOneAndUpdate({ email: email },
            { wallet: wallet }, null, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                else {
                    User.findOne({ email }).then(user => {
                        res.send(user);
                    });
                }
            });
    });
});

router.post("/ordermoneysub", (req, res) => {
    const email = req.body.email;
    var wallet = req.body.cost;
    User.findOne({ email }).then(user => {
        wallet = parseInt(user.wallet) + parseInt(wallet);
        User.findOneAndUpdate({ email: email },
            { wallet: wallet }, null, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                else {
                    User.findOne({ email }).then(user => {
                        console.log(user);
                        res.send(user);
                    });
                }
            });
    });
});

router.post("/gettime", (req, res) => {
    const shopname = req.body.shopname;
    console.log(shopname);
    User.findOne({ shopname }).then(user => {
        console.log(user);
        res.send(user);
    });
});

module.exports = router;

