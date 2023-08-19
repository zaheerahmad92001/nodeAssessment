const express = require('express');
const app = express()
const port = 3000;
const connectDB =  require('./dbConnection');
const route = require('./routes/routes')
const cors = require('cors');

app.use(express.json()); // to upload raw data

app.use(cors({
  origin: 'http://localhost:3001',
}));

app.use('/api',route)

  connectDB()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })