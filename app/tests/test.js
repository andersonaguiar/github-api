var should = require('should');

describe('Namespace', function() {
  it('App should be defined', function() {
    (2 + 3).should.be.equal(5);
  });

  it('sum of 30 + 30 should return 60', function() {
    (30 + 30).should.be.equal(60);
  });
});
