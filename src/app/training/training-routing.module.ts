import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingHomeComponent } from './training-home/training-home.component';

const routes: Routes = [
  { path: '', component: TrainingHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
