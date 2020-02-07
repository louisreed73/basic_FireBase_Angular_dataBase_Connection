import { Post } from './../../models/post';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { map } from 'rxjs/operators';


const gen=function* () {
  let count=0;
  while(true) {
    yield count++;
  }
}

let _gen=gen();



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{

  @ViewChild("rec",{static:true}) rec:ElementRef;
  @ViewChild("bor",{static:true}) bor:ElementRef;

  constructor(private http:HttpClient) { }

  ngOnInit() {

    console.log(this.http,this.rec,this.bor);
    this.recupera();
    // console.log(this.rec.nativeElement.classList)
    this.rec.nativeElement.addEventListener("click",this.recupera.bind(this))
    this.bor.nativeElement.addEventListener("click",()=>{
      console.log("borrando los datos!!!!!!")
    });
    // this.recupera()
  }

  onSubmit(form:NgForm) {

    let {titulo,contenido}=form.value;
    let newPost=new Post(titulo,contenido);
    // let newPost2=new Post(_gen.next().value,titulo,contenido);
    
    // let input=elem.querySelector("input");
    console.log(form.value,newPost)

    this.http
    .post("https://ng-databse.firebaseio.com/posts.json",newPost)
    .subscribe(data=>{
      console.log(data)
    })
  }

  recupera() {

    // console.log(this.http)
    this.http.get("https://ng-databse.firebaseio.com/posts.json").pipe(map(post=>{
      let arrayPost=[];
      for(let key in post) {
        if(post.hasOwnProperty(key)) {
          arrayPost.push(  {...post[key] , id:key})
        }
        // console.log(arrayPost)
      }
      return arrayPost
    })).subscribe(datos => {
      console.log(datos)
    })
  }
}
