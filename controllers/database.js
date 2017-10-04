var file = require('../models/file');
var ot = require('./ot.js');

/*
// updates the file if possible
updateVersion(foundfile, data);
updateUpdateList(foundfile, data);
updateData(foundfile, data);

// gets all the required updates to be up to date
getUpdatedversion(foundfile);
*/


function database (){

}

// removes all the data and the id
database.prototype.removeById = function (id) {
  return file.findOne({ "_id" : id}, (err,data) => {
    if (err) return err;
    data.remove();
    return true;
  })
}

// gets all the data related to the id
database.prototype.getById = function(id) {
  return file.findOne({ "_id" : id}, (err,data) => {
    if (err) return err;
    return data;
  })
}

// updates all the data with the operations porvided by the msg
// and returns the new and updated data
database.prototype.update = function (msg) {
  return file.findOne({ "_id" : msg.id}, (err,data) => {
    if (err) return err;
    transform (msg.operations, msg.version, data.version).then (
      (result) =>{
        return result;
      }
    )
  })
}

// Performs operational transformations and performs the required operations on the data
// then returns the data
database.prototype.transform = function (msgOperation, msgVersion, dataVersion) {
  ot();
}

// inserts data into the text
database.prototype.insert = function (value, position) {

}

// deletes data from the text
database.prototype.delete = function (position) {

}





module.exports = database;
