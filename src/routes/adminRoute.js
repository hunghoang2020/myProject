const express = require('express')
const app = express()
const router = express.Router()

const multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // console.log(file.mimetype)
        if(file.mimetype === 'image/jpeg'){
            cb(null, 'uploadss/img/');
        }else if(file.mimetype === 'video/mp4'){
            cb(null, 'uploadss/video/');
        }
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    },
  });

var upload = multer({ storage: storage });

const cpUpload = upload.fields([
    { name: 'img_video', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]);

const adminController = require('../app/controllers/adminController')



router.use('/ad_controll/adminlist_videos',adminController.admin_list_video)

router.get('/ad_controll',adminController.index)
router.post('/ad_controll',adminController.login_form)

router.get('/ad_controll/add_new_video', adminController.add_new_video)
router.post('/ad_controll/add_new_video',cpUpload,  (req, res) =>{
    
//    console.log(req.files['img_video'][0])
//    console.log(req.files['video'][0])
//    console.log('innininin')
   res.json('end')

   


})



// router.use('/list',listVideosController.index)

module.exports = router; 