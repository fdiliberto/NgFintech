import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, truncateAt: number): unknown {
        if (value && value.length > truncateAt) {
            return `${value.substr(0, truncateAt)}...`;
        }
        return value;
    }
}
