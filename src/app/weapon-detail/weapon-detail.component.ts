import { Component, OnInit, Input } from '@angular/core';
import { Weapon } from '../data/weapon';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WeaponService } from '../weapon.service';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit {
  @Input() weapon: Weapon;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWeapon();
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

  saveWeaponCharacteristics() {
    if (this.updatePointsRestants() === 0) {
      if (this.weapon.getName() !== '') {
        this.weaponService.updateWeapon(this.weapon.getId(), this.weapon);
        this.goBack();
      }
    }
  }

  deleteWeapon() {
    this.weaponService.deleteWeapon(this.weapon.getId());
    this.goBack();
  }
}
