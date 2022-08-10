import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personPipe'
})
export class PersonPipe implements PipeTransform {

  transform(value: any[], searchString:string) {
    if(!searchString){
      return value;
    }

    return value.filter(i=>{
      const name = i.name.toLowerCase().toString().includes(searchString.toLowerCase())
      const address = i.address.toLowerCase().toString().includes(searchString.toLowerCase())
      const gsm = i.gsm.toLowerCase().toString().includes(searchString.toLowerCase())
      const surname = i.surname.toLowerCase().toString().includes(searchString.toLowerCase())
      return (name + address + gsm + surname)
    })
  }
}
