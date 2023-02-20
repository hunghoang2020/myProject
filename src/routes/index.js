const listVideosRoute = require('./listVideosRoute')
function route(app){
    
    app.use('/',listVideosRoute)
   

    app.get('/', (req, res) => { 
        // res.send('Hello World!ssss')
        res.render('home');
      })
      
    //   app.get('/list_videos', (req, res) => { 
    //     // res.send('Hello World!ssss')
    //     res.render('list_videos');
    //   })
    
}
module.exports = route;
