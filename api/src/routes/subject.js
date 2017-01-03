const Subject = require('../models/subject');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (router) => {

  router.route('/subjects')
    .post((req, res) => {

      Subject.findOne({ name: req.body.name }, '_id', (error, existing) => {
        if(error)    res.status(500).send({ error });
        if(existing) res.status(406).send(`A subject named ${req.body.name} with id ${existing['_id']} already exists.`);

        var subject = new Subject();
        subject.name = req.body.name;
        subject.display_name = req.body.displayName || Subject.displayNameFromName(req.body.name);
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

  router.route('/subjects/:identifier')
    .get((req, res) => {

      var subjectOID = false;
      if(ObjectId.isValid(req.params.identifier)) subjectOID = new ObjectId(req.params.identifier);

      if(subjectOID == req.params.identifier) {
        Subject.findById(subjectOID, (err, subject) => {
          if(err) res.send(err);
          if(subject) res.json(subject);
          res.status(404).send(`No subject found with id ${req.params.identifier}.`);
        });
      } else {
        Subject.findOne({ name: req.params.identifier }, (err, subject) => {
          if(err) res.send(err);
          if(subject) res.json(subject);
          res.status(404).send(`No subject found with the name ${req.params.identifier}.`);
        });
      }

    })

    .put((req, res) => {

      var subjectOID = false;
      if(ObjectId.isValid(req.params.identifier)) subjectOID = new ObjectId(req.params.identifier);

      if(subjectOID == req.params.identifier) {
        Subject.findById(req.params.identifier, (err, subject) => {
          if(err) res.send(err);
          if(subject) {
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
          } else {
            res.status(404).send(`No subject found with id ${req.params.identifier}.`);
          }
        });
      } else {
        Subject.findOne({ name: req.params.identifier }, (err, subject) => {
          if(err) res.send(err);
          if(subject) {
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
          } else {
            res.status(404).send(`No subject found with the name ${req.params.identifier}.`);
          }
        });
      }

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
