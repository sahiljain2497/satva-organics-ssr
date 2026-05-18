import { Routes } from '@angular/router';
import { buyerPageRoute } from './buyer-pages/buyer-page.registry';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { statePageRoute } from './state-pages/state-page.registry';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'contact', component: Contact },
  buyerPageRoute('bulk-vermicompost'),
  buyerPageRoute('apple-orchards'),
  buyerPageRoute('polyhouse-farmers'),
  buyerPageRoute('nurseries'),
  buyerPageRoute('dealer-program'),
  buyerPageRoute('quality-lab-reports'),
  buyerPageRoute('packaging-sizes'),
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
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
