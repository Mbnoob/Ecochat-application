const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.MONGODB_URI).then((r)=>{
    console.log('Database is Connected Successfully');
}).catch((e)=>{
    console.log(e)
})

module.exports = connection;