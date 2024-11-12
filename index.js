// app.js
const express = require('express');
const env = require('dotenv').config()
const expApp = express();
const port = 3000;


const authRoutes = require('./routes/auth')


expApp.use(express.json())
expApp.use('/api/auth', authRoutes)

// Simple route
expApp.get('/', (req, res) => {
    res.send('Hello this is my first node app babe!');
});

// Start server
expApp.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
