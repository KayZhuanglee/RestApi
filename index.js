const e = require('express')
const a = e()

a.get('/', (req, res) => {
  res.send('Hellow User!')
  console.log(req.url)
})
