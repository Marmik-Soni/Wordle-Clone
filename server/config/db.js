const mongoose = require('mongoose'); // Import the mongoose library for MongoDB interaction

// Function to connect to the MongoDB database
const connectDB = async () => {
    // Attempt to connect to the MongoDB database using the URI from environment variables
    // If the connection fails, log the error and exit the process
    try {
        await mongoose.connect(process.env.MONGO_URI); // Use the connection string stored in the environment variable MONGO_URI
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1); // Exit the process with failure code
    }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;
