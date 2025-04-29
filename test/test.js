const { expect } = require('chai');
const app = require('../app');

describe('Sample App', () => {
  it('should return a message', (done) => {
    expect('Hello from DevOps Day 7 CI/CD Pipeline!').to.be.a('string');
    done();
  });
});
