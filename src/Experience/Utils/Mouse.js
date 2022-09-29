import * as THREE from "three";
import EventEmitter from "./EventEmitter";

export default class Mouse extends EventEmitter {
  constructor(experience) {
    super()
    this.coor = new THREE.Vector2()
    this.sizes = experience.sizes

    window.addEventListener('mousemove', (event) =>{
      this.coor.x = (event.clientX / this.sizes.width) * 2 - 1
      this.coor.y = - (event.clientY / this.sizes.height) * 2 + 1
    })
  }
}