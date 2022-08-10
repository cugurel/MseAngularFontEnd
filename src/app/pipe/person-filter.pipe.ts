import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../models/person';

@Pipe({
  name: 'personFilter'
})
export class PersonFilterPipe implements PipeTransform {

  transform(value: Person[], filterText:string): Person[] {
    return filterText?value.filter((p:Person)=>p.isActive.toString().toLowerCase().indexOf(filterText)!==-1):value;
  }

}
