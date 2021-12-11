import {Movement} from '../../models/movements.model';

export const getBalance = (movs: Movement[]) => {
    return movs.reduce((acc, current) => acc + (current.amount * (current.type === 'out' ? -1 : 1)), 0);
}
