import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import { http, env } from '../config';

import authorize from './middlewares/authorize';
import schema from './schemas';
import domain from './domain';
import { getCalendar, getGroupbuys } from './endpoints';
import fs from 'fs';
import log from '../lib/logger';

log.info('setting up server');

const app = express();

// REST endpoints
app.get('/calendar', getCalendar)
app.get('/groupbuys', getGroupbuys)

const graphqlServer = graphqlExpress((req, res) =>
  ({ schema, context: { domain, viewer: authorize(req, res) } })
)

app.use('/graphql', bodyParser.json(), graphqlServer);

// only start graphiql in development mode
if (env === 'development') {
  log.debug('started graphiql');
  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
};

export default function start() {
  app.listen(http.port, () => log.info('started server on port', http.port));
}