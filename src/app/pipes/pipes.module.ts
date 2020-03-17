import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from "./image.pipe";
import { RolPipe } from './rol.pipe';



@NgModule({
  declarations: [
    ImagePipe,
    RolPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    ImagePipe,
    RolPipe
  ]
})
export class PipesModule { }
