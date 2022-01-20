const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);


const ordersschema = new Schema({
	vendorname: {
		type: String,
		required: false
	},
    buyername:{
        type: String,
        required: false
    },
    item: {
        type: String,
        required: false
    },
    quantity: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    cost: {
        type: String,
        required: false
    },
    addon: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
});
ordersschema.plugin(autoIncrement.plugin, 'orders');
module.exports = orders = mongoose.model("orders", ordersschema);
