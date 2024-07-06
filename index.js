const express = require('express')
const app = express()
const port = 3000

app.use(express.json()); 

const containers = require('./src/routes/containers.route.js'); 

app.use('/api/v1', containers); 

app.use(express.static("frontend/dist/spa"))

app.listen(port, () => {
  console.log(`Image updater app listening on port ${port}`)
})