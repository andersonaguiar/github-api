var should = require('should');

describe('sum2.js', function() {
  it('sum of 2 + 3 should return 5', function() {
    (2 + 3).should.be.equal(5);
  });

  it('sum of 30 + 30 should return 60', function() {
    (30 + 30).should.be.equal(60);
  });
});
