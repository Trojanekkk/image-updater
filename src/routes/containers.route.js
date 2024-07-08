const { Router } = require('express')

const containers = require('../controllers/containers.controller.js')

const router = Router()

router.get("/containers", containers.getContainers)
router.get("/containers/refresh", containers.manualRefresh)

module.exports = router