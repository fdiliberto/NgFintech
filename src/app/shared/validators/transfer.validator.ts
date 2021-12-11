import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormGroup} from '@angular/forms';
import {EMPTY, Observable, timer} from 'rxjs';
import {CardsService} from '../../api/cards.service';
import {map, switchMap} from 'rxjs/operators';
import {getBalance} from '../utils/balance.utils';

@Injectable({
    providedIn: 'root'
})
export class TransferValidator {
    constructor(private cardService: CardsService) {
    }

    checkAmount(cardId: string) {
        // debounce
        return timer(1000).pipe(
            switchMap(() => this.cardService.getCards().pipe(
                map(m => {
                    const c = m.filter(f => f._id === cardId);
                    if (c.length) {
                        return c[0];
                    }
                    return null;
                })
            ))
        );
    }

    transferValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            const fg = control as FormGroup;
            const amount = +fg.controls.amount?.value;
            const cardId = fg.controls.cardId?.value;

            if (cardId && amount > 0) {
                return this.checkAmount(cardId).pipe(
                    map(card => {
                        if (card) {
                            const total = getBalance(card.movements);
                            return (total < amount)
                                ? {amountUnavailable: 'Importo non disponibile per il trasferimento'}
                                : null;
                        }
                        return null;
                    }),
                )
            }
            return EMPTY;
        };
    }
}

