
const list_videos_model = require('../models/list_videos.model')
class listVideosController{

    index(req, res){
        // res.render('list_videos');
        // res.json({  name : 'test'})
        list_videos_model.find({},function (err,list_videos_model) {
            if (!err) {
                res.json(list_videos_model)
            }
            else 
                {  res.status(400).json({error: "looi"})
            }
          
        })
    }
}

module.exports = new listVideosController;