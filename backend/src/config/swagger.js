// backend/src/config/swagger.js

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const url = process.env.DB_HOST || "localhost";
const port = process.env.PORT || 3000;
const swaggerApiDocs = '/api-docs'

// Chave de segurança do "Usuario 00"
const jwt_user_login = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3NGQ1ODcwLWMxNmQtNGUyYy05NGUzLWE5NWE3YjI1ZTk1OSIsIm5vbWUiOiJVc3VhcmlvIDAwIiwiZW1haWwiOiJ1c3VhcmlvQGVtYWlsLmNvbSIsImlhdCI6MTczOTgxOTA1MywiZXhwIjoxNzM5ODIyNjUzfQ.g0K9gIikKmQhP7iSm5uI3lXKgRn75viBHSnlZZ1tTwc"

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gerenciamento de Tarefas',
            version: '1.0.0',
            description: 'Documentação da API para gerenciamento de tarefas',
        },
        servers: [
            {
                url: `http://${url}:${port}`,
                description: 'Servidor de Desenvolvimento',
            },
        ],
        components: {
            securitySchemes: {
              BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: `${jwt_user_login}`
                //description: "Insira o token JWT no formato Bearer {token}",
              },
            },
        },
        security: [
            { 
                BearerAuth: [] 
            }
        ],
    },
    apis: ["./src/routes/*.js", "./src/controllers/*.js"]
};

const swaggerDocs = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use(swaggerApiDocs, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    console.log(`Swagger configurado em http://${url}:${port}${swaggerApiDocs}`);
};

module.exports = setupSwagger;
