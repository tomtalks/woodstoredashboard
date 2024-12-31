import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world.component';

const routes: Routes = [
  { path: '', redirectTo: '/helloWorld', pathMatch: 'full' },
  { path: 'helloWorld', component: HelloWorldComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
