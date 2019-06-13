const expres = require('express');

const routes = new expres.Router();

// MIDDLEWARE, interceptador de chamadas do servidor. ( a rota)
routes.get('/', (req,response) => {
    return response.send(`Olá! ${req.query.name}`);
});

module.exports = routes;