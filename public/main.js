//1hr,20min+
//05:10 PM
//deploy and test

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const socket = io();
const Players = {};
let upd = '';

class Projections{
    constructor(id,x,y,color){
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = 10;
        this.key_arr = {
            'up' : false,
            'down' : false,
            'left' : false,
            'right' : false
        }
    }

    drawProjections(){
        ctx.beginPath();
        ctx.arc(this.x,this.y, 15, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }


    update(){
        if (this.key_arr.up){
            this.y -= this.velocity;
        }
        if (this.key_arr.down){
            this.y += this.velocity;
        }
        if (this.key_arr.right){
            this.x += this.velocity;
        }
        if (this.key_arr.left){
            this.x -= this.velocity;
        }
        upd = this.position();
        socket.emit('updatePlayer', upd);
    }

    updateProjection(a,b){
        this.x = a;
        this.y = b;
    }

    position(){
        let a = this.x;
        let b = this.y;
        let id = this.id;
        return JSON.stringify({'id' : id, 'x' : a, 'y' : b});
    }
}

export var mainPlayer = new Projections();

socket.on('connect', ()=>{
    socket.on('oldPlayers', (p)=>{
        let playersjson = JSON.parse(p);
        let mainId = playersjson['yourId'];
        let allPlayers = playersjson['allPlayers']['Players']
        for (let id in allPlayers){
            if (id == mainId){
                mainPlayer.id = id;
                mainPlayer.x = allPlayers[id]['x'];
                mainPlayer.y = allPlayers[id]['y'];
                mainPlayer.color = 'red';
                Players[id] = mainPlayer;
            }
            else{
                Players[id] = new Projections(id, allPlayers[id]['x'],allPlayers[id]['y'],allPlayers[id]['color']);
            }
        }
    })    
})

socket.on('newPlayer', (p) => {
    let playerjson = JSON.parse(p);
    Players[playerjson['id']] = new Projections(playerjson['id'], playerjson['info']['x'],playerjson['info']['y'],playerjson['info']['color']);
})

socket.on('update', (pl)=>{
    let id = pl.id;
    Players[id].updateProjection(pl.x, pl.y);
})

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0,0,canvas.width,canvas.height);
    mainPlayer.update();
    for (let id in Players){
        Players[id].drawProjections();
    }
}

animate();