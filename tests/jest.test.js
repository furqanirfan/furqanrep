const { functions } = require("../index");
// import request from "supertest";
// import { app } from "../index";
const request = require('supertest')
const {app} = require('../index.js'); // the express server
// const { jwtTokens } = require("../utils/jwt-helpers");

test("Adds 2 + 2 to equal 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

/*
  declare the token variable in a scope accessible
  by the entire test suite
*/
let token;


describe('POST /', () => {
  // token not being sent - should respond with a 401
  test('It should require authorization', () => {
    return request(app)
    .post('/api/auth/login')
    .set('authenticateToken', `Bearer ${{
      'Content-Type': 'application/json'
    }}`)
    .send({
      email: 'furqi.irfan12@gmail.com',
      password: 'furqan',
    })
    .then((response) => {
      // console.log('ERROR ____ ', err)
      token = response.body; // save the token!
      // console.log('RESPONSE ____ ', token)
      expect(response).toHaveProperty('body.accessToken')
      expect(response).toHaveProperty('body.refreshToken')
      // done();
    });
  });
// // send the token - should respond with a 200
  test('It responds with html', () => {
    return request(app)
      .get('/')
      .set('authenticateToken', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('text/html');
      });
  });
});
