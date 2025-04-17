import { InputUserInterface, UserInterface } from '../interfaces';
import Models from '../models';

export class UserService {
	public async findOne(email: string): Promise<UserInterface | null> {
		const data = await Models.User.findOne({
			where: {
				email: email,
			},
		});
		return data;
	}

	public async create(data: InputUserInterface): Promise<UserInterface> {
		const user = await Models.User.create(data);
		return user;
	}
}
