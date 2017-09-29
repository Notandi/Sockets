const mongoose = require('mongoose'),
			Schema = mongoose.Schema

//================================
// File Schema
//================================
const FileSchema = new Schema({
	_id: {
			type: Number,
			required: true
		},
	data: {
			type: String,
			required: true
		}
},
{
	collection: 'file'
});

module.exports = mongoose.model('File', FileSchema);
