// app.js
const express = require('express');
const expApp = express();
const port = 3000;

// Simple route
expApp.get('/', (req, res) => {
    res.send('Hello this is my first node app babe!');
});

// Start server
expApp.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
