const Subject = require('../models/subject');

module.exports = (router) => {

  router.route('/subjects')
    .post((req, res, next) => {

      var existingId = false;
      var findErr = false;

      Subject.findOne({ name: req.body.name }, 'id', (err, existing) => {
        findErr    = err || false;
        if(existing) existingId = existing.id || false;
      });

      console.log('error:', findErr);
      console.log('id:', existingId);

      if(findErr) return next(findErr);
      if(existingId) res.status(406).send(`A subject named ${req.body.name} with id ${existingId} already exists.`);

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
      })
    })

    .get((req, res) => {
      Subject.find((err, subjects) => {
        if(err) res.send(err);
        res.json(subjects);
      });
    });

  router.route('/subjects/:subject_id')
    .get((req, res) => {
      Subject.findById(req.params.subject_id, (err, subject) => {
        if(err) res.send(err);
        res.json(subject);
      });
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
