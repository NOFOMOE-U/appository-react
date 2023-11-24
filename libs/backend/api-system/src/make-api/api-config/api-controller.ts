import { Controller, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ApiService } from '../api-config/api-service';
// isAuthorized
// } from 'your-authentication-module'; // Import your authentication module
import { MyContext } from '@appository/backend/context-system';
import { UserService, UserWithAccessToken } from '@appository/backend/users';
import { Response } from 'express-serve-static-core';
import { isAuthenticated } from 'libs/backend/data-access/src/interfaces/auth/access-level';
import errorMessages from 'libs/backend/data-access/src/middleware/permissions/error-messages';
import { MyOptions } from 'libs/backend/data-access/src/middleware/permissions/shield/my-options.interface';
import { APIRequestOptions, ApiRequestFunction } from '../make-api-request';
@Controller('api') // Define the base route for API endpoints
export class ApiController {
  constructor(
    private readonly userService: UserService,
    private readonly apiService: ApiService,
    private readonly requestBody: UserWithAccessToken,
  ) {}

  getUsers(
    endpoint: string,
    user: MyContext['user'],
    req: APIRequestOptions,
    res: Response,
    options: MyOptions,
    requestBody: MyContext['requestBody'],
    apiRequestFunction: ApiRequestFunction) {
    try {
      const accessLevel = this.userService.exposedUser?.accessLevel as string
      if (!isAuthenticated(accessLevel)) {
        throw new UnauthorizedException('Unauthorized')
      }

      if (accessLevel !== undefined) {
        //map access tiers to UserWithAccessToken
        const users = this.apiService.getUsers(endpoint, user, req, requestBody,  options, apiRequestFunction)

        return res.status(200).json(users)
      }
    } catch (error) {
      return new InternalServerErrorException('Internal server error', errorMessages.SERVER_ERROR)
    }

    // getTasks(req, res) {
    //   try {
    //     if (!isAuthenticated(req)) {
    //       return res.status(401).json({ message: 'Unauthorized' });
    //     }

    //     const tasks = this.apiService.getTasks(req.user);
    //     return res.status(200).json(tasks);
    //   } catch (error) {
    //     return res.status(500).json({ message: 'Internal server error' });
    //   }
    // }

    // createTask(req, res, taskData) {
    //   try {
    //     if (!isAuthenticated(req) || !isAuthorized(req.user, 'CREATE_TASK')) {
    //       return res.status(401).json({ message: 'Unauthorized' });
    //     }

    //     const createdTask = this.apiService.createTask(req.user, taskData);
    //     return res.status(201).json(createdTask);
    //   } catch (error) {
    //     return res.status(500).json({ message: 'Internal server error' });
    //   }
    // }

    // getProjects(req, res) {
    //   try {
    //     if (!isAuthenticated(req)) {
    //       return res.status(401).json({ message: 'Unauthorized' });
    //     }

    //     const projects = this.apiService.getProjects(req.user);
    //     return res.status(200).json(projects);
    //   } catch (error) {
    //     return res.status(500).json({ message: 'Internal server error' });
    //   }
    // }

    // createProject(req, res, projectData) {
    //   try {
    //     if (!isAuthenticated(req) || !isAuthorized(req.user, 'CREATE_PROJECT')) {
    //       return res.status(401).json({ message: 'Unauthorized' });
    //     }

    //     const createdProject = this.apiService.createProject(req.user, projectData);
    //     return res.status(201).json(createdProject);
    //   } catch (error) {
    //     return res.status(500).json({ message: 'Internal server error' });
    //   }
    // }

    // getProjectById(id: string, req, res) {
    //   try {
    //     if (!isAuthenticated(req)) {
    //       return res.status(401).json({ message: 'Unauthorized' });
    //     }

    //     const project = this.apiService.getProjectById(req.user, id);
    //     return res.status(200).json(project);
    //   } catch (error) {
    //     return res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
  }

  // Other methods
}