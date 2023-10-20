import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { PluginListenerHandle  } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import {Howl} from 'howler';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import Swal from 'sweetalert2';
import { Vibration } from '@ionic-native/vibration/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  acellHandler?: PluginListenerHandle;
  x?:any=0;
  y?:any=0;
  z?:any=0;
  test?:boolean;
  Activar: string="Activar"
  active? : Howl;
  color?:string;
  constructor(private authService: AuthService, private router: Router, private firestore : Firestore, private flash: Flashlight, private vibration: Vibration) {
    const placeref= collection(this.firestore, 'usuarios');
     const retorno= collectionData(placeref);
     retorno.subscribe(data =>
     {
      
      // const retorno= data.find(item => item['correo']===this.authService.retornarUsuario());
      for (const x of data){
        if(x['correo']=== this.authService.retornarUsuario() ){
          this.usuario= x['usuario'];
        }
      }
     })
   }
   
   usuario?:  any;
  ngOnInit() {
    this.iniciar()
    this.color="success"
  }
  
  async logout(){
   await this.authService.logout();
   this.router.navigateByUrl('/', {replaceUrl: true});
  }


  async activar(){
    if(this.Activar=="Activar"){
      this.test=true;
      this.Activar="Desactivar";
      this.color="danger"
    }else{
      Swal.fire({
        title: 'Por favor ingresar la clave',
        input: 'password',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        cancelButtonText: "Cancel",
        
        confirmButtonText: "Done!",
      heightAuto: false,
      preConfirm: (login) => {
        this.authService.VerificarContraseña(login).then(data =>{
          if(data){
            this.Activar="Activar";
            this.test=false;
            this.color="success"

          }else{
            console.log("salio mal")
            throw new Error("error");
          }
        }
        ).catch(err =>{
          console.log("salio mal")
          Swal.showValidationMessage('Request failed: Contraseña incorrecta')
        } )  }
       })
      
    }
    console.log("sali");
   
  }

  async iniciar(){
    
    this.acellHandler = await Motion.addListener('orientation', event =>{
      if(this.test){
      console.log(event)
        if(event.gamma > 30 && event.alpha >90){
          this.test = false;
          this.active=new Howl({
            src:["../assets/ojo.mp3"]
          })
          this.active.play();
          setTimeout(() =>
          this.test = true,3000);
        }else if(event.gamma < -30 && event.alpha < 180) {
          this.test = false;
          this.active=new Howl({
            src:["../assets/hurto.mp3"]
          })
          this.active.play();
          setTimeout(() =>
          this.test = true,4000);
        }
        if(event.beta > 28) {
          this.test = false;
          this.active=new Howl({
            src:["../assets/sirFuerte.mp3"]
          })
          this.active.play();
          this.flash.switchOn();
          setTimeout(() =>{
          this.test = true
          this.active?.stop();
          this.flash.switchOff();
        },5000);
        }
        if(event.alpha >120 || event.alpha <75  ){ //remirar
          this.test = false;
          this.active=new Howl({
            src:["../assets/sirPolicia.mp3"]
          })
          this.active.play();
          this.vibration.vibrate(5000);
          setTimeout(() =>{
            this.test = true
            this.active?.stop();
          },5000);
        }
      }
        this.x= event.beta;  //vertical 
        this.y= event.gamma;
        this.z= event.alpha; //girar
    });
  }
  
  
}
