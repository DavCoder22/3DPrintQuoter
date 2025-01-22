const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 8080;

// Importing routes
const userRoutes = require('./routes/user-service');
const authRoutes = require('./routes/auth-service');
const catalogRoutes = require('./routes/catalog-service');

// Serving static files (such as index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON
app.use(express.json());

// Use the user routes
app.use(userRoutes);

// Use the auth routes
app.use(authRoutes);

// Use the catalog routes
app.use(catalogRoutes);

// Start server
app.listen(port, () => {
    console.log(`Graphical interface server running at http://localhost:${port}`);
});