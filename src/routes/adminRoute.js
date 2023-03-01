const express = require('express')
const app = express()
const router = express.Router()


const adminController = require('../app/controllers/adminController')



router.use('/ad_controll/adminlist_videos',adminController.admin_list_video)

router.get('/ad_controll',adminController.index)
router.post('/ad_controll',adminController.login_form)

router.get('/ad_controll/add_new_video', adminController.add_new_video)
router.post('/ad_controll/add_new_video',adminController.cpUpload,adminController.process_form )
 
// router.use('/list',listVideosController.index)

module.exports = router; 