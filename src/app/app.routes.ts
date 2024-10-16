import { Routes } from '@angular/router';
import { TransaccionesComponent } from './pages/transacciones/transacciones.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path:'transacciones',
    // component: TransaccionesComponent,
    loadComponent:()=>import('@pages/transacciones/transacciones.component').then(c=>c.TransaccionesComponent)
  },
  {
    path:'login',
    // component: LoginComponent,
    loadComponent:()=>import('@pages/login/login.component').then(c=>c.LoginComponent)
  }
];
