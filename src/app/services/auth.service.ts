import { Injectable } from '@angular/core';
import{Auth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firebase: Firestore) { }

  async login ( user: string, pass: string){
    try{
      const usuario= await signInWithEmailAndPassword(
        this.auth,
        user,
        pass
      );
      return usuario;
    }catch(err){
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  retornarUsuario(){
    const user= this.auth.currentUser;
    // console.log(user);
    if(user != null){
      return user.email;
    }else{
      return 'null';
    }
  }

  public static contraseña: any =""; ;
  VerificarContraseña(contraseña: string){
    const placeRef= collection(this.firebase, 'usuarios');
    const retorno = collectionData(placeRef)
      return new Promise<boolean | null>((resolve, reject) => {
        retorno.subscribe((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc['clave'] === contraseña && doc['correo']=== this.auth.currentUser?.email) {
              resolve(true);
            }
          });
          resolve(null);
  })
 
  })}

}
