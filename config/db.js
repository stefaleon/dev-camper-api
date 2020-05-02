const mongoose = require('mongoose');

const connectDB = async (db) => {
  const conn = await mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);

  return conn;
};

module.exports = connectDB;
