const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/donnybook', { useNewUrlParser: true }, (err) => {
	if(err)
	  console.log('error connecting to database');
});
console.log(process.env.DB_CONN);
require('./users');
require('./posts');