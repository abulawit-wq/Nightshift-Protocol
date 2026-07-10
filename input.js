export class Input{
 constructor(){this.down=new Set();this.pointerX=.5;addEventListener('keydown',e=>{if(!e.repeat)this.down.add(e.code)});addEventListener('keyup',e=>this.down.delete(e.code));addEventListener('mousemove',e=>this.pointerX=e.clientX/innerWidth);addEventListener('touchmove',e=>{if(e.touches[0])this.pointerX=e.touches[0].clientX/innerWidth},{passive:true})}
 pressed(code){if(this.down.has(code)){this.down.delete(code);return true}return false}held(code){return this.down.has(code)}
}