import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService, TokenPayload} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  form: FormGroup;
  credentials: TokenPayload;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {
  	this.form = this.fb.group({
  	  email: ['', Validators.required],
  	  name: ['', Validators.required],
  	  password: ['', Validators.required]
  	});
  }

  ngOnInit() {
  }

  register(){
    let val = this.form.value;
    console.log(val);
    let credentials = {
      email: val.email,
      name: val.name,
      password: val.password
    }
    console.log(credentials);
    this.auth.register(credentials).subscribe(() => {
      console.log('Successfully registered');
      this.router.navigateByUrl('/');

    }, (err) => {
      console.log(err);
    })
  }

}
