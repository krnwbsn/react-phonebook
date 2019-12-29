const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let phonebookSchema = new Schema({
    id: String,
    name: String,
    phone: String,
})

module.exports = mongoose.model('Phonebook', phonebookSchema);