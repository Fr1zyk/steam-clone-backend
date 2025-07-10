const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Steam-Clone API',
            version: '1.0.0',
            description: 'Документация по REST-API платформы цифровой дистрибуции игр',
        },
        servers: [
            { url: `http://localhost:${process.env.PORT || 5000}` }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    // сканируем JSDoc-комментарии в файлах с роутами
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
