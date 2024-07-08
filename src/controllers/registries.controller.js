const dbPromise = require('../middleware/loki.js')

const getRegistries = async (req, res) => {
    const db = await dbPromise
    const registriesCollection = db.getCollection('registries')
    const registries = registriesCollection.find()

    res.send(registries)
}

const addRegistry = async (req, res) => {
    const db = await dbPromise
    const registriesCollection = db.getCollection('registries')
    
    const { name, ip = "registry.hub.docker.com", port = 80, secure = true, username = null, password = null } = req.body

    if (!name) {
        return res.status(400).send({ "error": "Name must be specified" })
    }

    if (registriesCollection.findOne({ name })) {
        return res.status(400).send({ "error": "Container registry with that name already exists" })
    }

    if (registriesCollection.findOne({ ip, port })) {
        return res.status(400).send({ "error": "Container registry with that IP and port already exists" })
    }

    const registry = {
        name,
        ip,
        port,
        secure,
        username,
        password,
        status: null,
        default: registriesCollection.findOne({ default: true }) ? false : true
    }


    console.log(registry)
    registriesCollection.insert(registry)

    res.send(JSON.stringify(registry))
}

const removeRegistry = async (req, res) => {
    const db = await dbPromise
    const registriesCollection = db.getCollection('registries')
    const { name } = req.body

    if (!name) {
        return res.status(400).send({ "error": "Name must be specified" })
    }

    registriesCollection.findAndRemove({ name })

    res.send({ name })
}

module.exports = {
    getRegistries,
    addRegistry,
    removeRegistry,
}