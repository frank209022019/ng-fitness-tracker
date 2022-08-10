import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-training-current',
  templateUrl: './training-current.component.html',
  styleUrls: ['./training-current.component.css']
})
export class TrainingCurrentComponent implements OnInit {

  progress = 0;
  timer: number;
  @Output() stopTrainingEvent = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = window.setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStopTraining(){
    clearInterval(this.timer);
    const dialogData: StopDialogData = {
      title: 'Stop Training',
      message: 'Do you want to stop this training?'
    }
    this.dialog.open(StopTrainingComponent, {
      data: dialogData
    }).afterClosed().subscribe((res) => {
      if(res){
        // this.stopTrainingEvent.emit();
        this.trainingService.cancelExercise(this.progress);
      } else{
        //  continue training
        this.startOrResumeTimer();
      }
    })
  }
}

export interface StopDialogData {
  title: string;
  message: string;
}
