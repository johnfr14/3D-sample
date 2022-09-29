import * as THREE from "three";

export default class Floor {
  constructor(experience) {
    this.experience = experience
    this.scene = experience.scene
    this.ressources = experience.ressources
    this.time = experience.time
    this.foxModel = this.ressources.items.foxModel
    this.debug = experience.debug

    if(this.debug.active)
      this.debugFolder = this.debug.ui.addFolder("fox")

    this.setGLTF()
    this.setAnimation()
  }

  setGLTF() {
    this.model = this.ressources.items.foxModel.scene
    this.model.scale.set(0.02, 0.02, 0.02)
    this.model.position.z += 4
    this.model.rotation.y = Math.PI
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh)
        child.castShadow = true
    })
  }

  setAnimation() {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.model)
    
    this.animation.action = {}
    this.animation.action.idle = this.animation.mixer.clipAction(this.foxModel.animations[0])
    this.animation.action.walk = this.animation.mixer.clipAction(this.foxModel.animations[1])
    this.animation.action.run = this.animation.mixer.clipAction(this.foxModel.animations[2])

    this.animation.action.current = this.animation.action.idle
    this.animation.action.current.play()
  }

  update() {

    this.animation.mixer.update(this.time.delta * 0.001)
  }
}