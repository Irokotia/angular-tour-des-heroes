import {Component, Input, OnInit} from '@angular/core';
import {Weapon} from '../data/weapon';
import {ActivatedRoute} from '@angular/router';
import {WeaponService} from '../weapon.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-weapon-new',
  templateUrl: './weapon-new.component.html',
  styleUrls: ['./weapon-new.component.css']
})
export class WeaponNewComponent implements OnInit {

  @Input() weapon: Weapon;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.weapon = new Weapon().fromJSON({name: '', attaque: 0, degats: 0, esquive: 0, pointdevie: 0});
  }

  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.weaponService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
  }

  goBack(): void {
    this.location.back();
  }

  updatePointsRestants() {
    const total = 0;
    return total - (this.weapon.attaque + this.weapon.degats + this.weapon.esquive + this.weapon.pointdevie);
  }
  updateCharaWeapon(attr, value) {
    for (const property in this.weapon) {
      if ( property === attr) { this.weapon[property] += value; }
    }
  }

  createWeapon() {
    if (this.updatePointsRestants() === 0) {
      if (this.weapon.getName() !== '') {
        this.weaponService.addWeapon(this.weapon);
        this.goBack();
      } else {

      }
    } else {

    }

  }
}
