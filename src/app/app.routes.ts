import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Contactus } from './pages/contactus/contactus';
import { UserForm } from './pages/userform/userform';
import { Products } from './pages/products/products';
import { authGuard } from './gaurd/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: UserForm,
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'about',
        component: About,
      },
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'contactus',
        component: Contactus,
      },
     
      {
        path: 'products',
        component: Products,
        canActivate: [authGuard],
      },
    ],
  },
  { path: '**', redirectTo: 'userform' },
];
