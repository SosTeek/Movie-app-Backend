import { Op } from 'sequelize';
import {
	MovieInterface,
	InputMovieInterface,
	ArgsMovieInterface,
} from '../interfaces';
import Models from '../models';

export class MovieService {
	public async findAll(args: ArgsMovieInterface): Promise<MovieInterface[]> {
		let where;
		
		if (args.searchQuery) {
			where = {
				title: {
					[Op.like]: `%${args.searchQuery}%`,
				},
			};
		}

		if(args.category) {
			switch (args.category){
				case 'latest':  
					// condition: released after 2024
					const date = '2024-01-01'
					where = {
						...where,
						releasedAt: {
							[Op.gt] : date,
						}
					}
					break;
				case 'top-rated':
					// condition: the movies whose rating is over 8.00
					 const baseRating = '8.00';
					 where = {
						...where,
						avgRatings: {
							[Op.gte]: baseRating,
						}
					 }
					break;
				case 'popular':
					// condition: the movies whose imdb rating is over 8.00
					const baseImdbScore = '7.00';
					where = {
						...where,
						imdbScore: {
							[Op.gte]: baseImdbScore,
						}
					 }
					break;
			}
		}

		if(args.genreId) {
			where = {
				...where,
				genreId: parseInt(args.genreId)
			}
		}

		const data = await Models.Movie.findAll({
			offset: args.offset,
			limit: args.limit,
			order: [[args.order, args.sort]],
			where,
		});

		return data;
	}

	public async findOne(id: number): Promise<MovieInterface> {
		const data = await Models.Movie.findByPk(id);

		if (!data) {
			throw new Error(`Movie doesnot exist for id: ${id}`);
		}

		return data;
	}

	public async create(data: InputMovieInterface): Promise<MovieInterface> {
		const movie = await Models.Movie.create(data);

		return movie;
	}

	public async update(id: number, data: InputMovieInterface): Promise<boolean> {
		const update = await Models.Movie.update(data, {
			where: {
				id: id,
			},
		});
		return update[0] === 0 ? false : true;
	}

	public async delete(id: number): Promise<number> {
		const deleted = await Models.Movie.destroy({
			where: {
				id: id,
			},
		});
		return deleted;
	}
}
