const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)

app.set('view engine', 'jade');
app.set('javascript', __dirname + '/../app/javascript')
app.set('views', __dirname + '/../app/views')
app.use(express.static(__dirname + '/../public'))

app.get('/', (req, res) => {
  res.render('index')
})

server.listen(8080, function listening() {
  console.log('Listening on %d', `${server.address(), server.address().port}`)
})
