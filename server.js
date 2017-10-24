const express = require('express')
const request = require('request')
const fs = require('fs')
const path = require('path')
const compression = require('compression');
const app = express()
const nodemailer = require('nodemailer');


// setup compression
app.use(compression())

// set cache headers / expiration headers
app.use(function (req, res, next) {
  let day = (86400000 / 1000),
      numberOfDays = 7;
  if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=' + (day * numberOfDays));
  next()
})

// allows server to fetch/read from these folders
app.use('/src', express.static(path.join(__dirname, './src')))
app.use('/dist', express.static(path.join(__dirname, './dist')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

// for routes / api
app.get('/api/test', (req, res) => {
  res.send("<h1>API TEST</h1>")
})

// default route
app.get('*', (req, res) => {
  res.send(fs.readFileSync(path.join(__dirname, './index.html'), 'utf8'))
})

// Serve the files on port 3000.
app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + (process.env.PORT || 3000) + '\n' );
});
