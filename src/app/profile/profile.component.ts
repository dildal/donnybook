import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DataService, Post, Profile } from '../data.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService, private data: DataService, private route: ActivatedRoute) { }

  profile: Profile;
  posts: Post[];
  id: string;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  	
    console.log(this.id);

    this.data.getProfile(this.id)
      .subscribe(profile => {
        this.profile = profile;
      });
  	
    this.data.getPosts(this.id)
  		.subscribe(posts => {
        this.posts = posts;
      });
  }
  
  getProfile(id): void {
  	this.data.getProfile(id)
  		.subscribe(profile => {
  			this.profile = profile;
  		});
  }

  addPost(post){
    this.posts.push(post);
  }

  owner(post) : boolean {
    return this.auth.getUserDetails() && post.author === this.auth.getUserDetails()._id;
  }


}
