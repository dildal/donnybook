require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

require('./server/models/db');
require('./server/passport');

const apiRouter = require('./server/api');

const app = express();


app.use(passport.initialize());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(passport.initialize())
app.use('/api', apiRouter);
app.use('*', (req, res) =>{
	return res.sendFile(path.join(__dirname, 'dist/index.html'));
})
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

app.listen(3000, ()=> {
	console.log('App being served on port 3000');
})
