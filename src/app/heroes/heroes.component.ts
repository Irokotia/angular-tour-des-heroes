import { Component, OnInit } from '@angular/core';

import { Hero } from '../data/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;

  heroes: Hero[];
  private sortingType: boolean;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  sortHeroesByProperty(property) {
    if (this.sortingType) {
      this.heroes.sort((a, b) => a[property] - b[property] );
    } else {
      this.heroes.sort((a, b) => b[property] - a[property] );
    }
    this.sortingType = !this.sortingType;
  }
}
