import * as THREE from "three";
import { connectUser, disconnectUser } from "../../Lib/Utils";
import { ethers } from "ethers";

export default class Raycaster {
  constructor(experience) {
    this.web3 = window.ethereum
    this.scene = experience.scene
    this.mouse = experience.mouse;
    this.camera = experience.camera
    this.world = experience.world
    this.currentIntersect = null

    this.raycaster = new THREE.Raycaster()
    this.raycaster.setFromCamera(this.mouse.coor, this.camera.instance)

    // open chest
    window.addEventListener('click', (event) => {
      let action = this.world.chest.animation.action.current
      let open = this.world.chest.audio.open
      let close = this.world.chest.audio.close
      let loots = this.world.chest.loots

      const objs = []
      this.world.chest.model.traverse(child => {
        objs.push(child)
      })
      const intersects = this.raycaster.intersectObject(objs[17])

      if (intersects.length) {
        if (action.paused) {
          action.paused = false
          close.play()
          setTimeout(() => action.stop(), 500)
          for(const loot of loots) {
            loot.mesh.position.set(-2, 0.5, 0)
            loot.out = false
            loot.text.geometry.dispose()
            loot.text.material.dispose()
            this.scene.remove(loot.text)
          }
          this.world.chest.openIndex = 0;
        }
        else {
          action.play()
          open.play()
          setTimeout(() => action.paused = true, 500)
        }
      }
    })

    // Connect button
    window.addEventListener('click', async (event) => {
      let wallet = this.world.wallet
      const intersects = this.raycaster.intersectObject(this.world.wallet.connect)
      let connect = this.world.wallet.connect
      let connected = this.world.wallet.connected

      if (intersects.length) {
        if (wallet.isConnected) {
          disconnectUser(wallet, window.ethereum)
          wallet.isConnected = false
          connected.geometry.dispose() 
          connected.material.dispose() 
          this.world.scene.remove(connected)
          this.scene.add(connect)
        } else {
          connectUser(wallet, window.ethereum)
          this.world.wallet.isConnected = true
          this.world.wallet.connect.geometry.dispose() 
          this.world.wallet.connect.material.dispose() 
          this.world.scene.remove(this.world.wallet.connect)
          this.scene.add(this.world.wallet.connected)
        }
      }
    })


    // Loot alchemica
    window.addEventListener('click', async (event) => {
      const objs = []
      for (const loot of this.world.chest.loots) objs.push(loot.mesh)

      const intersects = this.raycaster.intersectObjects(objs)
      
      if (intersects.length === 1 && this.world.wallet.network === "mumbai" && this.world.wallet.isConnected) {
        for (let loot of this.world.chest.loots) {
          if (loot.mesh.uuid === intersects[0].object.uuid) {
            let index = this.world.chest.loots.indexOf(loot)
            loot.contract = loot.contract.connect(this.world.wallet.signer)
            console.log(`Looting 10 ${loot.type}`)
            const tx = await loot.contract.getSample(ethers.utils.parseEther("10"))
            await tx.wait()
            loot.geometry.dispose() 
            loot.text.geometry.dispose() 
            loot.material.dispose() 
            loot.text.material.dispose() 
            loot.scene.remove(loot.mesh)
            loot.scene.remove(loot.text)
            this.world.chest.loots.splice(index, 1)
            console.log(loot.type, " looted !")
          }
        }
      }
    })
  }

  update() {
    this.raycaster.setFromCamera(this.mouse.coor, this.camera.instance)
  }
}