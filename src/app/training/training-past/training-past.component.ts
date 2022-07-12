import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-training-past',
  templateUrl: './training-past.component.html',
  styleUrls: ['./training-past.component.css']
})
export class TrainingPastComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns: string[] = ['id', 'date', 'name', 'duration', 'calories', 'state'];

  form: FormGroup;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
    this.form.controls['search'].valueChanges.subscribe((result: string) => {
      if(result){
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
