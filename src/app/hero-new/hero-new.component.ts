import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../data/hero';
import {Weapon} from '../data/weapon';
import {HeroService} from '../hero.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {WeaponService} from '../weapon.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.css']
})
export class HeroNewComponent implements OnInit {


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
    this.hero = new Hero().fromJSON({ name: '', attaque: 1, degats: 1, esquive: 1, pointdevie: 1 });
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

  createHero() {
    if (this.updatePointsRestants() === 0) {
      if (this.hero.getName() !== '') {
        this.heroService.addHero(this.hero);
        this.goBack();
      } else {

      }
    } else {

    }

  }

  maxPoints(val: number) {
    return this.updatePointsRestants() + val;
  }
}
