const should = require('chai').should;
const subjectModel = require('../../src/models/subject');

describe('#displayNameFromName', () => {
  it('capitalizes the first letter of a simple name', () => {
    subjectModel.displayNameFromName('jake').should.equal('Jake');
  });

  it('capitalizes a trailing initial', () => {
    subjectModel.displayNameFromName('jake.b').should.equal('Jake B');
  });

  it('capitalizes a hyphenated name', () => {
    subjectModel.displayNameFromName('joe-bob').should.equal('Joe-Bob');
  });
});
