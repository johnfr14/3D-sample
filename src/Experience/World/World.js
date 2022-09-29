import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";
import Chest from "./Chest";
import Wallet from "../Utils/Wallet";

export default class World {
  constructor(experience) {

    this.experience = experience;
    this.scene = experience.scene;
    this.ressources = experience.ressources;


    this.ressources.on("ready", () => {
      this.floor = new Floor(this.experience);
      this.fox = new Fox(this.experience);
      this.environment = new Environment(this.experience);
      this.wallet = new Wallet(this.experience)
      this.chest = new Chest(this.experience);
    })

  }

  update() {
    if (this.fox)
      this.fox.update()
    if (this.chest)
      this.chest.update()
  }

}