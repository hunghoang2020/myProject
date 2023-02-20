class listVideosController{

    index(req, res){
        res.render('list_videos');

    }
}

module.exports = new listVideosController;