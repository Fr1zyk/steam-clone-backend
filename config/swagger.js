// config/swagger.js
const path         = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi    = require('swagger-ui-express');

const serverUrl = process.env.SWAGGER_SERVER_URL || `http://localhost:${process.env.PORT||5000}`;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title:       'Steam Clone API',
            version:     '1.0.0',
            description: 'Документация REST API для Steam Clone',
        },
        servers: [
            { url: serverUrl, description: 'API server' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type:   'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id:        { type: 'integer' },
                        email:     { type: 'string' },
                        nickname:  { type: 'string' },
                        avatarUrl: { type: 'string' }
                    }
                },
                Game: {
                    type: 'object',
                    properties: {
                        id:          { type: 'integer' },
                        title:       { type: 'string' },
                        developer:   { type: 'string' },
                        description: { type: 'string' },
                        price:       { type: 'number' }
                    }
                },
                Purchase: {
                    type: 'object',
                    properties: {
                        id:        { type: 'integer' },
                        userId:    { type: 'integer' },
                        gameId:    { type: 'integer' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Review: {
                    type: 'object',
                    properties: {
                        id:        { type: 'integer' },
                        userId:    { type: 'integer' },
                        gameId:    { type: 'integer' },
                        rating:    { type: 'integer' },
                        comment:   { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Wishlist: {
                    type: 'object',
                    properties: {
                        id:      { type: 'integer' },
                        userId:  { type: 'integer' },
                        gameId:  { type: 'integer' }
                    }
                },
                Friend: {
                    type: 'object',
                    properties: {
                        id:       { type: 'integer' },
                        userId:   { type: 'integer' },
                        friendId: { type: 'integer' }
                    }
                },
                Chat: {
                    type: 'object',
                    properties: {
                        id:        { type: 'integer' },
                        fromId:    { type: 'integer' },
                        toId:      { type: 'integer' },
                        message:   { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Gift: {
                    type: 'object',
                    properties: {
                        id:      { type: 'integer' },
                        fromId:  { type: 'integer' },
                        toId:    { type: 'integer' },
                        gameId:  { type: 'integer' },
                        status:  { type: 'string', enum: ['pending','accepted','rejected'] }
                    }
                },
                Notification: {
                    type: 'object',
                    properties: {
                        id:        { type: 'integer' },
                        userId:    { type: 'integer' },
                        type:      { type: 'string' },
                        text:      { type: 'string' },
                        read:      { type: 'boolean' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                }
            }
        },
        security: [
            { bearerAuth: [] }
        ]
    },
    apis: [path.join(__dirname, '..', 'routes', '*.js')]
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
