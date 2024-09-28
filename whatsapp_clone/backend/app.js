const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const http = require('http');          // Import http module
const socketIo = require('socket.io'); // Import Socket.io

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDB();

// API routes
app.use('/api/users', userRoutes);

// Create HTTP server
const server = http.createServer(app);
const io = socketIo(server); // Attach Socket.io to the server

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
