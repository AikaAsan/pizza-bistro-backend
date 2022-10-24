import {body} from 'express-validator';

export const registerValidation = [
    body('email', 'Please enter a valid email address.').isEmail(),
    body('password', 'Password must be min 5 symbols long').isLength({
        min: 5,
    }),
    body('fullName', 'This field is required.').isLength({ min: 3 }),
];
