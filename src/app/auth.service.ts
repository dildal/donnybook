import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

export interface UserDetails {
	_id: string;
	email: string;
	name: string;
	exp: number;
	iat: number;
}

interface TokenResponse {
	token: string;
}

export interface TokenPayload {
	email: string;
	password: string;
	name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private token: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  private saveToken(token: string): void {
   localStorage.setItem('user-token', token);
   this.token = token;
  }

  public getToken(): string {
    if(!this.token){
      this.token = localStorage.getItem('user-token');
    }
    return this.token
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('user-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if(token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if(user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.http.post('/api/register', user).pipe(
      map((data: TokenResponse) => {
        if(data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }

  public login(user: TokenPayload): Observable<any> {
    return this.http.post('/api/login', user).pipe(
      map((data: TokenResponse) => {
        if(data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }


}
