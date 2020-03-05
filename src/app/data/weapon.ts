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

  uneMethode(): string {
    return 'le nom de mon arme ' + this.name;
  }
}
