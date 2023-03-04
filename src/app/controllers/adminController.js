
const adminControll_model = require('../models/adminControll.model')
const list_videos_model = require('../models/list_videos.model')
const {muntipleMongooseObject, mongooseObject} = require('../../util/moongoss')

const jwt = require('jsonwebtoken');
const dir_path = require('path');
const multer = require("multer");
//config file upload
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // console.log(file.mimetype)
        if(file.mimetype === 'image/jpeg'){
            cb(null, 'src/uploadss/img/');
        }else if(file.mimetype === 'video/mp4'){
            cb(null, 'src/uploadss/video/');
        }
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });



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
    //config upload 2 filed in form
    cpUpload = upload.fields([
        { name: 'img_video', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ]);
    //get add video form
    add_new_video (req,res,next) {
        res.render('add_new_video')
    }
    // process form add video
    process_form (req, res, next) {
        
        
        // console.log(req.files['img_video'][0])
        // console.log(req.files['video'][0])
       
        // console.log('\n+++++++++++++linnk to brower: ')
       
        // console.log('D:/pro/'+req.files['img_video'][0].path)
        // console.log(dir_path)
        
        // console.log(req.body.video_description)
        
        let formData = {
            name : req.body.video_name,
            decription : req.body.video_description,
            type_video : 'this is type',
            video_link : 'http://localhost:3000/video/'+req.files['video'][0].filename,
            img : 'http://localhost:3000/img/'+req.files['img_video'][0].filename,
        };
       
        // formData.img_video = 'D:/pro/'+req.files['img_video'][0].path
        // formData.video = 'D:/pro/'+req.files['video'][0].path
        const video_list = new list_videos_model(formData)
        video_list.save()

        res.redirect('/ad_controll/adminlist_videos')

    }
    //[DELETE]/ad_controll/delete/:id
    delete(req,res,next){
        list_videos_model.deleteOne({_id : req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
        // console.log('delete')
        
    }
    // [GET] ad_controll/edit_video/:id
    getEditVideo(req,res,next){
        list_videos_model.findById(req.params.id)
            .then(list_videos_model => res.render('edit_video',{
                list_videos_model : mongooseObject(list_videos_model)
            }) )
            .catch(next)
        

    }
}

module.exports = new adminController;