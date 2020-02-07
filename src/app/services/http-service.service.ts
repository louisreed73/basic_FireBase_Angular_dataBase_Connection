import { Post } from './../models/post';
import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  // PostGuardados:Post[]=[];


  constructor(private http:HttpClient) { }

  createPost(newPost:Post) {

    return this.http
    .post<{name:string}>("https://ng-databse.firebaseio.com/posts.json",newPost)
    




  }


  recuperaPost() {

  
  
  
      // console.log(this.http)
      return this.http.get<{[key:string]:Post}>("https://ng-databse.firebaseio.com/posts.json").pipe(map( post=>{
        let arrayPost:Post[]=[];
        for(let key in post) {
          if(post.hasOwnProperty(key)) {
            arrayPost.push(  {...post[key] , id:key})
          }
   
        }
        console.log("Estoy realizando un backup!!!!!")
        return arrayPost.reverse();
      }))

      
    }
    





}
