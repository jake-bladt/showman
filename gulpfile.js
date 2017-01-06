const gulp = require('gulp');
const path = require('path');

const secrets = require('./secret');
const reconciler = require('./scripts/reconciler')

const settings = {
  galleryRoot:    process.env.GALLERY_ROOT   || secrets.galleryRoot,
  gallerySource:  process.env.GALLERY_SOURCE || secrets.gallerySource
};

gulp.task('reconcile', () => {
  console.log('reconciling...');
  console.log('reading from file system.');
  let reader = reconciler.imageLibraryReaderFactory.getReader(settings.gallerySource, path.join(settings.galleryRoot, 'subjects'));
  let librarySubjects = reader.getSubjects().subjects;
  console.log(`${Object.keys(librarySubjects).length.toLocaleString()} subjects in file system.`);
});
