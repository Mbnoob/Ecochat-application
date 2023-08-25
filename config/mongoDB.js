const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost:27017/EcoChat-application').then((r)=>{
    console.log('Database is Connected Successfully');
}).catch((e)=>{
    console.log(e)
})

module.exports = connection;