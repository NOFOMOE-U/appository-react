import { Controller, InternalServerErrorException } from '@nestjs/common'
import { ApiService } from './api-service'
// isAuthorized
// } from 'your-authentication-module'; // Import your authentication module
import errorMessages from '../middleware/permissions/error-messages'
import { UserService } from '../modules/user/user.service'
import { isAuthenticated } from './api-config/access-tier'
import { BodyContent, CustomRequestInit } from './requests/custom-request-init'
import { YourRequestObject } from './requests/custom-request-with-context'

@Controller('api') // Define the base route for API endpoints
export class ApiController {
  constructor(
    private readonly userService: UserService,
    private readonly apiService: ApiService,
    private readonly requestBody: BodyContent | null | undefined,
  ) {}

  getUsers(
    req: YourRequestObject<CustomRequestInit>,
    res: Response
  ) {
    try {
        if (!isAuthenticated(req.accessTier)) {
          throw new UnauthorizedException('Unauthorized')
        }
      
      if (req.accessTier !== undefined) {
          //map access tiers to UserWithAccessToken
          const users = this.apiService.getUsers(req, this.requestBody, this.requestBody, userAccesssTier)
          return res.status(200).json(users)
        }
    } catch (error) {
      return new InternalServerErrorException( 'Internal server error', errorMessages.SERVER_ERROR )
    }

    getTasks(req, res) {
      try {
        if (!isAuthenticated(req)) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        const tasks = this.apiService.getTasks(req.user);
        return res.status(200).json(tasks);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  
    createTask(req, res, taskData) {
      try {
        if (!isAuthenticated(req) || !isAuthorized(req.user, 'CREATE_TASK')) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        const createdTask = this.apiService.createTask(req.user, taskData);
        return res.status(201).json(createdTask);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  
    getProjects(req, res) {
      try {
        if (!isAuthenticated(req)) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        const projects = this.apiService.getProjects(req.user);
        return res.status(200).json(projects);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  
    createProject(req, res, projectData) {
      try {
        if (!isAuthenticated(req) || !isAuthorized(req.user, 'CREATE_PROJECT')) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        const createdProject = this.apiService.createProject(req.user, projectData);
        return res.status(201).json(createdProject);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  
    getProjectById(id: string, req, res) {
      try {
        if (!isAuthenticated(req)) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        const project = this.apiService.getProjectById(req.user, id);
        return res.status(200).json(project);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  
  }

  // Other methods
}
