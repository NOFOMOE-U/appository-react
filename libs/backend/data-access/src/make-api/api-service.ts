import { Injectable, Logger } from '@nestjs/common';
import { MyContext } from '../context/my-context';
import { UserService } from '../modules/user/user.service'; // Import your user service
import { ApiRequestFunction, makeApiRequest } from './make-api-request'; // Import your API request function
import { CustomRequestWithContext } from './requests/custom-request-with-context';
// Import your API
@Injectable()
export class ApiService {

  private readonly logger = new Logger(ApiService.name)
  constructor(
    private readonly userService: UserService,
    private readonly apiRequestFunction: ApiRequestFunction) { }
    // private readonly behaviorService: BehaviorTrackingService 

  async getUsers(endpoint: string, user: MyContext['user'], req: CustomRequestWithContext<MyContext>, requestBody: MyContext['requestBody']) {
    try {
      // Perform any necessary authentication or authorization checks here
      // ...

      // Make an API request using your custom logic
      const endpointSelected = await this.userService.getApiUrl(endpoint);
      const users = await makeApiRequest(endpointSelected, req, this.apiRequestFunction)

      // Process the response data or perform additional operations
      // ...

      return users
    } catch (error) {
      this.logger.error('Error fetching users', error)
      throw new Error('Failed to fetch users')
    }
  }
  // Define other service methods for handling different API interactions
}
