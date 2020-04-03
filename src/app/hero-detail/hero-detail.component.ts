import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import {WeaponService} from '../weapon.service';
import {Weapon} from '../data/weapon';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  @Input() weapons: Weapon[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private weaponService: WeaponService,
    private storage: AngularFireStorage, private database: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getWeapons();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }
  goBack(): void {
    this.location.back();
  }

  updatePointsRestants() {
    const total = 40;
    return total - (this.hero.attaque + this.hero.degats + this.hero.esquive + this.hero.pointdevie);
  }


  getSelectedWeapon() {
    return this.weapons.find(e => e.id === this.hero.weaponid);
  }
  updateCharaHero(attr, value) {
    for (const property in this.hero) {
      if ( property === attr) { this.hero[property] += value; }
    }
  }

  saveHeroCharacteristics() {
    if (this.updatePointsRestants() === 0) {
      if (this.hero.getName() !== '') {
        this.heroService.updateHero(this.hero.getId(), this.hero);
        this.goBack();
      }
    }

  }

  maxPoints(val: number) {
    return this.updatePointsRestants() + val;
  }

  deleteHero() {
    this.heroService.deleteHero(this.hero.getId());
    this.goBack();
  }
}
