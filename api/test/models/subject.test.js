const should = require('chai').should();
const subjectModel = require('../../src/models/subject');

describe('#displayNameFromName'), () => {
  it('capitalizes the first letter of a simple name', () => {
    subjectModel.displayNameFromName('jake').should.equal('Jake')
  });
};
