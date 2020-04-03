import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from "./image.pipe";
import { RolPipe } from './rol.pipe';
import { EventoPipe } from './evento.pipe';



@NgModule({
  declarations: [
    ImagePipe,
    RolPipe,
    EventoPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    ImagePipe,
    RolPipe,
    EventoPipe
  ]
})
export class PipesModule { }
