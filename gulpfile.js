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
  let fsReader = reconciler.imageLibraryReaderFactory.getReader(settings.gallerySource, path.join(settings.galleryRoot, 'subjects'));
  let librarySubjects = fsReader.getSubjects().subjects;
  console.log(`${Object.keys(librarySubjects).length.toLocaleString()} subjects in file system.`);

  console.log('reading from yearbook.');
  let ybReader = reconciler.yearbookReaderFactory.getReader(settings.gallerySource, path.join(settings.galleryRoot, 'yearbook'));
  let yearbookSubjectNames = ybReader.getSubjects().subjectNames;
  console.log(`${yearbookSubjectNames.length.toLocaleString()} subjects in the yearbook.`);

  console.log('comparing');
  let missing = reconciler.reconcile({ elements: Object.keys(librarySubjects)}, { elements: yearbookSubjectNames });

  console.log(`Missing from file system: ${missing.set1missing}`);
  console.log(`Missing from yearbook: ${missing.set2missing}`);

});
