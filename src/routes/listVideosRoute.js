const express = require('express')
const app = express()
const router = express.Router()

const listVideosController = require('../app/controllers/listVideosController')

router.use('/list_videos',listVideosController.index)

// router.use('/list',listVideosController.index)

module.exports = router; 