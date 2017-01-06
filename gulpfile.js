const gulp = require('gulp');
const path = require('path');

const secrets = require('./secret');
const reconciler = require('./scripts/reconciler')

gulp.task('reconcile', () => {
  console.log('reconciling...');
  let reader = reconciler.imageLibraryReaderFactory.getReader('fs', path.join(secrets.galleryRoot, 'subjects'));
  let librarySubjects = reader.getSubjects();
  console.log(librarySubjects.debugInfo);
});
