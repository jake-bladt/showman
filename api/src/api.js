const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = process.env.PORT || 8088;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: 'Service up and running.' });   
});

app.listen(port);
console.log('Listening on port ' + port);
