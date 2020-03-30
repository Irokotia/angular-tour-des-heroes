import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {WeaponDetailComponent} from './weapon-detail/weapon-detail.component';
import {WeaponComponent} from './weapon/weapon.component';
import {HeroNewComponent} from './hero-new/hero-new.component';
import {WeaponNewComponent} from './weapon-new/weapon-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hero/detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'weapon/detail/:id', component: WeaponDetailComponent },
  { path: 'weapons', component: WeaponComponent },
  { path: 'new-hero', component: HeroNewComponent },
  { path: 'new-weapon', component: WeaponNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
