import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-hollywood',
  templateUrl: './hollywood.component.html',
  styleUrls: ['./hollywood.component.css']
})
export class HollywoodComponent implements OnInit {

  @Output() editMovie = new EventEmitter<any>();
  movieList:Array<any> = [];

  constructor(private userservice:UserService) { }

  ngOnInit() {
    this.importMovie();
  }

  manageHollywoodMovies(opetation?, data?, index?) {
    if(opetation == "remove") {
      this.movieList.splice(index,1);    
    } else if(opetation == "add") {
      this.movieList.push(data);
    } else if(opetation == "edit") {
      this.editMovie.emit({data: data, index:index, type:'hollywood'});
    } else if(opetation == "update") {
      this.movieList[index] = data;
    } else if(opetation == "transfer") {
      this.movieList.splice(index,1);
      this.userservice.transferMovie.next({data:data, newtype:'bollywood'});  
    }
  }

  importMovie() {
    this.userservice.transferMovie.subscribe((res: any) => {
      if(res.newtype == "hollywood") {
        this.movieList.push(res.data);
      }
    });
  }
}
