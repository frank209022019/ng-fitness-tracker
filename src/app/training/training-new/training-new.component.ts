import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NewTrainingDef } from './new-training-def';

@Component({
  selector: 'app-training-new',
  templateUrl: './training-new.component.html',
  styleUrls: ['./training-new.component.css']
})
export class TrainingNewComponent implements OnInit {

  availableExercises: Exercise[] = [];
  form: FormGroup;

  @Output() trainingStart = new EventEmitter<string>();

  constructor(private trainingService: TrainingService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.availableExercises = this.trainingService.getAvailableExercises();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      exerciseId: ['', [Validators.required]]
    })
  }

  resetForm(){
    this.form.reset();
    this.form.updateValueAndValidity();
  }

  get exercise() {
    return this.form.get('exerciseId');
  }

  get f(){
    return this.form;
  }

  onStartTraining(){
    if(this.form.controls['exerciseId'].value === ''){
      alert('Select a training to begin.')
      return;
    }

    this.trainingService.startExercise(this.form.controls['exerciseId'].value);
  }
}
