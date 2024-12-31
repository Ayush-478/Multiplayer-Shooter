import { ctx, projs } from "./server.js";

class Player{
    constructor(x,y,color){
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

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y, 15, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        if (projs.length != 0){
            ctx.strokeStyle = projs[0].color;
        }
        else{
            ctx.strokeStyle = 'black';
        }
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
        this.draw();
    }
}
export default Player;