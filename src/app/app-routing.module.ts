import { NgModule } from '@angular/core';
import {  RouterModule ,Routes} from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [ 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },// 대시보드 화면 자동 표시하기 위한 라우팅 규칙
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent ,},
  //라우팅 규칙
  //사용자가 링크 클릭시 / URL 입력시 라우터가 표시할 화면 정의
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
