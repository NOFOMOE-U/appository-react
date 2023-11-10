import { Controller } from '@nestjs/common';
import { ApiService } from './api-service';
    // isAuthorized
// } from 'your-authentication-module'; // Import your authentication module
import { UserService } from '../modules/user/user.service';
import { BodyContent, CustomRequestInit } from './requests/custom-request-init';
import { YourRequestObject } from './requests/custom-request-with-context';

@Controller('api') // Define the base route for API endpoints
export class ApiController {
    constructor(
        private readonly userService: UserService,
        private readonly apiService: ApiService,
        private readonly requestBody: BodyContent | null | undefined

    ) { }

  getUsers(req: YourRequestObject<CustomRequestInit>, res: Response) {
    try {
      if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      // Fix the type error by changing the parameter type
      const users = this.apiService.getUsers(req, this.requestBody)
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  // Other methods
}
