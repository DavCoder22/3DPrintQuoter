const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 8080;

// Configuring Microservices URLs
// Subject to review Papuh, the teacher said that this is a monolith
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:5000';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3000';

// Serving static files (such as index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON
app.use(express.json());

// Route to handle new user registration
app.post('/register', async (req, res) => {
    try {
        const response = await axios.post(`${USER_SERVICE_URL}/register`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Route to handle user login
app.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Route to obtain user profile data
app.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        // Request the user profile from the auth-service microservice
        const response = await axios.get(`${AUTH_SERVICE_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Send the response to the client
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Graphical interface server in http://localhost:${port}`);
});