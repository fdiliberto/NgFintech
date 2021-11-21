import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {

    transform(maxTime: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24): number[] {
        const times: number[] = [];
        for (let i = 1; i <= maxTime; i++) {
            times.push(i);
        }
        return times;
    }

}
