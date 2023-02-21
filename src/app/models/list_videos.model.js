const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const video_list = new Schema({
    name: String,
    decription: String,
    type_video: String,  
    video_link: String,  
    img: String,
});

module.exports = mongoose.model('video_list', video_list);
