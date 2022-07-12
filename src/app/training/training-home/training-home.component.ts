import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-training-home',
  templateUrl: './training-home.component.html',
  styleUrls: ['./training-home.component.css']
})
export class TrainingHomeComponent implements OnInit, OnDestroy {

  ongoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe((result: Exercise) => {
      if (result) {
        this.ongoingTraining = true
      } else {
        this.ongoingTraining = false;
      }
    });
  }

  ngOnDestroy() {
    throw new Error('Method not implemented.');
  }

  onTrainingStart(eventData: any) {
    this.ongoingTraining = true;
  }
}
