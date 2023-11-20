import * as yup from 'yup'

export const validateUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
})