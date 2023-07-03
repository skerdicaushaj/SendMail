const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/app');
const axios = require('axios');
const sinon = require('sinon');
const request = require('supertest');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Posts API', () => {
  describe('GET /posts', () => {
    it('should return a list of posts', (done) => {
      chai
        .request(app)
        .get('/api/posts')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });
});

describe('Posts API', () => {
  describe('POST /create', () => {
    it('should create new posts if data does not exist', (done) => {
      chai
        .request(app)
        .post('/api/posts')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          done();
        });
    });
    

    it('should return existing data message if data already exists', (done) => {
      chai
        .request(app)
        .post('/api/posts')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data').that.equals('Data exists.');
          done();
        });
    });    
});
});

describe('Email API', () => {
  describe('GET /api/sendEmailPosts', () => {
    let axiosGetStub;

    before(() => {
      // Mock the axios.get method to return sample data
      axiosGetStub = sinon.stub(axios, 'get');
      axiosGetStub
        .withArgs('https://jsonplaceholder.typicode.com/posts')
        .resolves({ data: [{
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }] });
      axiosGetStub
        .withArgs('https://jsonplaceholder.typicode.com/users')
        .resolves({ data: [{
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        }] });
    });

    after(() => {
      // Restore the original axios.get method
      axiosGetStub.restore();
    });

    it('should send an email with the first three posts per user', (done) => {
      request(app)
        .get('/api/sendEmailPosts')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('data', 'Email sent!');
          done();
        });
    }).timeout(3000);

    it('should return a 404 status if no data is found', (done) => {
      // Mock the axios.get method to return empty responses
      axiosGetStub
        .withArgs('https://jsonplaceholder.typicode.com/posts')
        .resolves({ data: [] });
      axiosGetStub
        .withArgs('https://jsonplaceholder.typicode.com/users')
        .resolves({ data: [] });

      request(app)
        .get('/api/sendEmailPosts')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('data', 'Email not sent because no data found.');
          done();
        });
    }).timeout(3000);
  });
});


describe('Users API', () => {
  describe('POST /create', () => {
    it('should create new users if data does not exist', (done) => {
      chai
        .request(app)
        .get('/api/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('should return existing data message if data already exists', (done) => {
      chai
        .request(app)
        .post('/api/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.equal('Data exists.');
          done();
        });
    });
  });
});
