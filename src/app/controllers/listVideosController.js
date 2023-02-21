
const list_videos_model = require('../models/list_videos.model')
const {muntipleMongooseObject} = require('../../util/moongoss')

class listVideosController{

    index(req, res, next){
        // res.render('list_videos');
        // res.json({  name : 'test'})
        //day la cach su dung call back function de render
        // list_videos_model.find({},function (err,list_videos_model) {
        //     if (!err) {
        //         res.json(list_videos_model)
        //     }
        //     else 
        //         {  
        //             next(err)
        //             res.status(400).json({error: "ERROR !!!"})
        //     }
          
        // })
        // day la cach su dung promiss
        list_videos_model.find({})
            .then(list_videos_model => {
                // list_videos_model  = list_videos_model.map(list_videos_model => list_videos_model.toObject())
               
                res.render('list_videos',{
                    list_videos_model : muntipleMongooseObject(list_videos_model)
                })
            })
            .catch(error => next(err))
    }
}

module.exports = new listVideosController;