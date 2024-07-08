const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(express.json()); 

const containers = require('./src/routes/containers.route.js'); 
const registries = require('./src/routes/registries.route.js'); 
const servers = require('./src/routes/servers.route.js'); 

app.use(process.env.API_BASE, containers); 
app.use(process.env.API_BASE, registries); 
app.use(process.env.API_BASE, servers); 

app.use(express.static(process.env.DIST_PATH))

app.listen(process.env.PORT, () => {
  console.log(`Image updater app listening on port ${process.env.PORT}`)
})