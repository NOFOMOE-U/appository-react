import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, json, splat, errors, simple, colorize } = format;

export function getLogger() {
  return createLogger({
    level: 'info',
    format: combine(errors({ stack: true }), splat(), json()),
    defaultMeta: { service: 'my-service' },
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'warn.log', level: 'warn' }),
      new transports.File({ filename: 'warn.info', level: 'info' }),
      new transports.Console({
        format: combine(
          colorize(),
          simple(),
          timestamp(),
          printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
          })
        )
      })
    ]
  });
}
