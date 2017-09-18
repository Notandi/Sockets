const mongoose = require('mongoose'),
			Schema = mongoose.Schema

//================================
// Folder Schema
//================================
const FolderSchema = new Schema({

},
{
	collection: 'folder'
});

module.exports = mongoose.model('Folder', FolderSchema);
