const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// Load env vars
dotenv.config({ path: './config/config.env' });
// Route Files
const leads = require('./routes/leads');
const app = express();
app.get('/', (req, res, next) => {
  res.send('<h1>Server Live</h1>');
});

app.use('/leads', leads);
//Server
const PORT = process.env.PORT || 3001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} , App listening on port ${PORT}!`
        .yellow.bold
    );
  });
});
