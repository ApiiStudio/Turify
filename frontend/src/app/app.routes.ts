import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/aboutUs/aboutUs';
import { Register } from './auth/register/register';
import { Inicio } from './pages/inicio/inicio';
import { Productos2Component } from './pages/productos2/productos2';
import { Cart } from './carrito/cart/cart';
import { Servicios } from './auth/admin/servicios/servicios';
import { Pedidos } from './auth/admin/pedidos/pedidos/pedidos';
import { PedidosCliente } from './pages/pedidos-cliente/pedidos-cliente/pedidos-cliente';
import { AdminGuard } from './guards/admin-guard';
import { Restringido } from './restringido/restringido/restringido';


export const routes: Routes = [
    // Público
    {path:"", redirectTo:"/home/inicio", pathMatch:"full"},
    {path:"login", component:Login},
    {path:"register", component:Register},
    {path:"home", component:Home,
        children:[
            {path: 'sobre-nosotros', component:AboutUs},
            {path: 'inicio', component:Inicio},
        ]
    },
    {path:"productos2", component:Productos2Component},
    {path:"carrito", component:Cart},
    {path: "pedidos-cliente", component:PedidosCliente},
    {path: "restringido", component:Restringido},
    // Privado
{
  path: 'admin',
  canActivate: [AdminGuard],
  loadComponent: () => import('./auth/admin/admin/admin').then(m => m.Admin)
},
{
  path: 'servicios',
  canActivate: [AdminGuard],
  loadComponent: () => import('./auth/admin/servicios/servicios').then(m => m.Servicios)
},
{
  path: 'pedidos',
  canActivate: [AdminGuard],
  loadComponent: () => import('./auth/admin/pedidos/pedidos/pedidos').then(m => m.Pedidos)
}

];
