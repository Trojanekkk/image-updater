const axios = require('axios')

const getContainers = async (req, res) => { 
    const response = await axios.get('http://192.168.1.27:2375/containers/json')
    const containers = response.data.map(container => {
        return {
            name: container.Names[0].split('/')[1],
            id: container.Id,
            status: container.Status,
            state: container.State,
            image: container.Image,
            imageId: container.ImageID
        }
    });
    res.send(JSON.stringify(containers))
} 

module.exports = {
    getContainers
}