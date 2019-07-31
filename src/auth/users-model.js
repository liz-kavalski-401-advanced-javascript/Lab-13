'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  email: {type: String},
  role: {type: String, default:'user', enum: ['admin','editor','user']},
});

users.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(console.error);
});

users.statics.authenticationToken = function(token){
 console.log(token)
  let parsedToken =jwt.verify(token,process.env.SECRET || "changeit");
 console.log(parsedToken)
  let query ={_id:parsedToken.id};
  return this.findOne(query);
}

users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};

users.methods.comparePassword = function(password) {
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};

users.methods.generateToken = function() {
  let token = {
    id: this._id,
    capabilities: (this.acl && this.acl.capabilities) || [],
  };
  
  return jwt.sign(token, process.env.SECRET, {expiresIn:'15m'});
};

module.exports = mongoose.model('users', users);
