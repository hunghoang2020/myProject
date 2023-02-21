const mongoose = require('mongoose');
async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/video_project_dev');
       
        console.log('\nCONNECTION: CONNECTION SUCCESSFULLY !!!\n')
    } catch (error) {
        console.log('CONNECTION FAILURE !!!!')
    }
}   

module.exports = {connect}