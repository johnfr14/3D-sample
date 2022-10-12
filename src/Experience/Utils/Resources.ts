import * as THREE from "three";
import EventEmitter from "./EventEmitter";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";

type Sources = {
  name: string, 
  type: string, 
  path: any
}

type Loaders = {
  fontLoader: FontLoader,
  gltfLoader: GLTFLoader,
  textureLoader: THREE.TextureLoader,
  cubeTextureLoader: THREE.CubeTextureLoader,
  listener: THREE.AudioListener,
  audioLoader: THREE.AudioLoader
}

export default class Resources extends EventEmitter {
  sources: Sources[]
  items: {[key: string]: any}
  toLoad: number;
  loaded: number = 0
  loaders: Loaders

  constructor(sources: Sources[]) {
    super()
    this.sources = sources
    this.items = {}
    this.toLoad = this.sources.length;

    this.loaders = this.setLoaders()
    this.startLoading()
  }

  setLoaders(): Loaders {
    let loaders = {
      fontLoader: new FontLoader(),
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
      listener: new THREE.AudioListener(),
      audioLoader: new THREE.AudioLoader()
    }
    return loaders
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "gltfModel")
        this.loaders.gltfLoader.load(source.path, (file) => this.sourcesLoaded(source, file))
      if (source.type === "texture")
        this.loaders.textureLoader.load(source.path, (file) => this.sourcesLoaded(source, file))
      if (source.type === "cubeTexture")
        this.loaders.cubeTextureLoader.load(source.path, (file) => this.sourcesLoaded(source, file))
      if (source.type === "font")
        this.loaders.fontLoader.load(source.path, (file) => this.sourcesLoaded(source, file))
      if (source.type === "sound")
        this.loaders.audioLoader.load(source.path, (file) => this.audioLoad(source, file))
    }
  }

  audioLoad(source: Sources, file: AudioBuffer) {
    const sound = new THREE.Audio( this.loaders.listener );
    if (source.name === "chestCloseSound") sound.offset = 1.2
    sound.setBuffer( file );
    sound.setVolume( 0.5 );
    this.sourcesLoaded(source, sound)
  }

  sourcesLoaded(source: Sources, file: any) {
    this.trigger('itemLoaded')
    console.log(this.loaded, this.toLoad)

    this.items[source.name] = file
    this.loaded++;

    if (this.loaded === this.toLoad) this.trigger("ready")
  }
}