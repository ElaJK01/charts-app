require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars');

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: process.env.USER_COCO,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/coco-data', (req, res) => {
  pool.query('SELECT * FROM chocolate_type;')
  .then((result) => res.send(result.rows))
  .catch((err) => console.error(err))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
