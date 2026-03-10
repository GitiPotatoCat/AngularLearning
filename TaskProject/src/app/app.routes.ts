import { Routes } from '@angular/router'; 
import { CalculatorPage } from '../../views/calculator.page';
import { AddNumPage } from '../../views/addnum.page'; 
import { ProjectListPage } from '../../views/project-list.page';
import { DataGridPage } from '../../views/data-grid.page'; 
import { GalleryPage } from '../../views/gallery.page'; 
import { TodoPage } from '../../views/todo.page'; 
import { UnitConverterPage } from '../../views/unit-converter.page';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    {
        path: 'home', 
        loadComponent: () => import('../../views/home.page').then(m => m.HomePage)
    }, 
    {
        path: 'tasks/add-number', 
        component: AddNumPage
    }, 
    {
        path: 'tasks/calculator', 
        component: CalculatorPage
    }, 
    {
        path: 'about', 
        loadComponent: () => import('../../views/about.page').then(m => m.AboutPage)
    }, 
    {
        path: 'tasks/dynamic-card', 
        component: ProjectListPage
    }, 
    {
        path: 'tasks/data-grid', 
        component: DataGridPage
    }, 
    {
        path: 'tasks/modal-gallery', 
        component: GalleryPage
    }, 
    {
        path: 'tasks/todo-page', 
        component: TodoPage
    }, 
    {
        path: 'tasks/unit-converter', 
        component: UnitConverterPage
    }, 
];
