const express = require('express');
const app = express();

//socket io setup
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const path = require('path');
const port = 3001;

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'))
})


var players_num = 0;
const Players = {}; //objects to store players

io.on('connection', (socket) => {
    let a = Math.round(Math.random() * 350) + 50;
    let b = Math.round(Math.random() * 350) + 50;

    Players[socket.id] = JSON.parse(JSON.stringify({'x' : a, 'y' : b, 'color' : 'purple'}));
    socket.emit('oldPlayers', JSON.stringify({'yourId' : socket.id, 'allPlayers' : {Players}}));

    if (players_num > 0){
        socket.broadcast.emit('newPlayer', JSON.stringify({'id' : socket.id, 'info' : {'x' : a, 'y' : b, 'color' : 'purple'}}))
    }
    players_num++;

    socket.on('updatePlayer', (i) =>{
        let info = JSON.parse(i);
        let id = info.id;
        Players[id] = {x : info.x, y : info.y, color :'purple'}
        socket.broadcast.emit('update', info)
    })
})

server.listen(port, () => {
    console.log('server is listening');
})