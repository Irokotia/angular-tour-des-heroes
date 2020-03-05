import {Serializable} from './serializable';

export class Hero extends Serializable  {
  id: string;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  pointdevie: number; // Point de vie
  weaponid: string;

  uneMethode(): string {
    return 'le nom de mon hero' + this.name;
  }
}
