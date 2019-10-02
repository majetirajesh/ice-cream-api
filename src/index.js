
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import compression from 'compression';
import * as Sentry from '@sentry/node';

import routes from './routes';
import logger, { logStream } from './logger';

// Initialize Sentry
// https://docs.sentry.io/platforms/node/express/
Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';


app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

// This request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));
app.use(cors());
app.use(compression());
app.use(morgan('tiny', { stream: logStream }));
app.use(bodyParser.json());

// API Routes
app.use('/api', routes);


app.listen(app.get('port'), app.get('host'), () => {
  logger.info(`Server started at http://${app.get('host')}:${app.get('port')}/api`);
});

// Catch unhandled rejections
process.on('unhandledRejection', err => {
  logger.error('Unhandled rejection', err);

  try {
    Sentry.captureException(err);
  } catch (err) {
    logger.error('Raven error', err);
  } finally {
    process.exit(1);
  }
});

// Catch uncaught exceptions
process.on('uncaughtException', err => {
  logger.error('Uncaught exception', err);

  try {
    Sentry.captureException(err);
  } catch (err) {
    logger.error('Raven error', err);
  } finally {
    process.exit(1);
  }
});

export default app;