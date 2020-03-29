import {Serializable} from './serializable';

export class Hero extends Serializable  {
  id: string;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  pointdevie: number; // Point de vie
  weaponid: string;

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}
