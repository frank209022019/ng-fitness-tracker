import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FIRESTORE_COLLECTION } from 'src/app/firestore/firestore-definition';
import { FirestoreService } from 'src/app/firestore/firestore.service';
import { TrainingService } from '../training.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-training-new',
  templateUrl: './training-new.component.html',
  styleUrls: ['./training-new.component.css']
})
export class TrainingNewComponent implements OnInit {

  // availableExercises: Exercise[] = [];
  availableExercises: Observable<any>;

  form: FormGroup;

  @Output() trainingStart = new EventEmitter<string>();

  constructor(private trainingService: TrainingService, private formBuilder: FormBuilder, private firestoreService: FirestoreService, private db: AngularFirestore) { }

  ngOnInit() {
    this.buildForm();
    this.getExercises();
    // this.availableExercises = this.trainingService.getAvailableExercises();
  }

  getExercises(){
  //  this.availableExercises = this.firestoreService.getCollection(FIRESTORE_COLLECTION.AVAILABLE_EXERCISES).valueChanges();
   this.availableExercises = this.db.collection(FIRESTORE_COLLECTION.AVAILABLE_EXERCISES).valueChanges();
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
