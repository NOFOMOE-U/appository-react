//todo move into it's own foder
import { RequestOptions } from "./default-options"
import { ApiRequestFunction } from "./make-api-request"
    // Function to handle API requests with retry and throttling

    async function makeAPICallWithRetryThrottling(endpoint: ApiRequestFunction, requestOptions: RequestOptions) {
        const MAX_RETRIES = 3 // Maximum number of retries
        const RETRY_DELAY = 1000 // Time delay between retries in milliseconds
        const THROTTLE_DELAY = 500 // Throttling time between requests in milliseconds
        let retries = 0

        while (retries < MAX_RETRIES) {
            try {
                // Throttling mechanism to avoid overloading the API
                await delay(THROTTLE_DELAY)

                // Make the API call with provided request options
                const response = await makeAPICall(endpoint, requestOptions)

                // Process the response, transform data as needed
                const processedData = processAPIResponse(response)

                return processedData // Return the processed data
            } catch (error) {
                // Handle the error, log, retry logic if needed
                console.error(`Error occurred: ${error}`)

                retries++
                if (retries < MAX_RETRIES) {
                    // Wait for a delay before retrying
                    await delay(RETRY_DELAY)
                } else {
                    // Exceeded retries, handle the failure or throw an error
                    throw new Error(`API call failed after ${MAX_RETRIES} retries`)
                }
            }
        }

        // If all retries failed, return null or throw a final error
        return null
    }

// Function to simulate delay using Promises
export function delay(ms: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// Function to make the actual API call using Axios or Fetch
// Function to make the actual API call using Axios or Fetch
async function makeAPICall(endpoint: any, options: any, requestLibrary = 'axios') {
    let response;
    if (requestLibrary === 'axios') {
      const axios = require('axios'); // Import Axios when needed
      response = await axios(endpoint, options);
    } else if (requestLibrary === 'fetch') {
      response = await fetch(endpoint, options);
    } else {
      throw new Error('Invalid request library specified');
    }
  
    return response;
  }
  

// Function to process the API response
export function processAPIResponse(response: any) {
  // Process the response, transform data if necessary
  // Return the processed data
  return response.data
}





// //review notes documentation
// // Make an API call using Axios
// const axiosResponse = await makeAPICall('https://api.example.com/data', axiosOptions, 'axios');

// // Make an API call using Fetch
// const fetchResponse = await makeAPICall('https://api.example.com/data', fetchOptions, 'fetch');
