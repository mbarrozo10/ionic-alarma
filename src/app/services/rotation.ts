import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RotationService {

    constructor() {
        
     }
 
    private alpha = new BehaviorSubject<string>(''); // Valor inicial vacío
    alpha$ = this.alpha.asObservable();

  actualizarAlpha(idioma: string) {
    this.alpha.next(idioma);
  }

  private beta = new BehaviorSubject<string>(''); // Valor inicial vacío
    beta$ = this.beta.asObservable();

  actualizarBeta(idioma: string) {
    this.beta.next(idioma);
  }

  private gamma = new BehaviorSubject<string>(''); // Valor inicial vacío
    gamma$ = this.gamma.asObservable();

  actualizarGama(idioma: string) {
    this.alpha.next(idioma);
  }
  }
  