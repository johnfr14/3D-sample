import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from "three"
import Experience from './Experience'
import Sizes from './Utils/Sizes'

export default class Camera {
  experience: Experience
  sizes: Sizes
  scene: THREE.Scene
  canvas: HTMLCanvasElement
  instance: THREE.PerspectiveCamera
  controls: OrbitControls

  constructor(experience: Experience) {
    this.experience = experience
    this.sizes = this.experience.sizes 
    this.scene = this.experience.scene 
    this.canvas = this.experience.canvas

    this.instance = this.setInstance()
    this.controls = this.setOrbitControls()
  }

  setInstance(): THREE.PerspectiveCamera {
    let instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
    instance.position.set(6, 4, 8)
    this.scene.add(instance)
    return instance
  }
  setOrbitControls(): OrbitControls {
    let controls = new OrbitControls(this.instance, this.canvas)
    controls.enableDamping = true
    return controls
  }

  resize(): void {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update(): void {
    this.controls.update()
  }
}