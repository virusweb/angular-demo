import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BollywoodComponent } from '../bollywood/bollywood.component';
import { HollywoodComponent } from '../hollywood/hollywood.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild(BollywoodComponent) bollywood : BollywoodComponent;
  @ViewChild(HollywoodComponent) hollywood : HollywoodComponent;
  
  movieForm: FormGroup;
  submitted:boolean = false;
  success:boolean = false;
  editIndex:number = null;
  oldMovieType:string = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  addMovie(): any {
    this.submitted = true;
    if(this.movieForm.invalid) {
      return;
    }

    let name = this.movieForm.value.name;
    let year = this.movieForm.value.year;
    let type = this.movieForm.value.type;
    let mode = (this.editIndex !== null && this.oldMovieType == type) ? 'update' : 'add';

    if(type == "bollywood") {
      if(this.editIndex >= 0 && this.oldMovieType == "hollywood") {
        this.hollywood.manageHollywoodMovies("remove", null, this.editIndex);
      }
      this.bollywood.manageBollywoodMovies(mode,{name:name,year:year}, this.editIndex);
    } else {
      if(this.editIndex >= 0 && this.oldMovieType == "bollywood") {
        this.bollywood.manageBollywoodMovies("remove", null, this.editIndex);
      }
      this.hollywood.manageHollywoodMovies(mode,{name:name,year:year}, this.editIndex);
    }

    this.editIndex = null;
    this.submitted = false;
    this.movieForm.reset();
  }

  editMovie(movie:any): void {
    this.editIndex = movie.index;
    this.oldMovieType = movie.type;
    this.movieForm.setValue({
      name:movie.data.name,
      year:movie.data.year,
      type: movie.type
    });
  }
}