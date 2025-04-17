import { Router } from 'express';

import { exceptionHandler, Validator } from '../../middlewares';
import { AuthController } from '../controllers';
import { loginValidator, signupValidator } from '../../validators';

const authRoutes = Router();

authRoutes.post(
	'/signup',
	exceptionHandler(Validator.check(signupValidator)),
	exceptionHandler(AuthController.signup)
);

authRoutes.post(
	'/login',
	exceptionHandler(Validator.check(loginValidator)),
	exceptionHandler(AuthController.login)
);

export default authRoutes;
