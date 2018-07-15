import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService, TokenPayload} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
    	email: ['', Validators.required],
    	password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  login() {
  	let val = this.form.value;
    let credentials: TokenPayload = {
      email: val.email,
      password: val.password
    }
		this.authService.login(credentials)
		  .subscribe(() => {
		  	console.log("User is logged in");
		  	this.router.navigateByUrl('/profile/' + this.authService.getUserDetails()._id)
		  }, (err) => {
        console.log(err);
      });
  }

}
