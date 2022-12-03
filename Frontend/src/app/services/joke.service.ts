import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JokeModel } from '../models/joke.model';
import { env } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  constructor(private http:HttpClient) { }

  getRandomJoke(): Observable<JokeModel>{
    return this.http.get<JokeModel>(`${env.baseUrl}/jokes/randomize`) ;
  }
  
}
