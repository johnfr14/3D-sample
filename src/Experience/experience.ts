import * as THREE from "three"
import { sources } from "./sources"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from "./Camera"
import Renderer from "./Renderer"
import World from "./World/World"
import Ressources from "./Utils/Ressources"
import Debug from "./Utils/Debug"
import Mouse from "./Utils/Mouse"
import Raycaster from "./Utils/Raycaster"

export default class Experience {
  debug: Debug
  canvas: HTMLCanvasElement
  sizes: Sizes
  time: Time
  scene: THREE.Scene
  ressources: Ressources
  mouse: Mouse
  camera: Camera
  renderer: Renderer
  world: World
  raycaster: Raycaster
  
  constructor(canvas: HTMLCanvasElement) {
    this.debug = new Debug()
    this.canvas = canvas
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.ressources = new Ressources(sources)
    this.mouse = new Mouse(this)
    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    this.world = new World(this)
    this.raycaster = new Raycaster(this)

    this.sizes.on('resize', () => this.resize())
    this.time.on("tick", () => this.update())
  }

  resize(): void {
    this.camera.resize()
    this.renderer.resize()
  }

  update(): void {
    this.raycaster.update()
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }
}

