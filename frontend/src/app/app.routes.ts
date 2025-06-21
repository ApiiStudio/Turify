import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/aboutUs/aboutUs';
import { Register } from './auth/register/register';
import { Inicio } from './pages/inicio/inicio';
import { Admin } from './auth/admin/admin/admin';
import { Productos2Component } from './pages/productos2/productos2';
import { Cart } from './carrito/cart/cart';
import { Servicios } from './auth/admin/servicios/servicios';
import { Pedidos } from './auth/admin/pedidos/pedidos/pedidos';
import { PedidosCliente } from './pages/pedidos-cliente/pedidos-cliente/pedidos-cliente';


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
    {path:"servicios", component:Servicios},
    {path:"productos2", component:Productos2Component},
    {path:"carrito", component:Cart},
    {path:"pedidos", component:Pedidos},
    {path: "pedidos-cliente", component:PedidosCliente},
];
