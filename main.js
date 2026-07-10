import {Game} from './game/game.js';
window.addEventListener('error',e=>{const status=document.querySelector('#load-status');if(status)status.textContent='BOOT ERROR // '+e.message});
new Game();