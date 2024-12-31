
class Projectile{
    constructor(a,b,color,velo){
        this.a = a;
        this.b = b;
        this.color = color;
        this.velo = velo;
        this.draw();
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.a,this.b, 4, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    isOffScreen() {
        return (this.a < 0 || this.a > canvas.width || this.b < 0 || this.b > canvas.height);
    }

    shoot(){
        this.a += (this.velo.x * 20);
        this.b += (this.velo.y * 20);
        this.draw();
    }
}

export default Projectile;
