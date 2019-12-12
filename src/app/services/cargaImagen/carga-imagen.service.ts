import { Injectable } from '@angular/core';

// Firebase
import * as firebase from 'firebase'; 

import { IFoto } from 'src/app/interfaces/IFoto';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenService {

  constructor() { }

  
  cargarFoto( foto: IFoto, carpeta: string ){
    const storageRef = firebase.storage().ref();
  
    //creo tarea de subida
    const uploadTask: firebase.storage.UploadTask =
                storageRef.child(`${ carpeta }/${ foto.nombreArchivo }`)
                    .put( foto.archivo );
  
    //ejecuto tarea
    uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => console.log('Snapshot', snapshot),
          (error) => console.log('Error al subir: ', error),
          () => {
            console.log('Imagen cargada correctamente');
            uploadTask.snapshot.ref.getDownloadURL().then(
  
              (onfullfilled:any) => {
                console.log('Promesa... La url es: ' + onfullfilled);
                foto.url = onfullfilled;
                return foto.url; //guardar referencia
              },
              (onrejected:any) => {
                console.log('Promesa... La descarga de url fue fallida');
                return '';
              }
            )//fin promesa
          } //fin callback OK
    )//fin ejecución ON

  }



}
