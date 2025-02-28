const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express() 

app.get('/', (req, res) => {
  res.send('still in development stage!')
  console.log(`User acces: ${req.url}
  User Ip: ${req.ip}`)
})

app.get('/javtiful', async(req, res) => {
try {
const { data } = await axios.get('https://javtiful.com/main', {
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.55'
}
})
const $ = await cheerio.load(data)
const result = []
$('section#latest-censored-videos > div.row > div.col > div.card').each((i,el) => {
const title = $(el).find('div.card-body > div.d-flex > a.done').text().trim()
const view = $(el).find('div.card-body > div.video-more-details > span.video-views').text().trim()
const upload = $(el).find('div.card-body > div.video-more-details > span.video-addtime').text().trim()
const thumb = $(el).find('a.video-tmb > img.card-img-top ').attr('data-src')
const duration = $(el).find('div.overlay-label  > div.label-hd-duration > span.label-duration').text()
const code = $(el).find('div.overlay-label  > div.label-code').text() || 'N/A'
const url = $(el).find('a.video-tmb').attr('href')

result.push({
author: 'agx',
status: 200,
title,
view,
code,
duration,
upload,
thumb,
url
})
})
  res.send(result)
} catch(err) {
  res.send('Error request failed!')
}
  console.log(`User acces: ${req.url}
  User Ip: ${req.ip}`)
})

module.exports = app;
