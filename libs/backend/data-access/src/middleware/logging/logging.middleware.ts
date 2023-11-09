    import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';
import { CustomRequest } from '../../interfaces/user/custom-request';
import { UserBehaviorController } from '../../modules/user/user-behavior-controller';
import userBehaviorData from './logging-behavior';
    const { combine, timestamp, printf, json, splat, errors, simple, colorize } = format
    @Injectable()
    export class LoggingMiddleware implements NestMiddleware {
      userBehaviorController: UserBehaviorController = new UserBehaviorController()
      private logger = createLogger({
        level: 'info',
        format: combine(
          errors({ stack: true }),
          splat(),
          json()
        ),
        defaultMeta: { service: 'my-service' },
        transports: [
          new transports.File({ filename: 'error.log', level: 'error' }),
          new transports.File({ filename: 'warn.log', level: 'warn' }),
          new transports.File({ filename: 'warn.info', level: 'info' }),
          //creates an instance of the winston Console for stdout/stderr
          // greate for real-time debugging
          new transports.Console({
            format: combine(
              colorize(),
              simple(),
              timestamp(),
              printf(({ level, message, timestamp }) => {
                return `${timestamp} [${level.toUpperCase()}]: ${message}`
              }),
            ),
          })
        ],
      });

      private stats: Record<string, { success: number; failure: number }> = {}

      static createMiddleware(loggingMiddleware: LoggingMiddleware) {
        return async (req: CustomRequest, res: Response, next: NextFunction) => {
          const { method, originalUrl, query, body } = req;
          req.startTime = Date.now()

          res.on('finish', () => {
            const { statusCode } = res;
            const responseTime = new Date().getTime() - (req.startTime || 0)

            //Log response for: status code and time
            loggingMiddleware.logger.info(`Response ${statusCode} (${responseTime}ms)`)

            //update endpoint statistics
            const endpoint = `${method} ${originalUrl}`;
            if (statusCode >= 200 && statusCode < 400) {
              loggingMiddleware.incrementStats(endpoint, 'success')
            } else {
              loggingMiddleware.incrementStats(endpoint, 'failure')
            }

            
            
            // Example structure of user behavior data based on API config
            console.log(userBehaviorData);
            
            // Send the user behavior data to the server
            loggingMiddleware.userBehaviorController.trackUserBehavior(userBehaviorData);
          
          })
          next()
        }
      }

      private incrementStats(endpoint: string, type: 'success' | 'failure') {
        if(!this.stats[endpoint]){
          this.stats[endpoint] = {
            success: 0,
            failure: 0
          }
        }
        this.stats[endpoint][type]++
      }

      use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req
        const start = new Date().getTime()

        res.on('finish', () => {
          const responseTime = new Date().getTime() - start
          const logMessage = `Request ${method} ${originalUrl} ${res.statusCode} ${responseTime}ms`;
          if(res.statusCode >= 500) {
            this.logger.error(logMessage)
          }
          if (res.statusCode >= 300) {
            this.logger.warn(logMessage)
          } else {
            this.logger.info(logMessage)
          }
        })
        next()
      }

      

      getEndpointStat(){
        return this.stats
      }
    }


