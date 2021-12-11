import {Movement} from './movements.model';

export interface Card {
    type: 'visa' | 'mastercard';
    name: string;
    surname: string;
    number: string;
    csc: string;
    owner: string;
    ownerId: string;
    amount: number;
    movements: Movement[];
    _id: string;
}
