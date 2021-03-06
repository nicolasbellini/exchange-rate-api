import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IExchangeRate from './exchangeRateInterface';

const ExchangeRateSchema: Schema = new Schema(
    {
        rate: { type: Number, required: true },
        source: { type: String, required: true },
        target: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

ExchangeRateSchema.post<IExchangeRate>('save', function () {
    logging.info('Mongo', 'Exchange rate updated: ', this);
});

export default mongoose.model<IExchangeRate>('ExchangeRate', ExchangeRateSchema);
