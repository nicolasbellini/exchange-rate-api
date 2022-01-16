import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import ExchangeRateSchema from './exchangeRateModel';

const createOrUpdateRate = async (req: Request, res: Response, next: NextFunction) => {
    let { src, trg, rt } = req.body;

    await axios.get(`https://v6.exchangerate-api.com/v6/${config.api.key}/pair/${src}/${trg}`).then((response) => (rt = response.data.conversion_rate));
    console.log(rt);

    try {
        const result = await ExchangeRateSchema.updateOne({ source: src, target: trg }, { rate: rt }, { upsert: true });
        return res.status(201).json({
            rate: result
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

const getRate = async (req: Request, res: Response) => {
    try {
        const result = await ExchangeRateSchema.find({ source: req.params.source, target: req.params.target });
        if (result == []) {
            return res.status(404).json({
                rate: 'Rate not found'
            });
        }
        return res.status(201).json({
            rate: result
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

export default { createOrUpdateRate, getRate };
