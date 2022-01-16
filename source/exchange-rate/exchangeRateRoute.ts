import express from 'express';
import controller from './exchangeRateController';

const router = express.Router();

router.post('/save', controller.saveExchangeRate);

export = router;
