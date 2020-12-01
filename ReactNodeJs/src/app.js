import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.excepionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  excepionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}
// module.exports = new App().server;
export default new App().server;

//  para que o import possa funcionar execute o seguinte comando no yarn
// >yarn add sucrase nodemon -D
// PARA RODAR O PROGRAMA
// >yar sucrase-node src/server.js
// ACERTE TBM O NODEMOM
// -r executar um arquivo antes da aplicação --> no arquivo nodemom.json
// {
//  "execMap":{
//    "js" : "node -r sucrase/register"
//  }
// }
// para rodar o debug > yarn dev:debug
// yarn add eslint ===> serve para padronização do codigo. Para ativar use o comando: yarn eslint --init
// yarn add sequelize
// criar sequelizerc
// PARA CRIAR AS TABELAS com o sequelize
// yarn sequelize migration:create --name=create-users
// PARA GERARO HASH
// yarn add bcryptjs
// yarn sequelize migration:create --name=create--appointments
