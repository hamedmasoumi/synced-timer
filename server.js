const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

let counterValue = 0;

io.on('connection', (socket) => {
    socket.emit('counterValue', counterValue);

    socket.on('setCounter', (value) => {
        counterValue = value+1;
        io.emit('counterValue', counterValue);
    });

    socket.on('decrementCounter', () => {
        if (counterValue > 0) {
            counterValue--;
            io.emit('counterValue', counterValue);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
