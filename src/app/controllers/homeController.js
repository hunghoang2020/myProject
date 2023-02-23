
const list_videos_model = require('../models/list_videos.model')
const {muntipleMongooseObject} = require('../../util/moongoss')

class homeController{

    index(req, res, next){
      
        // day la cach su dung promiss
        list_videos_model.find({})
            .then(list_videos_model => {
                // list_videos_model  = list_videos_model.map(list_videos_model => list_videos_model.toObject())
              
                res.render('home',{
                   
                    list_videos_model : muntipleMongooseObject(list_videos_model)
                })
            })
            .catch(error => next(err))
    }
    
    view(req, res, next){
        
        console.log(req.query.name);
        res.render('video')
    }
}

module.exports = new homeController;