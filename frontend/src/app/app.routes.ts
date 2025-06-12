import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/aboutUs/aboutUs';
import { Register } from './auth/register/register';
import { Inicio } from './pages/inicio/inicio';
import { Admin } from './auth/admin/admin';
import { Alojamiento } from './pages/alojamiento/alojamiento';
import { AlquilerAuto } from './pages/alquiler-auto/alquiler-auto';
import { Excursiones } from './pages/excursiones/excursiones';
import { PaquetesTuristicos } from './pages/paquetes-turisticos/paquetes-turisticos';
import { Vuelos } from './pages/vuelos/vuelos';


export const routes: Routes = [
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"login", component:Login}, //publico
    {path:"home", component:Home,
        children:[
            {path: 'sobre-nosotros', component:AboutUs},
            {path: 'inicio', component:Inicio},
        ]
    },
    {path:"register", component:Register}, //publico
    {path:"admin", component:Admin},
    {path:"alojamiento", component:Alojamiento},
    {path:"alquiler-de-auto", component:AlquilerAuto},
    {path:"excursiones", component:Excursiones},
    {path:"paquetes-turisticos", component:PaquetesTuristicos},
    {path:"vuelos", component:Vuelos}
];
