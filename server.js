///********framwork express
const express = require('express');
//const bodyParser = require('body-parser');
// const cookieParser= require('cookie-parser');
const userRoutes = require('./routes/user.routes');

require('dotenv').config({path: './config/.env'})
require('./config/db');

//const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const app = express();

app.use(express.json());
// app.use(cookieParser());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

//***********JWT */
// app.get('*', checkUser);
// app.get('/jwtid', requireAuth, (req, res) =>{
//     res.status(200).send(res.locals.user._id)
// });

//****************/ROUTES
app.use('/api/user', userRoutes);

///****************SERVER
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
}) 



