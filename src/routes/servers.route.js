const { Router } = require('express')

const serversController = require('../controllers/servers.controller.js')

const router = Router()

router.get("/servers", serversController.getServers)
router.post("/servers/add", serversController.addServer)
router.post("/servers/remove", serversController.removeServer)

module.exports = router