import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-training-new',
  templateUrl: './training-new.component.html',
  styleUrls: ['./training-new.component.css']
})
export class TrainingNewComponent implements OnInit, OnDestroy {

  availableExercises: Exercise[] = [];
  exerciseSubscription: Subscription;
  form: FormGroup;

  isLoading = false;
  private loadingSub: Subscription;

  @Output() trainingStart = new EventEmitter<string>();

  constructor(private trainingService: TrainingService, private formBuilder: FormBuilder, private uiService: UiService) { }

  ngOnInit() {
    this.buildForm();
    //  Loading
    this.loadingSub = this.uiService.loadingStateChanged.subscribe((res: boolean) => {
      this.isLoading = res;
    })

    //  Load exercises
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe((result: Exercise[]) => {
      this.availableExercises = result;
    });

    this.fetchExercises();
  }

  ngOnDestroy(): void {
   if(this.exerciseSubscription) this.exerciseSubscription.unsubscribe();
   if(this.loadingSub) this.loadingSub.unsubscribe();
  }

  fetchExercises(){
    this.trainingService.fetchAvailableExercises();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      exerciseId: ['', [Validators.required]]
    })
  }

  resetForm() {
    this.form.reset();
    this.form.updateValueAndValidity();
  }

  get exercise() {
    return this.form.get('exerciseId');
  }

  get f() {
    return this.form;
  }

  onStartTraining() {
    if (this.form.controls['exerciseId'].value === '') {
      alert('Select a training to begin.')
      return;
    }

    this.trainingService.startExercise(this.form.controls['exerciseId'].value);
  }
}
