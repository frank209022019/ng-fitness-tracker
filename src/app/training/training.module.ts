import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { StopTrainingComponent } from "./training-current/stop-training.component";
import { TrainingCurrentComponent } from "./training-current/training-current.component";
import { TrainingHomeComponent } from "./training-home/training-home.component";
import { TrainingNewComponent } from "./training-new/training-new.component";
import { TrainingPastComponent } from "./training-past/training-past.component";
import { TrainingRoutingModule } from "./training-routing.module";

@NgModule({
  declarations: [
    TrainingPastComponent,
    TrainingNewComponent,
    TrainingCurrentComponent,
    TrainingHomeComponent,
    StopTrainingComponent
  ],
  imports: [
   SharedModule,
   TrainingRoutingModule
  ],
  exports: [

  ]
})

export class TrainingModule { }
