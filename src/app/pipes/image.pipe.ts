import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo?: string): any {

    if (!img) {

      if (tipo == 'pet') {
        return '/assets/img/no-pet.jpg';
        
      }

      return '/assets/img/no-profile.jpg';

    }
    return img;
  }

}
