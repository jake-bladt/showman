const Subject = require('../models/subject');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (router) => {

  router.route('/subjects')
    .post((req, res) => {

      Subject.findOne({ name: req.body.name }, '_id', (error, existing) => {
        if(error)    res.status(500).send({ error });
        if(existing) res.status(406).send(`A subject named ${req.body.displayName} with id ${existing['_id']} already exists.`);

        var subject = new Subject();
        subject.name = req.body.name;
        subject.display_name = req.body.displayName;
        subject.image_count = req.body.imageCount;
        subject.is_active = true;
        subject.date_added = Date.now();

        subject.save((err) => {
          if(err) res.send(err);
          res.json({ 
            message: subject.display_name + ' created.',
            subject: subject 
          });
        });
      });
    })

    .get((req, res) => {
      Subject.find((err, subjects) => {
        if(err) res.send(err);
        res.json(subjects);
      });
    });

  router.route('/subjects/:subject_id')
    .get((req, res) => {

      var subjectOID = false;
      if ObjectId.IsValid(req.params.subject_id) subjectOID = new ObjectId(req.params.subject_id);

      if(subjectOID == req.params.subject_id) {
        Subject.findById(subjectOID, (err, subject) => {
          if(err) res.send(err);
          if(subject) res.json(subject);
          res.status(404).send(`No subject found with id ${req.params.subject_id}.`);
        });
      } else {
        Subject.findOne({ name: req.params.name }, (err, subject) => {
          if(err) res.send(err);
          if(subject) res.json(subject);
          res.status(404).send(`No subject found with the name ${req.params.name}.`);
        });
      }

    })

    .put((req, res) => {
      Subject.findById(req.params.subject_id, (err, subject) => {
        if(err) res.send(err);

        subject.name = req.body.name;
        subject.display_name = req.body.displayName;
        subject.image_count = req.body.imageCount;

        subject.save((err) => {
          if(err) res.send(err);
          res.json({
              message: subject.display_name + " updated.",
              subject: subject
          });
        });      
      });
    })

    .delete((req, res) => {
      Subject.findById(req.params.subject_id, (err, subject) => {
        if(err) res.send(err);

        subject.is_active = false;
        subject.save((err) => {
          if(err) res.send(err);
          var message = subject.display_name + " marked inactive.";
          res.json({ message });
        });
      });
    });
};
