const secrets = require('./secret');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

const port = process.env.API_PORT || 8088;
const dburl = process.env.DBURL || secrets.DBUrl;

const mongoose = require('mongoose');
mongoose.connect(dburl);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

// middleware
router.use((req, res, next) => {
  console.log('request received.');
  next();
});

router.get('/', (req, res) => {
    res.json({ message: 'Service up and running.' });   
});

const subjectRoutes = require('./routes/subject');
subjectRoutes(router);

app.listen(port);
console.log('Listening on port ' + port);
