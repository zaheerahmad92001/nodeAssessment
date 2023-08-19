const mongoose = require('mongoose');
require('dotenv').config()


const connectDB = async ()=>{
  try{
   const con = await mongoose.connect(process.env.MONGO_DB_URL,{
       useNewUrlParser:true,
       useUnifiedTopology:true,
    //    useFindAndModify:false,
    //    useCreateIndex:true
   })
   console.log(`MongoDB connected :${con.connection.host}`)
  }catch(err){
      console.log('err in connectin MongoDB',err)
      process.exit(1)
  }
}

module.exports = connectDB