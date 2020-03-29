import {Serializable} from './serializable';
import {Hero} from './hero';

export class Weapon extends Serializable {
  id: string;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  pointdevie: number;
  heroid: string;


  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}
