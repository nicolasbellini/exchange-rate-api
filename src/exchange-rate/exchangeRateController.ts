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
        return res.status(404).json({ error: 'Rate not found' });
    }
};

const deleteRate = async (req: Request, res: Response) => {
    let { source, target } = req.params;
    console.log(source, target);
    try {
        const result = await ExchangeRateSchema.deleteOne({ src: source, target: target });
        return res.status(200).json({
            result: result
        });
    } catch (error) {
        return res.status(404).json({ error: 'Rate not found' });
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

const getAllCurrencies = async (req: Request, res: Response) => {
    try {
        let result;
        await axios.get(`https://v6.exchangerate-api.com/v6/${config.api.key}/codes`).then((response) => (result = response.data));
        if (result.result == 'success') {
            let orderedResult = result.supported_codes.map(function (x) {
                return x[0];
            });
            return res.status(201).json({
                orderedResult
            });
        }
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
        throw error;
    }
}

async function updateAllRates() {
    try {
        const rates = await ExchangeRateSchema.find();
        rates.forEach(async function (rate) {
            getDataForRateAndSave(rate.source, rate.target);
        });
    } catch (error) {
        throw error;
    }
}

export default { createOrUpdateRate, getRate, updateAllRates, getAllRates, deleteRate, getAllCurrencies };
