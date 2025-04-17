import { GenreInterface, InputGenreInterface } from '../interfaces';
import Models from '../models';

export class GenreService {
	public async findAll(): Promise<GenreInterface[]> {
		const data = await Models.Genre.findAll();
		
		return data;
	}

	public async create(data: InputGenreInterface): Promise<GenreInterface> {
		const genre = await Models.Genre.create(data);

		return genre;
	}

	public async update(id: number, data: InputGenreInterface): Promise<boolean> {
		const update = await Models.Genre.update(data, {
			where: {
				id: id,
			},
		});
		return update[0] === 0 ? false : true;
	}

	public async delete(id: number) : Promise<number> {
    const deleted = await Models.Genre.destroy({
      where: {
        id: id,
      }
    });
    return deleted;
  }
}
