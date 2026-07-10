import {THREE,ease} from '../engine/runtime.js';import {CAMERA_DATA} from '../world/facility.js';
export class Surveillance{
 constructor(camera,ui,audio){this.camera=camera;this.ui=ui;this.audio=audio;this.open=false;this.current=0;this.last=0;this.damaged=new Set();this.transition=0;this.officePos=new THREE.Vector3(0,2.4,3.9);this.officeLook=new THREE.Vector3(0,1.9,-1);this.look=new THREE.Vector3();ui.buildMap(CAMERA_DATA,(i)=>this.select(i))}
 toggle(){this.open=!this.open;this.audio.monitor();this.ui.tablet(this.open);this.transition=1;this.apply()}
 select(i){if(i===this.current)return;this.last=this.current;this.current=i;this.transition=1;this.audio.monitor();this.apply()}
 selectLast(){this.select(this.last)} damage(i){this.damaged.add(i);this.ui.setDamaged(i,true)}
 apply(){const d=CAMERA_DATA[this.current];this.ui.camera(d[0],d[1],this.damaged.has(this.current),this.current)}
 update(dt,input,yaw){this.transition=Math.max(0,this.transition-dt*4);if(this.open){for(let i=0;i<8;i++)if(input.pressed('Digit'+(i+1)))this.select(i);if(input.pressed('Digit0'))this.selectLast();const d=CAMERA_DATA[this.current],p=d[2],l=d[3];this.camera.position.x=ease(this.camera.position.x,p[0],dt*9);this.camera.position.y=ease(this.camera.position.y,p[1],dt*9);this.camera.position.z=ease(this.camera.position.z,p[2],dt*9);this.look.set(...l);this.camera.lookAt(this.look);this.camera.fov=54+this.transition*5}else{this.camera.position.x=ease(this.camera.position.x,Math.sin(yaw)*1.5,dt*7);this.camera.position.y=ease(this.camera.position.y,2.4,dt*7);this.camera.position.z=ease(this.camera.position.z,3.9-Math.abs(Math.sin(yaw))*.2,dt*7);this.look.set(Math.sin(yaw)*6,1.75,-1+Math.cos(yaw));this.camera.lookAt(this.look);this.camera.fov=64}this.camera.updateProjectionMatrix()}
 reset(){this.open=false;this.current=0;this.last=0;this.damaged.clear();this.ui.tablet(false);this.apply()}}
export class PowerGrid{
 constructor(){this.value=100;this.outage=false;this.usage=1}
 reset(night){this.value=100;this.outage=false;this.night=night}
 update(dt,state){this.usage=1+(state.tablet?1:0)+(state.doors.left?1:0)+(state.doors.right?1:0)+(state.lights.left?1:0)+(state.lights.right?1:0);const scale=1+(this.night-1)*.06;this.value=Math.max(0,this.value-dt*(.026+this.usage*.018)*scale);if(this.value<=0)this.outage=true;return this.value}
}