import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserService } from '../../services';
import { jwtSecret } from '../../config';

export class AuthController {
	public static async signup(req: Request, res: Response): Promise<Response> {
		const userData = req.body;
		const userExists = await new UserService().findOne(userData.email);

		if (userExists) {
			return res.status(500).json({
				message: `User with email: ${userData.email} already exists!`,
				success: false,
			});
		}
		const hashedPassword = await bcrypt.hash(userData.password, 12);
		const user = await new UserService().create({
			name: userData.name,
			email: userData.email,
			password: hashedPassword,
			role: userData.role,
		});

		return res.status(200).json({
			message: 'Signup successful. You can proceed to login.',
			success: true,
			data: user,
		});
	}

	public static async login(req: Request, res: Response): Promise<Response> {
		const userData = req.body;
		const userExists = await new UserService().findOne(userData.email);

		if (!userExists) {
			return res.status(500).json({
				message: `Invalid email: ${userData.email}`,
				success: false,
			});
		}

		const doesPasswordMatch = await bcrypt.compare(
			userData.password,
			userExists.password
		);
		if (!doesPasswordMatch) {
			return res.status(500).json({
				message: `Invalid Password`,
				success: false,
			});
		}

		const accessToken = jwt.sign(
			{
				id: userExists.id,
				email: userExists.email,
				name: userExists.name,
				role: userExists.role,
			},
			jwtSecret,
			{ expiresIn: '1d' }
		);

		return res.status(200).json({
			message: 'User Logged in successfully.',
			success: true,
			data: {
				accessToken,
			},
		});
	}
}
