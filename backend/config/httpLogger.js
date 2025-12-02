import pinoHttp from "pino-http";
import logger from "./logger.js";

const isProd = process.env.NODE_ENV === "production";

const httpLogger = pinoHttp({
  logger,
  customLogLevel: (res, err) => {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  redact: isProd
    ? ["req.headers", "req.remoteAddress", "req.remotePort", "req.cookies"]
    : [], // show full headers in dev
  customSuccessMessage: (res) => `Request completed with status ${res.statusCode}`,
  customErrorMessage: (err, res) => `Error occurred: ${err.message}`,
});

export default httpLogger;
