import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject, Subscription } from 'rxjs';
import { FIRESTORE_COLLECTION } from '../firestore/firestore-definition';
import { UiService } from '../shared/ui.service';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService implements OnDestroy {

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

  private fbSubs: Subscription[] = [];


  constructor(private db: AngularFirestore, private uiService: UiService) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  fetchAvailableExercises() {
    this.fbSubs.push(this.db
      .collection(FIRESTORE_COLLECTION.AVAILABLE_EXERCISES)
      .snapshotChanges()
      .pipe(map(docArray => {
        // throw(new Error)
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
      },
        error => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar('Fetching exercises failed. Please try again later.', null, 3000);
          this.exercisesChanged.next(null);
        }));
    // return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    //  Select a single document and updateing, etc...
    //  this.db.doc(FIRESTORE_COLLECTION.AVAILABLE_EXERCISES + "/" + selectedId).update({ lastSelectd: new Date() })

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

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection(FIRESTORE_COLLECTION.FINISHED_EXERCISES)
      .valueChanges()
      .subscribe((result: any) => {
        // this.finishedExercises = result as Exercise[];
        this.finishedExercisesChanged.next(result);
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(i => i.unsubscribe());
  }

  private addToDatabase(exercise: Exercise) {
    this.db.collection(FIRESTORE_COLLECTION.FINISHED_EXERCISES).add(exercise);
  }

}
