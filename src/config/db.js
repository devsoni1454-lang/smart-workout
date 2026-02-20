const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error('CRITICAL ERROR: MONGO_URI is not defined in environment variables.');
        process.exit(1);
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.error('Ensure you have whitelisted 0.0.0.0/0 in MongoDB Atlas.');
        process.exit(1);
    }
};

module.exports = connectDB;
