const gulp = require('gulp');
const path = require('path');

const secrets = require('./secret');
const reconciler = require('./scripts/reconciler')

gulp.task('reconcile', () => {
  console.log('reconciling...');
  console.log('reading from file system.');
  let reader = reconciler.imageLibraryReaderFactory.getReader('fs', path.join(secrets.galleryRoot, 'subjects'));
  let librarySubjects = reader.getSubjects();
  console.log(`${librarySubjects.subjects.count.toLocaleString()} subjects in file system.`);
});
