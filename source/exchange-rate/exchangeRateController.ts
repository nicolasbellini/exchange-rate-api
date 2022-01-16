import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import ExchangeRateSchema from './exchangeRateModel';

const saveExchangeRate = async (req: Request, res: Response, next: NextFunction) => {
    let { rate, source, target } = req.body;

    const exchangeRate = new ExchangeRateSchema({
        _id: new mongoose.Types.ObjectId(),
        rate,
        source,
        target
    });

    try {
        const result = await exchangeRate.save();
        return res.status(201).json({
            rate: result
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

export default { saveExchangeRate };
