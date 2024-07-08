const dbPromise = require('../middleware/loki.js')


// const getContainers = async (req, res) => { 
//     const response = await axios.get('http://192.168.1.27:2375/containers/json')
//     const containers = response.data.map(container => {
//         return {
//             name: container.Names[0].split('/')[1],
//             id: container.Id,
//             status: container.Status,
//             state: container.State,
//             image: container.Image,
//             imageId: container.ImageID
//         }
//     });
//     res.send(JSON.stringify(containers))
// } 

const getContainers = async (req, res) => {
    const db = await dbPromise
    const containersCollection = db.getCollection('containers')
    const containers = containersCollection.find()

    res.send(JSON.stringify(containers))
}

module.exports = {
    getContainers
}