const { Router } = require('express')

const containers = require('../controllers/servers.controller.js')

const router = Router()

router.get("/servers", containers.getServers)
router.post("/servers/add", containers.addServer)

module.exports = router