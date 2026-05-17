import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'contact', component: Contact },
  {
    path: 'blogs',
    loadComponent: () => import('./blogs/blogs').then((m) => m.Blogs),
  },
  {
    path: 'blogs/:slug',
    loadComponent: () => import('./blogs/blog-detail/blog-detail').then((m) => m.BlogDetail),
  },
  {
    path: 'himachal-pradesh',
    loadComponent: () =>
      import('./state-pages/himachal-pradesh/himachal-pradesh').then((m) => m.HimachalPradesh),
  },
  {
    path: 'jammu-kashmir',
    loadComponent: () =>
      import('./state-pages/jammu-kashmir/jammu-kashmir').then((m) => m.JammuKashmir),
  },
  {
    path: 'uttar-pradesh',
    loadComponent: () =>
      import('./state-pages/uttar-pradesh/uttar-pradesh').then((m) => m.UttarPradesh),
  },
  {
    path: 'punjab-haryana',
    loadComponent: () =>
      import('./state-pages/punjab-haryana/punjab-haryana').then((m) => m.PunjabHaryana),
  },
  {
    path: 'pan-india-supply',
    loadComponent: () =>
      import('./pan-india-supply/pan-india-supply').then((m) => m.PanIndiaSupply),
  },
];
