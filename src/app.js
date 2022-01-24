require('dotenv').config();
const express = require('express');

const app = express();
const port = 3000;

const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

const { Pool } = require('pg');
const handlers = require('../handlers');

const pool = new Pool({
  user: process.env.USER_COCO,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/', (req, res) => {
  const cocoType = req.body.coco;
  const { quantity } = req.body;
  if (!quantity || !cocoType) {
    return res.send('Fill in all fields');
  }
  if (!cocoType.trim().length > 0 || !quantity.trim().length > 0) {
    return res.send('Fill in all fields properly!');
  }
  if (isNaN(quantity)) {
    res.send('Put a number');
  } else {
    if (handlers.addToDb(pool, cocoType, quantity)) {
      return res.render('stats');
    }
    return res.send('something went wrong!');
  }
});

app.get('/coco-stats', (req, res) => {
  res.render('stats');
});

app.get('/coco-data', (req, res) => {
  pool.query('SELECT type_name, SUM (quantity_consumed) FROM chocolate_type GROUP BY type_name;')
    .then((result) => res.send(result.rows))
    .catch((err) => console.error(err));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
