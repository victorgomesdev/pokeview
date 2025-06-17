import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'capitalize'
})
export class CapitalizeNamePipe implements PipeTransform {
  transform(value: string) {
    
    const text = value.split('')
    const first = text.shift()

    return first?.toLocaleUpperCase() + text.join('')
  }
}