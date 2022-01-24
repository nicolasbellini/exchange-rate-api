import express from 'express';
import controller from './exchangeRateController';

const router = express.Router();

router.post('/createOrUpdate', controller.createOrUpdateRate);
router.get('/getRate/:source/:target', controller.getRate);
router.get('/getAllRates', controller.getAllRates);
router.delete('/deleteRate/:source/:target', controller.deleteRate);
router.get('/getAllCurrencies', controller.getAllCurrencies);

export = router;
