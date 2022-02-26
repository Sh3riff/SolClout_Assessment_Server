const express = require('express');
const request = require('supertest');
const expressServer = require('./server')

describe('Server Test', () => {
    let app = expressServer();
  
    // // Called once before any of the tests in this block begin.
    // beforeEach( done => {
    //   const app = expressServer();
    //   app.listen(function(err) {
    //     if (err) { return done(err); }
    //     done();
    //   });
    // });

    it('test route should respond', (done) => {
      request(app)
        .get('/test')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
    it('transferETH route should return 400 without parameters', (done) => {
      request(app)
        .post('/transferETH')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done)
    })
  });
