import "@babel/polyfill";

const exportServer = require('../server/server');
const supertest = require('supertest');
const request = supertest(exportServer);

describe('Get endpoint', () => {
  it('/travel-info', async (done) => {
    const response = await request.get('/travel-info');
    expect(response.status).toBe(200);
    done();
  });

  it('/travel-history', async (done) => {
    const response = await request.get('/travel-history');
    expect(response.status).toBe(200);
    done();
  });
});