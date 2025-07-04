import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { AboutUs } from './pages/aboutUs/aboutUs';
import { Register } from './auth/register/register';
import { Inicio } from './pages/inicio/inicio';
import { Productos2Component } from './pages/productos2/productos2';
import { Cart } from './carrito/cart/cart';
import { PedidosCliente } from './pages/pedidos-cliente/pedidos-cliente/pedidos-cliente';
import { AdminGuard } from './guards/admin-guard';
import { Restringido } from './restringido/restringido/restringido';
import { NotFound } from './pages/not-found/not-found';
import { Success } from './carrito/pago/success/success/success';
import { Pending } from './carrito/pago/pending/pending/pending';
import { Failure } from './carrito/pago/failure/failure/failure';

export const routes: Routes = [
    // Público
    {path:"", redirectTo:"/inicio", pathMatch:"full"},
    {path:"login", component:Login},
    {path:"register", component:Register},
    {path:"inicio", component:Inicio},
    {path:"sobre-nosotros", component:AboutUs},
    {path:"productos", component:Productos2Component},
    {path:"carrito", component:Cart},
    {path:"pedidos-cliente", component:PedidosCliente},
    {path:"restringido", component:Restringido},
    {path: "success", component:Success},
    {path: "pending", component:Pending},
    {path: "failure", component:Failure},
    // Privado
    {path:'admin', canActivate: [AdminGuard], loadComponent: () => import('./auth/admin/admin/admin').then(m => m.Admin)},
    {path:'servicios', canActivate: [AdminGuard], loadComponent: () => import('./auth/admin/servicios/servicios').then(m => m.Servicios)},
    {path:'pedidos', canActivate: [AdminGuard], loadComponent: () => import('./auth/admin/pedidos/pedidos/pedidos').then(m => m.Pedidos)},
    {path: "**", component:NotFound},
];
