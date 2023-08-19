const express = require('express');
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")
const {User} = require('../modal/userModal/userModal')

var schema = buildSchema(`
  type Query {
    hello: String
    userinfo:[UserInfo]
  }
type UserInfo{
  full_name:String
  company_name:String
  email:String
  phone:String

}
`)

var getUserInfo = async function(){
  try {
    const result = await User.find();
    return result; // Return the array of user info objects
  } catch (error) {
    console.error('Error fetching user info:', error);
    return []; // Return an empty array or handle the error gracefully
  }
}

var root = {
    hello: () => {
      return "Hello world!"
    },
    userinfo:getUserInfo
  }




module.exports = {
    root , 
    schema
}