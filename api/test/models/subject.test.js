const should = require('chai').should;
const subjectModel = require('../../src/models/subject');

describe('#displayNameFromName', () => {
  it('capitalizes the first letter of a simple name', () => {
    subjectModel.displayNameFromName('jake').should.equal('Jake');
  });

  it('capitalizes a trailing initial', () => {
    subjectModel.displayNameFromName('jake.b').should.equal('Jake B');
  });

  it('capitalizes a last name', () => {
    subjectModel.displayNameFromName('jake.bladt').should.equal('Jake Bladt');
  });

  it('capitalizes a hyphenated name', () => {
    subjectModel.displayNameFromName('joe-bob').should.equal('Joe-Bob');
  });
});

describe('#nameFromFilename', () => {
  it('removes the jpg extension', () => {
    subjectModel.nameFromFilename('jake.jpg').should.equal('jake');
  });

  it("doesn't change a name with no extension", () => {
    subjectModel.nameFromFilename('jake.j').should.equal('jake.j');
  });

});
