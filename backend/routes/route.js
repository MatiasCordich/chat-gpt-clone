const express = require("express")
const { getMessage } = require("../controllers/message.controller")

const route = express.Router()

route.post('/', getMessage)

module.exports = route