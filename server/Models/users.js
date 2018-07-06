let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let bcrypt = require('bcrypt-nodejs');

//// User Schema
let usersSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    trim: true
  },
  name: {
        type: String,
        required: true
      },
  email:String,
  password: String,
  email:String,
  gender: String,
  phoneNumber: {
        type: Number,
        required: true
      },
  address: String,
  age: {
        type: Number,
        required: true
      },
  nationality: String
});

// User Model
let Users = mongoose.model('Users', usersSchema);

//// Hashing the password
let hashPassword = function(password, callback) {
  const saltRounds = 10;
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(password, salt);
  callback(hash);
  };
let createUsers = function(data, callback){
  let userdata = data;
  ////// Add the hashed password to the data
  hashPassword(data.password, function(hashed){
    userdata["password"] = hashed;
  });
  /// Save to database
  Users.create(userdata, callback);
};
let getUser = function(userName, password, callback){
  /// Query for checking the usename
  let query = Users.where({ userName: userName });
  query.findOne(function(err, userdata){
    if(err){
      callback(err,null)
    } else {
      if(userdata){
          //// Checking the password
        if(bcrypt.compareSync(password, userdata.password)){
        // Retrieve the data if the user is exist 
        callback(null, userdata);
      } else {
          callback("wrong password", null);
      }
      } else {
        callback("Invalid User Name", null);
      }
      }
  });
};

let getUserInfo= function(userName, callback){
  /// Query for checking the usename
  let query = Users.where({ userName: userName });
  query.findOne(function(err, userdata){
    if(err){
      callback(err, null)
    } else {
      callback(null, userdata);
      }
  });
};

let updateUsers = function(userName, updatedData, callback){
  Users.findOneAndUpdate({userName: userName}, {$set: updatedData}, callback)
};
/// Update user info based on the user name
let deleteUser = function(userName, callback){
  /// Delete user
  Users.deleteOne({userName:userName}, callback)
};

module.exports.Users = Users;
module.exports.createUsers = createUsers;
module.exports.updateUsers = updateUsers;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.getUserInfo = getUserInfo;


