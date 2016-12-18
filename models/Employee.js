var mongoose = require('mongoose');

module.exports = mongoose.model('Employee', {
	name : {type: String, unique:true},
  	email: {type: String, unique:true},
  	department: {type: String},
  	gender:{type: String},
  	dob : {type: String},
  	age : {type: Number}
});