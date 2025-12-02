import pinoHttp from "pino-http";
import logger from "./logger.js";

const isProd = process.env.NODE_ENV === "production";

const httpLogger = pinoHttp({
  logger,

  // Set log levels based on response
  customLogLevel: (res, err) => {
    if (err || res.statusCode >= 500) return "error"; // server errors
    if (res.statusCode >= 400) return "warn";        // client errors
    return "info";                                    // normal requests
  },

  // Redact sensitive info in production
  redact: isProd
    ? [
        "req.headers.authorization", // hide auth tokens
        "req.headers.cookie",        // hide cookies
        "req.remoteAddress",         // optional privacy
        "req.remotePort"             // optional privacy
      ]
    : [], // show all headers in dev

  // Custom messages for request completion
  customSuccessMessage: (res) => `Request completed with status ${res.statusCode}`,

  // Custom messages for errors, clean and minimal
  customErrorMessage: (err) => `Error occurred: ${err.message}`,
});

export default httpLogger;
