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
  res.json(result)
} catch(err) {
  res.status(500).json({
    status: 500,
    message: 'Failed request!'    
  })
}
  console.log(`User acces: ${req.url}
  User Ip: ${req.ip}`)
})

app.get('/nimegami', async (req, res) => {
  try {
const { data } = await axios.get('https://nimegami.id', {
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.55'
}
})
const $ = await cheerio.load(data)
const result = []
$('div.wrapper > div.post > div.post-article > article').each((i, el) => {
const title = $(el).find("div.info > h2[itemprop='name'] > a").text().trim();
const rating = $(el).find('div.info > div.top-post > div.rating').text().trim();
const upload = $(el).find('div.info > ul > li:eq(0)').text().replace('Posted on: ', ' ').trim();
const category = $(el).find('div.info > ul > li:eq(1) a').text().split(/(?=[A-Z])/).map(e => e.trim()).join(', ')
const episode = $(el).find('div.info > ul > li:eq(2)').text().replace('Episode: ', ' ').trim();
const duration = $(el).find('div.info > ul > li:eq(3)').text().replace('Duration: ', ' ').replace('per ep', ' ').trim()
const type = $(el).find('div.info > div.bot-post > a:eq(3)').text().trim() || 'N/A';
const thumb = $(el).find('div.thumb > a > img').attr('src');
const url = $(el).find('div.thumb > a').attr('href');
result.push({
dev: 'agx',
status: 200,
data: {
title,
rating,
upload,
episode,
duration,
type,
url,
thumb,
category
}
})})
  res.json(result)
} catch(err) {
  res.status(500).json({
    author: 'agx',
    status: 500,
    message: 'Error failed request!',
    error: err.message
})}})  

module.exports = app;
