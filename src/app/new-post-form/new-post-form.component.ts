import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService, TokenPayload} from '../auth.service';
import {DataService, Post} from '../data.service';

@Component({
  selector: 'new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.css']
})
export class NewPostFormComponent implements OnInit {
  @Output()
  postCreated: EventEmitter<Post> = new EventEmitter<Post>();
  post: Post;
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private data: DataService) {
    this.form = this.fb.group({
    	title: ['', Validators.required],
    	content: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createPost(){
    let val = this.form.value;
    this.data.createPost(val)
      .subscribe(post => {
        this.post = post;
        this.postCreated.emit(this.post);
      });
  }

}
