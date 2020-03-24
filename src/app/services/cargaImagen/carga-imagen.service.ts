import { Injectable, EventEmitter } from '@angular/core';

// Firebase
import * as firebase from 'firebase'; 

import { IFoto } from 'src/app/interfaces/IFoto';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenService {
  
  url$ = new EventEmitter<String>();

  constructor() { }

  
  cargarFoto( foto: IFoto, carpeta: string ){
    const storageRef = firebase.storage().ref();
  
    //creo tarea de subida
    const uploadTask: firebase.storage.UploadTask =
                storageRef.child(`${ carpeta }/${ foto.nombreArchivo }`)
                    .put( foto.archivo );
                
    //ejecuto tarea
    uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {},
      (error) => {},
      () => {
        console.log('Imagen cargada correctamente');
        uploadTask.snapshot.ref.getDownloadURL().then(
        (onfullfilled:any) => {
          console.log('Promesa... La url es: ' + onfullfilled);
          foto.url = onfullfilled;
          this.url$.emit(onfullfilled);
        },
        (onrejected:any) => {
          console.log('Promesa... La descarga de url fue fallida');
        }
        )
      }
    );

  
  }



}
