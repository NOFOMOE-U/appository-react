//review code is the refactoring of server.ts
// config/routes-config.ts
import { PrismaService, UserService, YourRequestObject } from '@appository/backend/data-access'
import { NextFunction, Response, Request } from 'express'
import { getRequestContext } from '../context/context.utils'
import { ApiRequestFunction, makeApiRequest } from '../make-api/make-api-request'
import errorMessages from '../middleware/permissions/error-messages'
import { checkPermissions } from '../middleware/permissions/permissions-matrix'
import { UserController } from '../modules/user/user.controller'
import userRegistrationSchema from '../middleware/validation-yup-schemas/validate-registration'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

export const protectedRoute = async (req: YourRequestObject<{}>, res: Response, next: NextFunction) => {
  try {
    // Get user from context
    const user = getRequestContext()

    // Check permissions
    const allowed = await checkPermissions(user.id, req.route, req.method)

    if (!allowed) {
      return next({
        status: 403,
        message: 'Forbidden',
      })
    }

    // Route is allowed, continue processing request
    next
  } catch (error) {
    next(error)
  }
}

export const userRegistrationRoute = async (
  req: YourRequestObject<{}>,
  res: Response,
  next: NextFunction,
  prismaService: PrismaService,
  userService: UserService,
) => {
  try {
    // Validate the user registration data
    if (req) {
      const { body } = req
      // Validate the user registration data
      const validData = await userRegistrationSchema.validate(body)
      const user = {
        // Removed reference to validData
        accessLevel: 'FREE',
      }
    }

    const accessLevel = AccessLevel
    const prismaService = new PrismaService()
    const userService = new UserService(prismaService, accessLevel)
    const userController = new UserController(userService)

    // Removed call to register with validData
    return next({
      status: 403,
      message: 'User already has an account',
    })

    // Data is valid, proceed with user registration
    // Call your user registration logic or controller function
  } catch (error: any) {
    // Data is invalid, send an error response
    const validationErrors = error.inner.map((err: any) => ({
      field: err.path,
      message: err.message,
    }))
    res.status(400).json({ error: errorMessages.invalidRegistration, validationErrors })
  }
}

// Define other routes similarly
export const apiRequestRoute = async (
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response,
  next: NextFunction,
  apiRequestFunction: ApiRequestFunction,
) => {
  try {
    await makeApiRequest(req, res, next, apiRequestFunction)

    res.status(200).json({ message: 'API request processed successfully' })
  } catch (error) {
    console.error('API request error:', error);
    // Handle error
    next(error)
  }
}

// ... define other routes
