import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evento'
})
export class EventoPipe implements PipeTransform {

  transform(atributo: string): string {
    if (atributo == '' || atributo == null) {
      return 'No corresponde'
    }
    return atributo;
  }

}
