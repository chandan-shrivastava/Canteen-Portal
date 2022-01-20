const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fooditemschema = new Schema({
	name: {
		type: String,
		required: false
	},
    price: {
        type: String,
        required: false
    },
    shopname: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    vegornveg: {
        type: String,
        required: false
    },
    addon1: {
        type: String,
        required: false
    },
    addon2: {
        type: String,
        required: false
    },
    addon3: {
        type: String,
        required: false
    },
    addon4: {
        type: String,
        required: false
    },
    tags: {
        type: String,
        required: false
    },
});
module.exports = fooditem = mongoose.model("fooditem", fooditemschema);
