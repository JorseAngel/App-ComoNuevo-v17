import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./componentes/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'feed-venta',
    loadChildren: () => import('./componentes/postVenta/feed-venta/feed-venta.module').then( m => m.FeedVentaPageModule)
  },
  {
    path: 'feed-compra',
    loadChildren: () => import('./componentes/postCompra/feed-compra/feed-compra.module').then( m => m.FeedCompraPageModule)
  },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./componentes/perfil/mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
  },
  {
    path: 'edit-perfil',
    loadChildren: () => import('./componentes/perfil/edit-perfil/edit-perfil.module').then( m => m.EditPerfilPageModule)
  },
  {
    path: 'fav-venta-perfil/:uuiCurrent/:nombreCurrent',
    loadChildren: () => import('./componentes/perfil/fav-venta-perfil/fav-venta-perfil.module').then( m => m.FavVentaPerfilPageModule)
  },
  {
    path: 'fav-compra-perfil/:uuiCurrent/:nombreCurrent',
    loadChildren: () => import('./componentes/perfil/fav-compra-perfil/fav-compra-perfil.module').then( m => m.FavCompraPerfilPageModule)
  },
  {
    path: 'detail-venta/:idPost',
    loadChildren: () => import('./componentes/postVenta/detail-venta/detail-venta.module').then( m => m.DetailVentaPageModule)
  },
  {
    path: 'add-venta',
    loadChildren: () => import('./componentes/postVenta/add-venta/add-venta.module').then( m => m.AddVentaPageModule)
  },
  {
    path: 'my-post-venta/:uuiCurrent/:nombreCurrent',
    loadChildren: () => import('./componentes/perfil/my-post-venta/my-post-venta.module').then( m => m.MyPostVentaPageModule)
  },
  {
    path: 'detail-compra/:idPost',
    loadChildren: () => import('./componentes/postCompra/detail-compra/detail-compra.module').then( m => m.DetailCompraPageModule)
  },
  {
    path: 'add-compra',
    loadChildren: () => import('./componentes/postCompra/add-compra/add-compra.module').then( m => m.AddCompraPageModule)
  },
  {
    path: 'my-post-compra/:uuiCurrent/:nombreCurrent',
    loadChildren: () => import('./componentes/perfil/my-post-compra/my-post-compra.module').then( m => m.MyPostCompraPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
