import pinoHttp from 'pino-http';
import logger from './logger.js';

const httpLogger = pinoHttp({ logger });

export default httpLogger;
