import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import cors from 'cors';

import { http, env } from '../config';

const port = process.env.PORT || http.port;

import authorize from './middlewares/authorize';
import schema from './schemas';
import domain from './domain';
import { getCalendar, getGroupbuys, getRSSfeed } from './endpoints';
import fs from 'fs';
import log from '../lib/logger';

log.info('setting up server');

const app = express();

// REST endpoints
app.get('/calendar', getCalendar)
app.get('/groupbuys', getGroupbuys)
app.get('/rss', getRSSfeed)

const graphqlServer = graphqlExpress((req, res) =>
  ({ schema, context: { domain, viewer: authorize(req, res) } })
)

app.use('/graphql', cors(), bodyParser.json(), graphqlServer);

// only start graphiql in development mode
if (env === 'development') {
  log.debug('started graphiql');
  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
} else {
  app.listen(port, () => log.info('started server on port', port));
}

export default function start() {
  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  app.listen(port, () => log.info('started server on port', port));
}