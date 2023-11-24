// main.js
import * as APIKey from './make-api/api-key';
import * as APILogger from './make-api/api-logger';

// Example usage
const apiKey = APIKey.generateAPIKey();
console.log(`Generated API Key: ${apiKey}`);

const isValidKey = APIKey.validateAPIKey(apiKey);
console.log(`Is Valid API Key: ${isValidKey}`);

const endpoint = '/api/data';
const method = 'GET';
const response = '200 OK';
APILogger.logAPICall(endpoint, method, response);

APILogger.analyzeAPITraffic();
