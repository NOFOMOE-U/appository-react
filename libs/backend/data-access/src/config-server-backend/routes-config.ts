//review code is the refactoring of server.ts
// config/routes-config.ts
import { PrismaService } from '@appository/backend/data-access'
import { YourRequestObject } from '@appository/backend/request-options'
import { UserService } from '@appository/backend/users'
import { NextFunction, Response } from 'express'
//todo update with connector
// import { Connectorrz } from '../context/context.utils'
import { APIRequestOptions, ApiRequestFunction, makeApiRequest } from '@appository/backend/api-system'
import { getRequestContext } from '@appository/backend/context-system'
import errorMessages from '../middleware/permissions/error-messages'
import { checkPermissions } from '../middleware/permissions/permissions-matrix'
import { MyOptions } from '../middleware/permissions/shield/my-options.interface'
import userRegistrationSchema from '../middleware/validation-yup-schemas/validate-registration'


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
        accessLevel: 'FREE',
      }
    }

    const accessLevel = {
      FREE: 'free',
      STANDARD: 'standard',
      PREMIUM: 'premium',
      ENTERPRISE: 'enterprise',
    }
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
  endpoint: string,
  req: APIRequestOptions,
  options: MyOptions,
  res: Response,
  apiRequestFunction: ApiRequestFunction,
  next: NextFunction,
) => {
  try {
    await makeApiRequest(endpoint, req, options, apiRequestFunction)

    res.status(200).json({ message: 'API request processed successfully' })
  } catch (error) {
    console.error('API request error:', error)
    // Handle error
    next(error)
  }
}

// ... define other routes
