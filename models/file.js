const mongoose = require('mongoose'),
			Schema = mongoose.Schema

//================================
// File Schema
//================================
const FileSchema = new Schema({

},
{
	collection: 'file'
});

module.exports = mongoose.model('File', FileSchema);
