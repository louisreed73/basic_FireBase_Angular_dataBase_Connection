import { HttpServiceService } from './../../services/http-service.service';
import { Post } from './../../models/post';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';




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

  PostGuardados:Post[]=[];
  fetching:boolean=false;


  constructor(private http:HttpServiceService) { }

  ngOnInit() {

    this.fetching=!this.fetching;
    console.log(this.http,this.rec,this.bor);

    this.http.recuperaPost().subscribe(datos => {
      this.PostGuardados=datos;
      this.fetching=!this.fetching;
    })
  }

  onSubmit(form:NgForm) {

    let {titulo,contenido}=form.value;
    let newPost=this._Post(titulo,contenido);

    console.log(form.value,newPost);

    this.http.createPost(newPost).subscribe(datos => {
      this.fetching=!this.fetching;
      console.log("Datos actualmente: ",datos)
   
      console.log("Datos actualmente en el Array: ",this.PostGuardados);

      this.http.recuperaPost().subscribe(datos => {
        this.PostGuardados=datos;
    this.fetching=!this.fetching;

      })
    })
    



  }

  onRecuperarPosts() {

    this.http.recuperaPost().subscribe(datos => {
      this.PostGuardados=datos;
    })

  }


  _Post(titulo:string,contenido:string):Post {
    return {
      titulo:titulo,
      contenido:contenido
    }
  }
}
