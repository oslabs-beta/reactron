const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:3000';


describe('Route integration', () => {
  it('responds with 200 status', () => {
    return request (server)
      .get('/')
      .expect(200)
  })
})

describe('Wrong Url', () => {
  it('responds with 404 not found', () => {
    return request(server)
      .get('/wrongurl/blahblah')
      .expect(404)
  })
})
