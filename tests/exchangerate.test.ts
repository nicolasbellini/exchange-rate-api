import router from '../src/app';

import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
import 'mocha';
import { response } from 'express';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Exchange rate tests', () => {
    it('should request a rate and save it on the DB', async () => {
        let res;
        await chai
            .request(router)
            .post('/api/exchangeRate/createOrUpdate')
            .send({ src: 'USD', trg: 'UYU' })
            .then((response) => (res = response));
        expect(res).to.have.status(201);
    });

    it('should request a rate and save it on the DB', () => {
        return chai
            .request(router)
            .get('/api/exchangeRate/getRate/USD/UYU')
            .then((res) => {
                console.log(res.body);
                expect(res).to.have.status(201);
                expect(res.body.rate.source).to.equal('USD');
                expect(res.body.rate.target).to.equal('UYU');
            });
    });
});
