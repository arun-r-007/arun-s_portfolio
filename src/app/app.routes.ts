import { Routes } from '@angular/router';
import { Creator } from './pages/creator/creator';
import { Journey } from './pages/journey/journey';
import { Projects } from './pages/projects/projects';
import { Social } from './pages/social/social';
import { Contact } from './pages/contact/contact';
import { App } from './app';

export const routes: Routes = [
  { path: ''       , component:App },
  { path: 'creator', component: Creator },
  { path: 'journey', component: Journey },
  { path: 'projects', component: Projects },
  { path: 'social', component: Social },
  { path: 'contact', component: Contact },
];
