import { Document } from 'mongoose';

export default interface IExchangeRate extends Document {
    rate: number;
    source: string;
    target: string;
}
