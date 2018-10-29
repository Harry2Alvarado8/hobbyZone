import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {FromEventTarget} from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;

  usuario: any = {
    nombrecompleto: {
      nombre: "Harry",
      apellido: "Alvarado"
    },
    correo: "harry.alvarado@up.ac.pa",
    pasatiempos: ["Correr", "Dormir", "Comer"]
  }

  constructor() {

    console.log(this.usuario);

    this.forma = new FormGroup({

      'nombrecompleto': new FormGroup({
          'nombre': new FormControl(
            '',
            [
              Validators.required,
              Validators.minLength(3)
            ]),
          'apellido': new FormControl(
            '',
            [
              Validators.required,
              this.noHerrera
            ])
        }),
      'correo': new FormControl('',
              [
                Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$")
              ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),

      'password1': new FormControl('',Validators.required),
      'password2': new FormControl()
    });

    // setear valores en el formulario
      //this.forma.setValue(this.usuario);
      this.forma.controls['password2'].setValidators([
        Validators.required,
        this.noIgual.bind(this.forma)
        /*
          como el this se encuentra fuera de contexto
          lo que realizamos es un bind para que el objeto
          forma se pueda funcionar en la función noIgual
        */
      ])
  }

  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(new FormControl('', Validators.required))
  }


  noHerrera(control:FormControl): {[s:string]:boolean} {
    if(control.value === "herrera"){
      return {
        noherrera:true
      }
    }

    return null;
  }

  noIgual(control:FormControl): {[s:string]:boolean} {
    let forma:any = this;

    if( control.value !== forma.controls['password1'].value){
      return {
        noiguales:true
      }
    }

    return null;
  }

  guardarCambios(){
    console.log(this.forma.value);
    console.log(this.forma);

    /*
      forma nº1 de reseterar valores
        this.forma.reset(this.usuario);
    */
    /*
      forma nº2 de reseterar valores, individualmente.
    */
        this.forma.reset({
          nombrecompleto: {
            nombre: "",
            apellido: ""
          }, correo: ""
        });
    }

}
