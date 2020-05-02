const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const connectToDatabaseAndStartServer = async () => {
  const database = process.env.MONGO_URI;

  try {
    // Connect to database
    console.log('Connecting to database, please wait...');
    const dbConnection = await connectDB(database);

    // Start server
    if (dbConnection.connection) {
      const server = app.listen(
        PORT,
        console.log(
          `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
      );
    }
  } catch (err) {
    console.error(err.message);
    console.log('Connection to database failed, server will not start');
  }
};

connectToDatabaseAndStartServer();
