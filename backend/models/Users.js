const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: false
	},
	contact:{
		type: String,
		required: false
	},
	passwd:{
		type: String,
		required: false
	},
	Type:{
		type: String,
		required: false
	},
	shopname:{
		type: String,
		required: false
	},
	openingtime:{
		type: String,
		required: false
	},
	closingtime:{
		type: String,
		required: false
	},
	age:{
		type: String,
		required: false
	},
	batch:{
		type: String,
		required: false
	},
	wallet:{
		type: String,
		required: false
	},
	date:{
		type: String,
		required: false
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
