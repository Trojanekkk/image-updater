const { Router } = require('express')

const containersController = require('../controllers/containers.controller.js')

const router = Router()

router.get("/containers", containersController.getContainers)
router.get("/containers/refresh", containersController.manualRefresh)

module.exports = router