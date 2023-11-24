import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';
import { CustomRequest } from '../../../../request-options/src/custom-request/custom-request';
import { CustomURLSearchParams } from '../../context/my-context';
import { UserBehaviorController } from '../../modules/user/user-behavior-controller';
import UserManagerService from '../../modules/user/user-manager';
import { prepareBehaviorData } from '../behavior/prepare-behavior-data';


const { combine, timestamp, printf, json, splat, errors, simple, colorize } = format
  @Injectable()
  export class LoggingMiddleware implements NestMiddleware {
    private userBehaviorController: UserBehaviorController

    constructor(
      
      userBehaviorController: UserBehaviorController,
      private readonly aquaService: initAqua,
      private readonly userManagerService: UserManagerService,
      private readonly url: CustomURLSearchParams
    ) {
      this.userBehaviorController = userBehaviorController;
      this.userManagerService = userManagerService;
    }

  
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
        new transports.File({ filename: 'combined.log' }) ,
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

    static creaateMiddelware(
      loggingMiddleware: LoggingMiddleware,
      userManagerService: UserManagerService,
    ) { 
      return async (req: CustomRequest, res: Response, next: NextFunction) => {
        userManagerService.trackUserBehavior(req, res, next);


        res.on('finish', async() => {
          
          const { ip, method, url, user } = req;
          const logData = {
            level: 'info',
            message: `${method} ${url} - ${user?.name || ip}`,
            timestamp: Date.now()
          };
  
          this.getEndpointStat(logData);
        })

        next();
      }
    }
    static getEndpointStat(logData: { level: string; message: string; timestamp: number; }) {
      throw new Error('Method not implemented.');
    }


      private stats: Record<string, { success: number; failure: number }> = {}

      static createMiddleware(loggingMiddleware: LoggingMiddleware) {
        return async (req: CustomRequest, res: Response, next: NextFunction) => {
          const { method, originalUrl, query, body } = req;
          const userBehaviorData = prepareBehaviorData(req, res)
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

      use(req: CustomRequest<unknown>, res: Response, next: NextFunction) {
        const { method, originalUrl } = req
        const start = new Date().getTime()

        res.on('finish', () => {
          const responseTime = new Date().getTime() - start
          const logMessage = `Request ${method} ${originalUrl} ${res.statusCode} ${responseTime}ms`;

          // Log user behavior data
          const userBehaviorData = prepareBehaviorData(req, res)
          
          // send the user behavior data to the service
          LoggingMiddleware.userBehaviorController(userBehaviorData, req)
          this.userBehaviorController.trackUserBehavior(userBehaviorData);
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
    static userBehaviorController(userBehaviorData: any, req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>) {
      throw new Error('Method not implemented.');
      
    }
    

     getEndpointStat(logData: LogData): void { 
      const { url, method } = logData;
      const endpoint = `${method} ${url}`;

      this.incrementStats(endpoint, 'success');;
    }
   
    }


    UserManagerService.prototype.trackUserBehavior = (req: CustomRequest, res: Response, next: NextFunction) => {
      const user = req.user
      const action = req.url
      const userBehaviorController= new UserBehaviorController()
      const url = require('url').URLSearchParams
      if (userBehaviorController) {
        userBehaviorController.trackUserBehavior(user, action)
      }
    
      next()
    }
    
    