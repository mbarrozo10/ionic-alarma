import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { App } from '@capacitor/app';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  formulario: FormGroup;
  constructor(private router: Router, private authService: AuthService, private formbuilder: FormBuilder) {
    this.formulario = this.formbuilder.group({
      nombre: [''],
      contra: [''],
    });
  }
  usuario: string='';
  pass:string='';

 

async login (){
  const user= await this.authService.login(this.usuario, this.pass);
  if(user) {
    this.router.navigateByUrl('/home',{replaceUrl: true});
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      heightAuto: false

    })
  }
}
  ngOnInit() {

  }
  salir(){
    App.exitApp();
  }


  Autocompletar(usuario:string, pass:string) {
    this.usuario=usuario;
    this.pass= pass;
  }
}
