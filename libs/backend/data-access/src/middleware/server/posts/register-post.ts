import { NextFunction, Response } from 'express';
import { YourRequestObject } from '../../../make-api/requests/custom-request-with-context';
import { app } from '../../../server';
import errorMessages from '../../permissions/error-messages';
import userRegistrationSchema from '../../validation-yup-schemas/validate-registration';

app.post('/register', (req: YourRequestObject<{}>, res: Response, next: NextFunction) => {
    const { body } = req;
    
    // Validate the user registration data
    userRegistrationSchema.validate(body)
      .then((validData) => {
        // Data is valid, proceed with user registration
        const user = {
          ...validData,
          accessTier: 'FREE'
        }
        // userController.register(validData);
        res.status(201).json({ message: 'User registered successfully' });
      })
      .catch((error) => {
        // Data is invalid, send an error response
        res.status(400).json({ error: errorMessages.invalidRegistration });
      });
  });
  



