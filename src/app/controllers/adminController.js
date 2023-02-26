
const adminControll_model = require('../models/adminControll.model')
const list_videos_model = require('../models/list_videos.model')
const {muntipleMongooseObject} = require('../../util/moongoss')

const multer = require("multer");
const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,'./uploads')
    },
    filename : function (req,file,cb){
        console.log(file)
        cb(null,file.originalname)
    }
})
const upload = multer({storage : storage}).single('img_video');


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
        adminControll_model.findOne({
            user_name ,
            user_password ,
        })
        .then(data =>{
          if (data) {
            // res.json('submit thanh cong: ' )
            // console.log(data)
           var token =  jwt.sign({_id : data._id},'mk')
  
            // return res.json({
            //     message : 'thanh cong ',
            //     token : token,
            // })
            // res.render('list_videos',{'token': token})
           res.append('Set-Cookie',"mycookie=" + token)
        //    res.render('list_videos')
            res.redirect('/ad_controll/adminlist_videos')
          } else {
            res.json('dang nhap ko thanh cong' )
          }
        })
        .catch(err => {
            res.status(500).json('loi server')
        })

    }
    admin_list_video(req,res,next){
        try {
            var auth = jwt.verify(req.cookies.mycookie,'mk');
        if(auth){
            // console.log(auth)
            // // res.json('essd')
            // res.render('list_videos')
            list_videos_model.find({})
            .then(list_videos_model => {
                // list_videos_model  = list_videos_model.map(list_videos_model => list_videos_model.toObject())
               
                res.render('list_videos',{
                    list_videos_model : muntipleMongooseObject(list_videos_model)
                })
            })
            .catch(error => next(err))
        }else{res.json('loi server')}
            
        } catch (next) {

            res.json('ban phai dang nhap de thuc hien thao tac nay')
        }
        
        
    }
    add_new_video (req,res,next) {
        res.render('add_new_video')
    }
    process_form (req, res, next) {
    // //    res.json(req.body)
    // console.log(req.body);
    // console.log(req.files);
    // res.json({ message: "Successfully uploaded files" });
//    console.log('body: '+req.body.video_name)
    upload(req,res,function (err){
        if(err) {
            res.send(err)
        }
        else{
            console.log(req.body.video_name)
            res.send('sucess')
        }
    })
    

    }
}

module.exports = new adminController;