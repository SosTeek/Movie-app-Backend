import { Request, Response } from 'express';
import { MovieService } from '../../services';
import { CategoryType } from '../../interfaces';

export class MovieController {
	public static async findAll(req: Request, res: Response): Promise<Response> {
		const page = req.query.page ? +req.query.page : 1 ;
		const limit = req.query.limit ? +req.query.limit : 10 ;
		const searchQuery = req.query.searchQuery as string;
		const categrory = req.query.category as string | undefined;
		const genreId = req.query.genreId ? req.query.genreId as string : undefined;

		// calculate your offset based on the page number and limit
		// Offset based pagination
		const offset = (page - 1) * limit;

		/*****
		 * 1. get genreId and categrory from req query.
		 * 2. send the genreId and categories to the movieService findAll method.
		 * 2. check if category has some value
		 * ** 2.1 if(false) do nothing
		 * ** 2.2 if(true) update the where variable with proper where condition
		 * Apply switch case
		 * 3. check if genreId has some value
		 * ** 3.1 if(false) do nothing
		 * ** 3.2 if(true) update the where variable with proper where condition
		 (* hint: check the searchQuery)
		 */
		
		const movies = await new MovieService().findAll({
			offset: offset,
			limit: limit,
			order: 'id',
			sort: 'asc',
			searchQuery: searchQuery,
			category: categrory as CategoryType,
			genreId: genreId
		});

		return res.status(200).json({
			success: true,
			status: 200,
			message: 'Movies fetched successfully.',
			data: movies,
		});
	}

	public static async create(req: Request, res: Response): Promise<Response> {
		const payload = req.body;

		if(req.file) {
			payload.thumbnailUrl = req.file.path;
		}

		const movie = await new MovieService().create(payload);

		return res.status(201).json({
			success: true,
			status: 201,
			message: 'Movie created successfully.',
			data: movie,
		});
	}

	public static async update(req: Request, res: Response): Promise<Response> {
		const id = parseInt(req.params.id);
		const data = req.body;

		const update = await new MovieService().update(id, data);
		if (update === false) {
			throw new Error(`Couldnot update movie with id ${id}`);
		}
		return res.status(200).json({
			success: true,
			status: 200,
			message: 'Movie updated successfully.',
		});
	}

	public static async delete(req: Request, res: Response): Promise<Response> {
		const id = parseInt(req.params.id);
		await new MovieService().delete(id);
		return res.status(200).json({
			success: true,
			status: 200,
			message: 'Movie deleted successfully.',
		});
	}
	public static async findOne(req: Request, res: Response): Promise<Response> {
		const movie = await new MovieService().findOne(parseInt(req.params.id));

		return res.status(200).json({
			success: true,
			status: 200,
			message: 'Movie fetched successfully.',
			data: movie,
		});
	}
}
