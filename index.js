// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import database connection configuration
const connection = require('./configs/connection');
const superAdminRoutes = require('./routes/superAdmin.routes');
const adminRoutes = require('./routes/admin.routes');
const managerRoutes = require('./routes/manager.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const salesRoutes = require('./routes/sales.routes');


// Set the port for the server to run on, defaulting to 9000 if not specified in the environment
const PORT = process.env.PORT || 9000;

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());


// Fix the missing parenthesis in the following line
app.use(express.static(path.join(__dirname, './views'))); // Add the missing parenthesis and close the 'path.join' function call
app.use('/uploads', express.static('uploads'));
app.use('/api', superAdminRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sales', salesRoutes);


// Synchronize the database connection and start the server
connection.sync().then(() => {
    app.listen(PORT, () => { 
        // Log a message when the server is successfully running
        console.log(`Server is running on port ${PORT}`);
    });
});


