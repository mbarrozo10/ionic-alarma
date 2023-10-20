import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import 
{
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate
}from '@angular/fire/auth-guard';
const redirectUn= () => redirectUnauthorizedTo(['']);
const redirectLog = () => redirectLoggedInTo(['home']);
const routes: Routes = [
  // {
  //   // path: '',
  //   // redirectTo: 'login',
  //   // pathMatch: 'full'
  //   // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./ingreso/ingreso.module').then( m => m.IngresoPageModule),
    ...canActivate(redirectLog)

  },{
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUn)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
