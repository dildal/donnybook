import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from './auth.service';



export interface Post {
  title: string;
  content: string;
  author: string;
  createdAt: Date;   	
}

 export interface Profile {
   name: string;
   _id: string;
 }

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  getProfile(id) : Observable<any> {
    return this.http.get('/api/profile/'+id).pipe(
      map(data => data)
    );
  }

  getPosts(id): Observable<any> {
  	return this.http.get('/api/posts/'+id).pipe(
  		map(data => data)
  	);
  }

  createPost(post: Post): Observable<any> {
    return this.http.post('/api/post', post, {headers: { Authorization: `Bearer ${this.auth.getToken()}` }}).pipe(
      map(data => {
        return data
      })
    );
  }
}
