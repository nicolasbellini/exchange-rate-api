import { createOrUpdateRate, getRate, getAllRates } from './rates';

const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Exchange rate API - Documentation',
        description: 'Save and consult exchange rates for any currency',
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    servers: [
        {
            url: 'http://localhost:1337/',
            description: 'Local Server'
        },
        {
            url: 'https://exchange-rate-back.herokuapp.com/',
            description: 'Heroku Server'
        }
    ],
    tags: [
        {
            name: 'Rates'
        }
    ],
    paths: {
        '/api/exchangeRate/createOrUpdate': {
            post: createOrUpdateRate
        },
        '/api/exchangeRate/getRate/{source}/{target}': {
            get: getRate
        },
        '/api/exchangeRate/getAllRates': {
            get: getAllRates
        }
    }
};

export { apiDocumentation };
