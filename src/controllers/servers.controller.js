const dbPromise = require('../middleware/loki.js')

const getServers = async (req, res) => {
    const db = await dbPromise
    const serversCollection = db.getCollection('servers')
    const servers = serversCollection.find()
    console.log(servers)

    res.send(servers)
}

const addServer = async (req, res) => {
    const db = await dbPromise
    const serversCollection = db.getCollection('servers')
    
    const { name, ip = "127.0.0.1", port = 2375 } = req.body

    if (!name) {
        return res.status(400).send({ "error": "Name must be specified" })
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

module.exports = {
    getServers,
    addServer
}