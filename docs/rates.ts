const createOrUpdateRate = {
    tags: ['Rates'],
    description: 'Save or update an exchange rate',
    operationId: 'createOrUpdateRate',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        src: {
                            type: 'string',
                            example: 'USD'
                        },
                        trg: {
                            type: 'string',
                            example: 'UYU'
                        }
                    }
                }
            }
        }
    },
    responses: {
        '201': {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            rate: {
                                type: 'object',
                                properties: {
                                    acknowledged: {
                                        type: 'boolean'
                                    },
                                    modifiedCount: {
                                        type: 'number'
                                    },
                                    upsertedId: {
                                        type: 'string'
                                    },
                                    upsertedCount: {
                                        type: 'number'
                                    },
                                    matchedCount: {
                                        type: 'number'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal Server Error'
                            }
                        }
                    }
                }
            }
        }
    }
};

const getRate = {
    tags: ['Rates'],
    description: 'Return a rate',
    operationId: 'getRate',
    parameters: [
        {
            name: 'source',
            in: 'path',
            description: 'Rate source',
            required: true,
            type: 'string'
        },
        {
            name: 'target',
            in: 'path',
            description: 'Rate target',
            required: true,
            type: 'string'
        }
    ],
    responses: {
        '200': {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string',
                                example: '61e46d176e14c56fec8d8cc7'
                            },
                            source: {
                                type: 'string',
                                example: 'USD'
                            },
                            target: {
                                type: 'string',
                                example: 'UYU'
                            },
                            createdAt: {
                                type: 'string',
                                example: '2022-01-16T19:08:07.429Z'
                            },
                            updatedAt: {
                                type: 'string',
                                example: '2022-01-17T18:07:03.610Z'
                            },
                            rate: {
                                type: 'number',
                                example: '44.699'
                            }
                        }
                    }
                }
            }
        },
        '404': {
            description: 'Not found',
            content: {
                'application/json': {}
            }
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal Server Error'
                            }
                        }
                    }
                }
            }
        }
    }
};

export { createOrUpdateRate, getRate };
