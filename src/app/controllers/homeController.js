
const list_videos_model = require('../models/list_videos.model')
const {muntipleMongooseObject} = require('../../util/moongoss')
const {mongooseObject} = require('../../util/moongoss')


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
        
        
        list_videos_model.findById(req.params.video_id)
        .then( list_videos_model => {
            res.render('video_detail',{list_videos_model : mongooseObject(list_videos_model)})
            // res.json(list_videos_model)
        })
        .catch(next)
        
      
    }
}

module.exports = new homeController;