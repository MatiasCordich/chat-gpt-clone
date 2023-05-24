const express = require('express')
const cors = require('cors')
const completionsRoute = require('./routes/route')
require('dotenv').config()

const PORT = 8800
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send({msg: "Api funcionando"})
})
app.use('/completions', completionsRoute)

app.listen(PORT, () => console.log(`Server rendering on http://localhost:${PORT}`))
