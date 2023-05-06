import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guard/auth-guard.service';
import { ClienteGuardService } from './guard/cliente-guard.service';
import { role } from './shared/role';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  { path: 'random', loadChildren: () => import('./random/random.module').then(m => m.RandomModule) },
  { path: 'listado-usuario', loadChildren: () => import('./pages/dashboard/usuarios/listado-usuarios/listado-usuarios.module').then(m => m.ListadoUsuariosModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin]} },
  { path: 'registrar-usuario', loadChildren: () => import('./pages/dashboard/usuarios/registrar-usuarios/registrar-usuarios.module').then(m => m.RegistrarUsuariosModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin]} },
  { path: 'editar-usuario/:id', loadChildren: () => import('./pages/dashboard/usuarios/editar-usuarios/editar-usuarios.module').then(m => m.EditarUsuariosModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin]} },
  { path: 'listado-biblioteca', loadChildren: () => import('./pages/dashboard/biblioteca/listar-biblioteca/listar-biblioteca.module').then(m => m.ListarBibliotecaModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'registrar-biblioteca', loadChildren: () => import('./pages/dashboard/biblioteca/registrar-biblioteca/registrar-biblioteca.module').then(m => m.RegistrarBibliotecaModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'editar-bibliotecas/:id', loadChildren: () => import('./pages/dashboard/biblioteca/editar-biblioteca/editar-biblioteca.module').then(m => m.EditarBibliotecaModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'registrar-cliente', loadChildren: () => import('./pages/dashboard/cliente/registrar-cliente/registrar-cliente.module').then(m => m.RegistrarClienteModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'listado-cliente', loadChildren: () => import('./pages/dashboard/cliente/listar-cliente/listar-cliente.module').then(m => m.ListarClienteModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'editar-clientes/:id', loadChildren: () => import('./pages/dashboard/cliente/editar-cliente/editar-cliente.module').then(m => m.EditarClienteModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'tipo-tarea', loadChildren: () => import('./pages/dashboard/tipo-tarea/tipo-tarea.module').then(m => m.TipoTareaModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'registrar-tarea', loadChildren: () => import('./pages/dashboard/tarea/registrar-tarea/registrar-tarea.module').then(m => m.RegistrarTareaModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'editar-tarea/:id', loadChildren: () => import('./pages/dashboard/tarea/editar-tarea/editar-tarea.module').then(m => m.EditarTareaModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'reporte-tarea-terminada', loadChildren: () => import('./pages/dashboard/tarea/reporte-tarea/terminada/terminada.module').then(m => m.TerminadaModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'reporte-tarea-activa', loadChildren: () => import('./pages/dashboard/tarea/reporte-tarea/activa/activa.module').then(m => m.ActivaModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'tablero-tarea', loadChildren: () => import('./pages/dashboard/tarea/tablero-tarea/tablero-tarea.module').then(m => m.TableroTareaModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'tipo-proceso', loadChildren: () => import('./pages/dashboard/tipo-proceso/tipo-proceso.module').then(m => m.TipoProcesoModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'reporte-proceso', loadChildren: () => import('./pages/dashboard/proceso/reporte-proceso/reporte-proceso.module').then(m => m.ListarProcesoModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'listado-proceso', loadChildren: () => import('./pages/dashboard/proceso/listar-proceso/listar-proceso.module').then(m => m.ListarProcesoModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'registrar-proceso', loadChildren: () => import('./pages/dashboard/proceso/registrar-proceso/registrar-proceso.module').then(m => m.RegistrarProcesoModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'registrar-actuacion', loadChildren: () => import('./pages/dashboard/proceso/consulta-proceso/consulta-proceso.module').then(m => m.ConsultaProcesoModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'editar-proceso/:id', loadChildren: () => import('./pages/dashboard/proceso/editar-proceso/editar-proceso.module').then(m => m.EditarProcesoModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'mostrar-proceso/:id', loadChildren: () => import('./pages/dashboard/proceso/mostrar-proceso/mostrar-proceso.module').then(m => m.MostrarProcesoModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.superAdmin, role.usuario]} },
  { path: 'listado-proceso-cliente', loadChildren: () => import('./pages/cliente/listado-procesos/listado-procesos.module').then(m => m.ListadoProcesosModule), canActivate: [ClienteGuardService]},
  { path: 'mostrar-proceso-cliente/:id', loadChildren: () => import('./pages/cliente/mostrar-proceso/mostrar-proceso.module').then(m => m.MostrarProcesoModule), canActivate: [ClienteGuardService]}
];

@NgModule({

  imports: [RouterModule.forRoot(routes, {
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
