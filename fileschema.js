var monogoose = require('mongoose');
var schema = monogoose.Schema;

var fileSchema = schema({
    id:String,
    first_name:String,
    last_name:String,
    email:String,
    gender:String,
    id_address:String
})

module.exports = monogoose.model('fileSchema',fileSchema);