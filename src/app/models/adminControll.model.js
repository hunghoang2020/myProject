const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const admin_account = new Schema({
    user_name: String,
    user_password: String,
   
});

module.exports = mongoose.model('admin_account', admin_account);
