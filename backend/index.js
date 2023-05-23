const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
require('dotenv').config()

const PORT = 8800
const app = express()

app.use(express.json())
app.use(cors())

const url = 'https://api.openai.com/v1/chat/completions'

app.post('/completions', async (req, res) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.CHATGPT_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: req.body.message}],
                max_tokens: 100
            })
        }
        const result = await fetch(url, options)
    
        const data = await result.json()
    
        res.send(data)
      } catch (error) {
        res.status(500).json({
            msg: `ERROR: ${error}`
        })
      }
})



app.listen(PORT, () => console.log(`Server rendering on http://localhost:${PORT}`))
