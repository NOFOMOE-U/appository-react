import * as yup from 'yup'

export const userSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmedPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
})