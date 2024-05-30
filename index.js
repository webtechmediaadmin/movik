// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

// Import database connection configuration
const connection = require('./configs/connection');
const userRoutes = require('./routers/user.routes');
const { authentication } = require('./middleware/authentication.middleware');





// Set the port for the server to run on, defaulting to 9000 if not specified in the environment
const PORT = process.env.PORT || 9000;

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());

// Fix the missing parenthesis in the following line
app.use(express.static(path.join(__dirname, './views'))); // Add the missing parenthesis and close the 'path.join' function call

/*Routes*/
app.use('/api/users', userRoutes);


// Synchronize the database connection and start the server
connection.sync().then(() => {
    app.listen(PORT, () => {
        // Log a message when the server is successfully running
        console.log(`Server is running on port ${PORT}`);
    });
});
