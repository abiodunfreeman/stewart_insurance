const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Route Files
const leads = require('./routes/leads');
const app = express();

// serve static files in /public
app.use(express.static(__dirname + '/public'));

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// sets view engine to PUG
app.set('views', './views');
app.set('view engine', 'pug');

// Body Parser
app.use(express.json());

// Mounter Routers
app.get('/', (req, res, next) => {
  res.render('layout');
});
app.use('/leads', leads);

// Server
const PORT = process.env.PORT || 3001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} , App listening on port ${PORT}!`
        .yellow.bold
    );
  });
});

// Handle unhandled promise
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
