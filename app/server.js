const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('./routes/authroute')
dotenv.config({path:'app/config.env'});
const app = express();

app.use(express.json());
app.use('/api/auth',auth);
async function main() {
    try{
        mongoose.connect(process.env.DB,{
            useNewurlParser:true
        })
      console.log('database connected');
      
      app.listen(process.env.PORT,console.log(`server started on PORT${process.env.PORT}`));

    } catch (error){
     console.log(error);
    process.exit(1);

    }
}
main();