// Blackbox testing with supertest

const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', (req, res) => {
    res.status(200).json({name: 'john'});
});


describe('GET /user', () => {
    it('responds with json', (done) => {
        request(app)
        .get('/user')
        .auth('username', 'password')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});