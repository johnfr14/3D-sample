import * as THREE from "three";
import Alchemicas from "./Alchemicas";

export default class Chest {
  constructor(experience) {
    this.experience = experience
    this.scene = experience.scene
    this.resources = experience.resources
    this.time = experience.time
    this.singleChestModel = this.resources.items.singleChestModel
    this.raycaster =  experience.raycaster
    this.debug = experience.debug
    this.originX = -2

    if(this.debug.active)
      this.debugFolder = this.debug.ui.addFolder("chest")

    this.setGLTF()
    this.setAnimation()
    this.setAudio()
    this.setLoots()
  }

  setGLTF() {
    this.model = this.resources.items.singleChestModel.scene
    this.model.position.x -= 2
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
    this.animation.action.open = this.animation.mixer.clipAction(this.singleChestModel.animations[0])
    this.animation.action.current = this.animation.action.open

  }

  setAudio() {
    this.audio = {}
    this.audio.open = this.resources.items.chestOpenSound
    this.audio.close = this.resources.items.chestCloseSound
  }

  setLoots() {
    this.loots = [
      this.kek = new Alchemicas(this, "kek"),
      this.alpha = new Alchemicas(this, "alpha"),
      this.fomo = new Alchemicas(this, "fomo"),
      this.fud = new Alchemicas(this, "fud"),
    ]
    for (const loot of this.loots) {
      loot.mesh.position.x = -2
      loot.mesh.position.y = 0.5
      loot.mesh.scale.set(0.5, 0.5, 0.5)
    }
    this.openOffset = 1.3;
    this.openIndex = 0;
  }

  openAnimation() {
    if (this.animation.action.current.paused) {
      if (this.openIndex < this.loots.length) {
        let finalPosition = (this.originX - (this.loots.length / 2) + this.openIndex + 0.5)
        let delta = finalPosition - this.originX
        if (this.openOffset - this.loots[this.openIndex].mesh.position.y > 0) {
          this.loots[this.openIndex].mesh.position.y += (this.time.delta * 0.003);
          this.loots[this.openIndex].mesh.rotation.y += (this.time.delta * 0.01);
          this.loots[this.openIndex].mesh.position.x = this.originX + (delta * (this.loots[this.openIndex].mesh.position.y / this.openOffset));
        }
        else {
          this.loots[this.openIndex].out = true;
          this.loots[this.openIndex].text.position.x = this.loots[this.openIndex].mesh.position.x;
          this.scene.add(this.loots[this.openIndex].text)

          this.openIndex++;
        }
      }
      this.loots.forEach(loot => loot.update())
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001)
    this.openAnimation()
  }
}