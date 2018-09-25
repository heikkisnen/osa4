const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')

const mongoUrl = 'mongodb://teme:teme69@ds113923.mlab.com:13923/blog'
mongoose
  .connect(mongoUrl)
  .then( () => {
    console.log('connected to DB: ', mongoUrl)
  })
  .catch( err => {
    console.log('The following error: ', err);
  })

  app.use(cors())
  app.use(bodyParser.json())
  app.use(express.static('build'))
  app.use('/api/blogs', blogsRouter)
  app.get('/', (request, response) => {
    response.send('<h1> Hello, World! </h1>')
})



const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})