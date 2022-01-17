import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import ExchangeRateSchema from './exchangeRateModel';

const createOrUpdateRate = async (req: Request, res: Response, next: NextFunction) => {
    let { src, trg } = req.body;

    try {
        const result = await getDataForRateAndSave(src, trg);
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
        if (result.length == 0) {
            return res.status(404).json('Rate not found');
        }
        return res.status(201).json({
            rate: result[0]
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

const getAllRates = async (req: Request, res: Response) => {
    try {
        const result = await ExchangeRateSchema.find();
        if (result.length == 0) {
            return res.status(404).json('No rates found');
        }
        return res.status(201).json({
            result
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

/**
 * @description Calls the api to get the exchange rate and then save it in our database
 * @param src
 * @param trg
 * @returns ExchangeRateSchema
 */
async function getDataForRateAndSave(src: String, trg: String) {
    try {
        let rt;
        await axios.get(`https://v6.exchangerate-api.com/v6/${config.api.key}/pair/${src}/${trg}`).then((response) => (rt = response.data.conversion_rate));
        return await ExchangeRateSchema.updateOne({ source: src, target: trg }, { rate: rt }, { upsert: true });
    } catch (error) {
        console.log(error);
    }
}

async function updateAllRates() {
    try {
        const rates = await ExchangeRateSchema.find();
        rates.forEach(async function (rate) {
            getDataForRateAndSave(rate.source, rate.target);
        });
    } catch (error) {
        console.log(error);
    }
}

export default { createOrUpdateRate, getRate, updateAllRates, getAllRates };
