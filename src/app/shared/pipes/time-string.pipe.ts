import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'timeString'
})
export class TimeStringPipe implements PipeTransform {
    transform(hour: number): string {
        if (hour) {
            return `${hour < 10 ? '0' + hour : hour}:00`;
        }
        return '';
    }
}
