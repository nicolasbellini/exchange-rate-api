const mongoose = require('mongoose');
import logging from '../src/config/logging';
import ExchangeRateSchema from '../src/exchange-rate/exchangeRateModel';

describe('User Model Test', () => {
    let db;

    // It's just so easy to connect to the MongoDB Memory Server
    // By using mongoose.connect
    beforeAll(async () => {
        db = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
    });

    it('save a rate with correct values', async () => {
        const validRate = new ExchangeRateSchema({ rate: 1, origen: 'USD', target: 'DAI' });
        const savedRate = await validRate.save();

        expect(savedRate._id).toBeDefined();
        expect(savedRate.rate).toBe(validRate.rate);
        expect(savedRate.source).toBe(validRate.source);
        expect(savedRate.target).toBe(validRate.target);
    });

    it('save a rate if it doesnt exist yet', async () => {});
});
