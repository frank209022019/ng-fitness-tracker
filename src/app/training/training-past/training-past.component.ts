import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-training-past',
  templateUrl: './training-past.component.html',
  styleUrls: ['./training-past.component.css']
})
export class TrainingPastComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns: string[] = ['id', 'date', 'name', 'duration', 'calories', 'state'];

  form: FormGroup;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  private exChangedSubscription: Subscription;
  totalRecords = 0;

  constructor(private trainingService: TrainingService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.trainingService.fetchCompletedOrCancelledExercises();
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((result: Exercise[]) => {
      this.dataSource.data = result;
      this.totalRecords = result.length;
    })

    this.form.controls['search'].valueChanges.subscribe((result: string) => {
      if (result) {
        this.dataSource.filter = result.trim().toLowerCase();
      }
    })
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      //  assign referenced sort selector to the datasource
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    if (this.exChangedSubscription) this.exChangedSubscription.unsubscribe();
  }

  get s() {
    return this.form.controls['search'];
  }

  buildForm() {
    this.form = this.formBuilder.group({
      search: [''],
    });
  }

  resetForm() {
    this.form.reset();
    this.form.updateValueAndValidity();
  }
}
