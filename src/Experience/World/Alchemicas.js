import * as THREE from "three";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js"
import { ethers } from "ethers";
import { interfaces } from "../../Lib/interfaces";
import { addresses } from "../../Lib/contracts";

export default class Alchemicas {

  constructor(chest, type) {
    this.chest = chest
    this.ressources = chest.ressources;
    this.scene = chest.scene;
    this.out = false
    this.type = type
    this.contract = new ethers.Contract(addresses[type], interfaces[type], chest.experience.world.wallet.signer)

    this.setGeometry()
    this.setTexture(type)
    this.setMaterial()
    this.setMesh()
    this.setText()
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
  }

  setTexture(type) {
    this.textures = {}
    this.textures.type = {
      kek: this.ressources.items.kekColorTexture,
      alpha: this.ressources.items.alphaColorTexture,
      fomo: this.ressources.items.fomoColorTexture,
      fud: this.ressources.items.fudColorTexture,
    }
    
    this.textures.color = this.textures.type[type]
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.ressources.items.grassNormalTexture
    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      metalness: 1,
      roughness: 1,
      flatShading: true,
    })
  }

  setText() {
    this.textGeometry = new TextGeometry(
      this.type, 
      {
        font: this.ressources.items.minecraft, 
        size: 0.2, 
        height: 0.2,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5, 
      }
  )
  this.textGeometry.center()
  this.textMaterial = new THREE.MeshMatcapMaterial({matcap: this.ressources.items.metalMatcapTexture, map: this.textures.color})
  // textMaterial.wireframe = true
  this.text = new THREE.Mesh(this.textGeometry, this.textMaterial)
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }

  update() {
    if (this.out) {
      this.mesh.position.y = Math.cos(Math.sin(-this.chest.time.elapsed * 0.001)) + this.chest.openOffset
      this.text.position.y = this.mesh.position.y + 0.5
      this.mesh.rotation.y = this.chest.time.elapsed * 0.001
    }
  }
}