
import {mainPlayer} from "./main.js";

/* 
window.addEventListener('click', (e)=>{
    let angle = Math.atan2((e.clientY - mainPlayer.y),(e.clientX-mainPlayer.x));
    let x_velo = Math.cos(angle);
    let y_velo = Math.sin(angle);
    let velo = {
        'x' : x_velo,
        'y' : y_velo
    };
    projs.push(new Projectile(mainPlayer.x, mainPlayer.y, "yellow",velo));
})
 */

window.addEventListener('keydown', (e) =>{
    switch(e.key){
        case 'a':
            mainPlayer.key_arr.left  = true;
            break;
        case 'd':
            mainPlayer.key_arr.right  = true;
            break;
        case 's':
            mainPlayer.key_arr.down  = true;
            break;
        case 'w':
            mainPlayer.key_arr.up  = true;
            break;
    }
})

window.addEventListener('keyup', (e) =>{
    switch(e.key){
        case 'a':
            mainPlayer.key_arr.left  = false;
            break;
        case 'd':
            mainPlayer.key_arr.right  = false;
            break;
        case 's':
            mainPlayer.key_arr.down  = false;
            break;
        case 'w':
            mainPlayer.key_arr.up  = false;
            break;
    }
})

