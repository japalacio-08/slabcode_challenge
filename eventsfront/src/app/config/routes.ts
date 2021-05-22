import { RunGuardsAndResolvers } from '@angular/router';
import { EventDetailPage } from '../pages/event_detail/event_detail';
import { HomePage } from '../pages/home/home';
// import { NotFoundPage } from '../pages/not_found/not_found';

export const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePage,
    data: { title: 'Inicio'},
    runGuardsAndResolvers: 'always' as RunGuardsAndResolvers
  },
  // { path: 'not_found', component: NotFoundPage, name: 'NotFound' ,data: { title: 'Recurso no encontrado'} },
  // {
  //   path: 'events',
  //   component: EventPage,
  //   data: {
  //     title: 'Mis Eventos',
  //     withRoles: ['*'],
  //     icon: 'fa fa-list',
  //     url: '/events',
  //     isMenu: true,
  //     caret: false,
  //   },
  //   runGuardsAndResolvers: 'always' as RunGuardsAndResolvers
  // },
  {
    path: 'events/:id',
    component: EventDetailPage, data: {
      title: 'Detalle de evento',
      withRoles: ['*'],
      icon: 'fa fa-clipboard-listfa fa-list',
      url: '/events/:id',
      isMenu: false,
      caret: false,
    },
    runGuardsAndResolvers: 'always' as RunGuardsAndResolvers
  },
];
