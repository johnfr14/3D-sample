import Experience from "./Experience";
import { Howl, Howler } from 'howler';

export default class Sound {
  experience: Experience
  closingChest: unknown
  openningChest: unknown
  openningLockedChest: unknown

  constructor() {
    this.experience = Experience.Instance()
  }
}