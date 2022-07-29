import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../models/company';

@Pipe({
  name: 'companyFilter'
})
export class CompanyFilterPipe implements PipeTransform {

  transform(value: Company[], filterText:string): Company[] {
    return filterText?value.filter((p:Company)=>p.isActive.toString().toLowerCase().indexOf(filterText)!==-1):value;
  }

}
