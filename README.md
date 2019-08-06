# Lab-13 Bearer Authorization
### Author: Adrienne Easton and Liz Kavalski
[![Build Status](https://travis-ci.com/liz-kavalski-401-advanced-javascript/lab-13.svg?branch=master)](https://travis-ci.com/liz-kavalski-401-advanced-javascript/lab-13)
### Links and Resources
* [Submission PR for Lab 13-Bearer Auth](https://github.com/liz-kavalski-401-advanced-javascript/lab-13/pull/4)
* [Submission PR for Lab 14-ACL](https://github.com/liz-kavalski-401-advanced-javascript/lab-13/pull/5)
* [Heroku](https://ek-ae-lab-13-bearer.herokuapp.com/)
### Modules
#### `middleware.js`
Runs authencation 
#### `router.js`
Paths to `/signup` and to `/signin`
#### `play.js
Has different path can let users 'read', 'create','update', and/or 'delete based on the user role. 
#### `users-models.js`
Form the schema, which is used to match user name,and password if already in the database, of not create one. It also generate and authenticate tokens.
#### `roles-models.js`
Contain the schema for the roles.
#### `404.js`
If their an error on the finding the paths
#### `500.js`
If their an error on the server side.


### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - mongodb://localhost:27017/lab-13
* `SECRET`- make your own
#### Seting up on personal device.
* In a terminal run a `git clone` to clone this repo onto a personal device.
* Run a `npm i` to download the dependices.
#### Set up server
* In a terminal run `nodemon` 
* In another open up mongodbd to check 

#### Running the app
* in the terminal(not the one running `nodemon` or `mongodb`)run a commond `echo '{"username":"USERNAME","password":"PASSWORD"}' | http post :3000/signup`
  * this sign the person up in in the app.
  * for the username and password the person can pick their own username and password in the place that are in all capitals.
* Sign-in: `http post :3000/signin -a USERNAME:PASSWORD`
  * The username and password should be the same as the one to picked to sign-up.
  * Returns a JWT token.
* Sign-in with a role `echo '{"username":"USERNAME","password":"word","role":"admin"}' | http post :3000/signup`
   * to assign a role with capabilities: `echo '{"role":"admin", "capabilities":["read","create","update","delete"]}'| http post :3000/roles`
     * `admin` has the capabitlites to 'read','create', 'update' and 'delete'
     * `editor` has the capabitlites to 'read','create, and 'update'
     * `user` has the capabitlity to 'read'.
* Sign-in with token: `http post :3000/signin "authorization: bearer TOKENHERE"`
  * In the TOKENHERE it should be the token that was return in the 'sign-in'.
  * Return the token or error if the the token has expires.
  ##### Each of these paths you _will_ need to sign-in and get a new token for each path and use the new token 
    * do `http post :3000/signin -a USERNAME:PASSWORD` to get a new token
* get('/public-stuff') should be visible by anyone
* get('/hidden-stuff') should require only a valid login
* post('/something-to-read') should require the 'read' capability
* put('/create-a-thing) should require the 'create' capability
* put('/update) should require the 'update' capability
* patch('/jp) should require the 'update' capability
* delete('/bye-bye) should require the 'delete' capability
* get('/everything') should require the 'superuser' capability
  
#### Tests
* `npm test`
* In the `middleware.test.js` it testing different credentials, while the `router.test.js` is testing for signing up and signing in with basic authication.
* There need to be a test for signing-in with a token and signing-in with a expire token. Otherwise the testes are passing.

#### UML
![UML lab 13](https://github.com/liz-kavalski-401-advanced-javascript/lab-13/blob/master/Lab%2013(1)-med.jpg)
