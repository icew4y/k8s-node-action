// app.js
const express = require('express');
const expApp = express();
const port = 3000;

// Simple route
expApp.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start server
expApp.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
