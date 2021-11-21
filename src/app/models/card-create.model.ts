export interface CardCreate {
    type: 'visa' | 'mastercard';
    name: string;
    surname: string;
    number: string;
    cvv: string;
}
