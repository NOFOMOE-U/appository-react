import { BodyContent } from 'libs/backend/data-access/src/make-api/requests/custom-request-init';
import { CustomRequest } from "../../../../request-options/src/custom-request/custom-request";


interface UserBehaviorData {
  method: string;
  url: string;
  queryParameters: Record<string, string>;
  requestBody: BodyContent | null | undefined
  clientIP: string;
  // ...other properties

  timeZone: string;
  location: string;
  referrerURL: string;
  eventTimestamp: Date;
  activities: Record<string, any>;
  deviceInfo: Record<string, any>;
  sessionInfo: Record<string, any>;
  userPreferences: Record<string, any>;
  userRole: 'admin' | 'user' | 'manager';
  deviceType: 'desktop' | 'mobile' | 'tablet';
  connectionType: 'wifi' | 'cellular' | 'ethernet';
  interactionType: 'click' | 'scroll' | 'search' | 'update' | 'delete';
}



export function prepareBehaviorData(req: CustomRequest, res: Response): UserBehaviorData {
  const { method, originalUrl, query, body,

    requestBody,
    ip } = req;
  
    // Extract relevant information for behavior tracking

  const behaviorData: UserBehaviorData = {
    method,
    url: originalUrl,
    queryParameters: query,
    requestBody: requestBody,
    clientIP: ip,
    eventTimestamp: {} as Date,
    sessionInfo: {} as Record<string, any>,
    userPreferences: {} as Record<string, any>,
    activities: {} as Record<string, any>,
    deviceInfo: {} as Record<string, any>,
    deviceType: "desktop",
    location: "",
    userRole: "user",
    connectionType: "wifi",
    timeZone: "",
    interactionType: "click",
    referrerURL: "",
  };
  
    return behaviorData;
  }
  