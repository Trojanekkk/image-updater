const { Router } = require('express')

const registriesController = require('../controllers/registries.controller.js')

const router = Router()

router.get("/registries", registriesController.getRegistries)
router.post("/registries/add", registriesController.addRegistry)
router.post("/registries/remove", registriesController.removeRegistry)

module.exports = router