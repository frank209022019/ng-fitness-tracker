import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject } from 'rxjs';
import { FIRESTORE_COLLECTION } from '../firestore/firestore-definition';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  //  private - prevent modification from outside the TrainingService
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ]

  // private finishedExercises: Exercise[] = [];
  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();


  constructor(private db: AngularFirestore) { }

  fetchAvailableExercises() {
    this.db
    .collection(FIRESTORE_COLLECTION.AVAILABLE_EXERCISES)
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map((doc: any) => {
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data()['name'],
          duration: doc.payload.doc.data()['duration'],
          calories: doc.payload.doc.data()['calories']
          // ...(doc.payload.doc.data() as Record<string, unknown>)
        };
      })
    }))
    .subscribe((exercises: Exercise[]) => {
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
    });
    // return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
    if (selectedExercise) {
      this.runningExercise = selectedExercise;
      this.exerciseChanged.next({ ...this.runningExercise })
    }
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  completeExercise() {
    //  Add completed exercises to an array
    // this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
    this.addToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    // this.exercises.push({
    //   ...this.runningExercise,
    //   duration: this.runningExercise.duration * (progress / 100),
    //   calories: this.runningExercise.duration * (progress / 100),
    //   date: new Date(),
    //   state: 'cancelled'
    // });
    this.addToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchCompletedOrCancelledExercises(){
    this.db.collection(FIRESTORE_COLLECTION.FINISHED_EXERCISES)
      .valueChanges()
      .subscribe((result: any) => {
        // this.finishedExercises = result as Exercise[];
        this.finishedExercisesChanged.next(result);
      })
    // return this.exercises.slice();
  }

  private addToDatabase(exercise: Exercise){
    this.db.collection(FIRESTORE_COLLECTION.FINISHED_EXERCISES).add(exercise);
  }

}
