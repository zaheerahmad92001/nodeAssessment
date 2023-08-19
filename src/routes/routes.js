const express = require("express");
const route = express.Router();
var { graphqlHTTP } = require("express-graphql")

const testController = require('../controller/TestController/TestController')
const {root , schema} = require('../graphqlSchema/testSchema');


// route.get('/user/' , testController.getUser)
route.get('/wordcount',testController.wordCount)
route.get('/clearCollection',testController.clearCollection)
route.post('/addSentance',testController.addSentenceAsDoc)

// these two endpoints added for my own easiness.
route.get('/userinfo',testController.getUserInfo)
route.post('/addUserData',testController.addUserData)

// fetching data with GraphQl
route.use('/graphql',graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))


module.exports = route;