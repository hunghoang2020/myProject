const express = require('express')
const app = express()
const router = express.Router()


const homeController = require('../app/controllers/homeController')


router.use('/view_video',homeController.view)
router.use('/add_video',homeController.view)

router.use('/',homeController.index)


module.exports = router;