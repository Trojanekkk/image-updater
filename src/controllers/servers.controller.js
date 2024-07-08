const dbPromise = require('../middleware/loki.js')

const getServers = async (req, res) => {
    const db = await dbPromise
    const serversCollection = db.getCollection('servers')
    const servers = serversCollection.find()

    res.send(servers)
}

const addServer = async (req, res) => {
    const db = await dbPromise
    const serversCollection = db.getCollection('servers')
    
    const { name, ip = "127.0.0.1", port = 2375 } = req.body

    if (!name) {
        return res.status(400).send({ "error": "Name must be specified" })
    }

    if (serversCollection.findOne({ name })) {
        return res.status(400).send({ "error": "Server with that name already exists" })
    }

    if (serversCollection.findOne({ ip, port })) {
        return res.status(400).send({ "error": "Server with that IP and port already exists" })
    }

    const server = {
        name,
        ip,
        port,
        enabled: true
    }

    serversCollection.insert(server)

    res.send(JSON.stringify(server))
}

const removeServer = async (req, res) => {
    const db = await dbPromise
    const serversCollection = db.getCollection('servers')
    const { name } = req.body

    if (!name) {
        return res.status(400).send({ "error": "Name must be specified" })
    }

    serversCollection.findAndRemove({ name })

    res.send({ name })
}

module.exports = {
    getServers,
    addServer,
    removeServer,
}