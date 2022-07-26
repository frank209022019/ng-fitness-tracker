import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { StopTrainingComponent } from "./training-current/stop-training.component";
import { TrainingCurrentComponent } from "./training-current/training-current.component";
import { TrainingHomeComponent } from "./training-home/training-home.component";
import { TrainingNewComponent } from "./training-new/training-new.component";
import { TrainingPastComponent } from "./training-past/training-past.component";

@NgModule({
  declarations: [
    TrainingPastComponent,
    TrainingNewComponent,
    TrainingCurrentComponent,
    TrainingHomeComponent,
    StopTrainingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  exports: [

  ]
})

export class TrainingModule { }
