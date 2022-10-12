import * as THREE from "three";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js"
import { ethers } from "ethers";

export default class Wallet {

  constructor(experience) {
    this.ethereum = window.ethereum
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.scene = experience.scene
    this.resources = experience.resources;
    this.isConnected = false
    this.network = ""

    this.setText("connect", "#5f2300")
    this.setText("connected", "green")
    this.addText()

    window.ethereum.on('chainChanged', (chainId) => window.location.reload());
  }

  setText(text, color) {
    const textGeometry = new TextGeometry(
      text, 
      {
        font: this.resources.items.aovel, 
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5 
      }
  )
  textGeometry.center()
  const textMaterial = new THREE.MeshMatcapMaterial({ color: color })
  // textMaterial.wireframe = true
  this[text] = new THREE.Mesh(textGeometry, textMaterial)
  this[text].position.y += 3
  this[text].position.x += 2
  this[text].rotation.y = -Math.PI * 0.15
  }

  addText() {
    this.scene.add(this.connect)
  }

  update() {}
}