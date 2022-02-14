import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bollywood',
  templateUrl: './bollywood.component.html',
  styleUrls: ['./bollywood.component.css']
})
export class BollywoodComponent implements OnInit {

  @Output() editMovie = new EventEmitter<any>();
  movieList:Array<any> = [];
  error: boolean = false;
  errorMessage: string = null;

  constructor(private userservice:UserService) { }

  ngOnInit() {
    this.importMovie();
  }

  manageBollywoodMovies(opetation?, data?, index?) {
    this.error = false;
    this.errorMessage = null;
    if(opetation == "remove") {
      this.movieList.splice(index,1);    
    } else if(opetation == "add") {
      this.movieList.push(data);
    } else if(opetation == "edit") {
      this.editMovie.emit({data: data, index:index, type:'bollywood'});
    } else if(opetation == "update") {
      this.movieList[index] = data;
    } else if(opetation == "transfer") {
      this.movieList.splice(index,1);
      this.userservice.transferMovie.next({data:data, newtype:'hollywood'});  
    } else {
      this.error = true;
      this.errorMessage = "Operation is not specified";
    }
  }

  importMovie() {
    this.userservice.transferMovie.subscribe((res: any) => {
      if(res.newtype == "bollywood") {
        this.movieList.push(res.data);
      }
    }, error => {
      this.error = true;
      this.errorMessage = error;
    });
  }
}
