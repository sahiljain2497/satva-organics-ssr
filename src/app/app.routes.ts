import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { statePageRoute } from './state-pages/state-page.registry';

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
  statePageRoute('himachal-pradesh'),
  statePageRoute('jammu-kashmir'),
  statePageRoute('uttar-pradesh'),
  statePageRoute('punjab-haryana'),
  {
    path: 'pan-india-supply',
    loadComponent: () =>
      import('./pan-india-supply/pan-india-supply').then((m) => m.PanIndiaSupply),
  },
];
