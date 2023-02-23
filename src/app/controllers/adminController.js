
const adminControll_model = require('../models/adminControll.model')
const {muntipleMongooseObject} = require('../../util/moongoss')
const jwt = require('jsonwebtoken');
class adminController{

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
        // list_videos_model.find({})
        //     .then(list_videos_model => {
        //         // list_videos_model  = list_videos_model.map(list_videos_model => list_videos_model.toObject())
               
        //         res.render('list_videos',{
        //             list_videos_model : muntipleMongooseObject(list_videos_model)
        //         })
        //     })
        //     .catch(error => next(err))
        // res.render('./layouts/admin_login')
        res.render('./layouts/admin_login', { title: 'my other page', layout: 'admin_login' });
       
    }
    login_form(req, res,next){
        var user_name = req.body.email;
        var user_password = req.body.password;
        // console.log('submit thanh cong' + user_name +'  ' + user_password)

        adminControll_model.findOne({
            user_name ,
            user_password ,
        })
        .then(data =>{
          if (data) {
            // res.json('submit thanh cong: ' )
            // console.log(data)
           var token =  jwt.sign({_id : data._id},'mk')
            return res.json({
                message : 'thanh cong ',
                token : token,
            })
          } else {
            res.json('dang nhap ko thanh cong' )
          }

           

        })
        .catch(err => {
            res.status(500).json('loi server')
        })

 
        
    }
    admin_list_video(req,res,next){
        res.json('list video')
    }
}

module.exports = new adminController;