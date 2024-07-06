const express = require('express')
const app = express()
const port = 3000

require('./src/routes.js')(app)

app.use(express.static("frontend/dist/spa"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})