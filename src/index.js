require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.SERVER_PORT || 3333
const routes = require('./routes')

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(PORT, () => console.log(`[Server] Started on port: ${PORT}`))
