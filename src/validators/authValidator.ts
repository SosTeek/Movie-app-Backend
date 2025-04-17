import Joi from 'joi';
import { RoleEnum } from '../enums';

const signupValidator = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	role: Joi.string().valid(RoleEnum.admin, RoleEnum.user).optional(),
});

const loginValidator = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export { signupValidator, loginValidator };