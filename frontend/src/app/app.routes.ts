import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/aboutUs/aboutUs';
import { Register } from './auth/register/register';
import { Inicio } from './pages/inicio/inicio';
import { Admin } from './auth/admin/admin';
import { Productos } from './pages/productos/productos';
import { Productos2Component } from './pages/productos2/productos2';


export const routes: Routes = [
    {path:"", redirectTo:"/home/inicio", pathMatch:"full"},
    {path:"login", component:Login}, //publico
    {path:"home", component:Home,
        children:[
            {path: 'sobre-nosotros', component:AboutUs},
            {path: 'inicio', component:Inicio},
        ]
    },
    {path:"register", component:Register}, //publico
    {path:"admin", component:Admin},
    {path:"productos", component:Productos},
    {path:"productos2", component:Productos2Component},
];
