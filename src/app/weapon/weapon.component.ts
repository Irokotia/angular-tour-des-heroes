import {Component, Input, OnInit} from '@angular/core';

import {Weapon} from '../data/weapon';
import {WeaponService} from '../weapon.service';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit {
  selectedWeapon: Weapon;

  weapons: Weapon[];
  private sortingType: boolean;

  constructor(private weaponService: WeaponService) { }

  ngOnInit() {
    this.getWeapons();
  }

  onSelect(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }
  sortWeaponsByProperty(property) {
    if (this.sortingType) {
      this.weapons.sort((a, b) => a[property] - b[property] );
    } else {
      this.weapons.sort((a, b) => b[property] - a[property] );
    }
    this.sortingType = !this.sortingType;
  }

}
