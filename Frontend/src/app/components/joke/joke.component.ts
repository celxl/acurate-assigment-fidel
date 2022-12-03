import { Component, OnInit } from '@angular/core';
import { JokeService } from 'src/app/services/joke.service';
import { JokeModel } from 'src/app/models/joke.model';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit{
  showPunchline:boolean = false ;
  joke:JokeModel = new JokeModel();

  constructor(private jokeService: JokeService){}

  ngOnInit(): void {
      this.getRandomJoke() ;
  }

  getRandomJoke(): void {
    this.jokeService.getRandomJoke()
      .subscribe(joke => {this.joke = joke });
  }
  

  onClick(): void {
    if(this.showPunchline){
      this.getRandomJoke() ;
    }
    this.showPunchline = !this.showPunchline ;
  }

}
