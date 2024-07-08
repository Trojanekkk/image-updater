const axios = require('axios')

const dbPromise = require('./loki.js')

const updateState = async () => {
    const db = await dbPromise
    const serversCollection = db.getCollection('servers')
    const servers = serversCollection.find()

    const containersPromises = servers.map(async server => {
        const response = await axios.get(`http://192.168.1.27:2375/containers/json`)
        return response.data.map(container => ({
            name: container.Names[0].split('/')[1],
            server: server.name,
            id: container.Id,
            status: container.Status,
            state: container.State,
            image: container.Image,
            imageId: container.ImageID
        }))
    })

    const containers = (await Promise.all(containersPromises)).flat()

    const containersCollection = db.getCollection('containers')

    containers.forEach(container => {
        const existingContainer = containersCollection.findOne({ name: container.name, server: container.server })
        if (existingContainer) {
            const updatedContainer = { ...existingContainer, ...container }
            containersCollection.update(updatedContainer)
        } else {
            containersCollection.insert({ ...container, updaterConfig: {
                auto: false,
                rule: "",
                availableImage: "",
                availableImageId: "",
                readyForUpdate: false
            }})
        }
    })

    return containers
}

module.exports = {
    updateState
}