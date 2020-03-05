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

}
