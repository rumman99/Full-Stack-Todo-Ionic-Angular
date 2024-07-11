import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'todos',
    loadComponent: () => import('./pages/todos/todos.page').then( m => m.TodosPage)
  },
  {
    path: 'create-todo',
    loadComponent: () => import('./pages/create-todo/create-todo.page').then( m => m.CreateTodoPage)
  },
  {
    path: 'update-todo',
    loadComponent: () => import('./pages/update-todo/update-todo.page').then( m => m.UpdateTodoPage)
  },
];
