import { Controller } from '@nestjs/common'
import { ApiService } from './api-service'
// isAuthorized
// } from 'your-authentication-module'; // Import your authentication module
import errorMessages from '../middleware/permissions/error-messages'
import { UserService } from '../modules/user/user.service'
import { isAuthenticated, mapAccessTierToUserWithAccessToken } from './api-config/access-tier'
import { BodyContent, CustomRequestInit } from './requests/custom-request-init'
import { YourRequestObject } from './requests/custom-request-with-context'

@Controller('api') // Define the base route for API endpoints
export class ApiController {
  constructor(
    private readonly userService: UserService,
    private readonly apiService: ApiService,
    private readonly requestBody: BodyContent | null | undefined,
  ) {}

  getUsers(req: YourRequestObject<CustomRequestInit>, res: Response) {
    try {
      if (req.accessTier) {
        if (!isAuthenticated(req.accessTier)) {
          return res.status(401).json({ message: errorMessages.NOT_AUTHORIZED })
        }
        
      }
      if (req.accessTier !== undefined) {
          //map access tiers to UserWithAccessToken
          const  userAccesssTier = mapAccessTierToUserWithAccessToken(req.accessTier)
          const users = this.apiService.getUsers(userAccesssTier, this.requestBody)
          return res.status(200).json(users)
        }
    } catch (error) {
      return res.status(500).json({ message: errorMessages.SERVER_ERROR })
    }
  }

  // Other methods
}
