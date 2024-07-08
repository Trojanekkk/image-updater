const dbPromise = require('../middleware/loki.js')
const { updateState } = require('../middleware/updateState.js')

const getContainers = async (req, res) => {
    const db = await dbPromise
    const containersCollection = db.getCollection('containers')
    const containers = containersCollection.find()

    res.send(JSON.stringify(containers))
}

const manualRefresh = async (req, res) => {
    containers = await updateState()
    res.send()
}

module.exports = {
    getContainers,
    manualRefresh
}