const secrets = require('./secret');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

const port = process.env.PORT || 8088;
const dburl = process.env.DBURL || secrets.DBUrl;

const Subject = require('./models/subject');

const mongoose = require('mongoose');
mongoose.connect(dburl);

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

router.route('/subjects')
  .post((req, res) => {
    var subject = new Subject();
    subject.name = req.body.name;
    subject.display_name = req.body.displayName;
    subject.image_count = req.body.imageCount;
    subject.is_active = true;
    subject.date_added = Date.now();

    subject.save((err) => {
      if(err) res.send(err);
      res.json({ 
        message: subject.display_name + ' created',
        subject: subject 
      });
    });

  });


app.listen(port);
console.log('Listening on port ' + port);
