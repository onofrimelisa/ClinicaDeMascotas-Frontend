import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol'
})
export class RolPipe implements PipeTransform {

  transform(rol: string): string {
    switch (rol) {
      case 'duenio':
        return 'Dueño';
      
      case 'veterinario':
        return 'Veterinario';

      case 'admin':
        return 'Administrador';
    
      default:
        return 'Error'
    }
  }

}
