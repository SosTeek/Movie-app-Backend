import { DirectorInterface, InputDirectorInterface } from '../interfaces';
import Models from '../models';

export class DirectorService {
	public async findAll(): Promise<DirectorInterface[]> {

		const data = await Models.Director.findAll();

		return data;
	}

	public async findOne(id: number): Promise<DirectorInterface> {
		const data = await Models.Director.findByPk(id)

		if (!data) {
			throw new Error(`Director doesnot exist for id: ${id}`);
		}

		return data;
	}

	public async create(
		data: InputDirectorInterface
	): Promise<DirectorInterface> {
		const genre = await Models.Director.create(data);

		return genre;
	}

	public async update(
		id: number,
		data: InputDirectorInterface
	): Promise<boolean> {
		const update = await Models.Director.update(data, {
			where: {
				id: id,
			},
		});
		return update[0] === 0 ? false : true;
	}

	public async delete(id: number): Promise<number> {
		const deleted = await Models.Director.destroy({
			where: {
				id: id,
			},
		});
		return deleted;
	}
}
