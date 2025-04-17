import { Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import { CustomRequestInterface, UserInterface } from '../interfaces';

export class Guard {
	public static grantAccess(
		req: CustomRequestInterface,
		res: Response,
		next: NextFunction
	) {
		// fetch access token from the req.headers
		const accessToken = req.headers.authorization?.split('')[1];
		// check if access token exists
		if (!accessToken) {
			return res.status(500).json({
				success: false,
				message: 'Please provide an access token with your request headers.',
			});
		}
		// decode the provided access token
		const decodedToken = jwt.verify(accessToken, jwtSecret);
		// if( invalid access token ) return error response
		if (!decodedToken) {
			return res.status(500).json({
				success: false,
				message: 'Invalid or expired access token.',
			});
		}
		// if(valid access token ) next()
		req.user = decodedToken as UserInterface;
		next();
	}

	public static grantRole(role: string) {
		return (req: CustomRequestInterface, res: Response, next: NextFunction) => {
			if(req.user.role === role) {
				next();
			} else {
				return res.status(400).json({
					message: 'You are not authorized to perform this task!'
				})
			}
		}
	}

	

	// create an authorizarion middleware such that:
	// we pass the required role within the middleware for accessing the api endpoint.
	// the middleware checks if the user has the required role.
	// if has the required role, next();
	// if doesnot have required role, return error response.

  

}
