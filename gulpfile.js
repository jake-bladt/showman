const secrets = require('./secret');
const gulp = require('gulp');
const reconciler = require('./scripts/reconciler')

gulp.task('reconcile', () => {
  console.log('reconciling...');
  let reader = reconciler.imageLibraryReaderFactory.getReader('fs', secrets.galleryRoot);
  let librarySubjects = reader.getSubjects();
  console.log(librarySubjects.debugInfo);
});
