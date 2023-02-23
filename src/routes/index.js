const listVideosRoute = require('./listVideosRoute')
const homeRoute = require('./homeRoute')
const adminRoute = require('./adminRoute')
function route(app){
  

  app.use('/',adminRoute)

  app.use('/', homeRoute) 
  app.use('/',listVideosRoute)

  // cau hinh route cho admin
  //[get] localhost/ad_controll
 


   

    
      
      
    //   app.get('/list_videos', (req, res) => { 
    //     // res.send('Hello World!ssss')
    //     res.render('list_videos');
    //   })
    
}
module.exports = route;
