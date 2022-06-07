const mongoose = require('mongoose');

mongoose
.connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.kdp9lb1.mongodb.net/?retryWrites=true&w=majority',
// {
//     userNewUrlParser: true,
//     userUnifiedTopology: true,
//     userCreateIndex: true,
//     userFindAndModify: false,
// }
)
.then(() =>
 console.log('Connected to Mongodb'))
.catch((err) =>
 console.log('Failed to connect to MongoDB', err));