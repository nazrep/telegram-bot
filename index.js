require('dotenv').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const { API_TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${API_TOKEN}`
const URI = `/webhook/${API_TOKEN}`
const WEBHOOK_URL = `${SERVER_URL}${URI}`
const DEFAULT_PORT = 5000
const PORT = process.env.PORT ?? DEFAULT_PORT

const app = express()
app.use(bodyParser.json())

const init = async () => {
  try {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
  } catch (e) {
    console.error(e)
  }
}

app.post(URI, async (req, res) => {
  console.log(req.body)

  const chatId = req.body.message.chat.id
  const text = req.body.message.text

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId, text
  })
  return res.send()
})

app.listen(PORT, async () => {
  console.log('🚀 app running on port', PORT)
  await init()
})
