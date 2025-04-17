import { Request, Response } from 'express';
import { GenreService } from '../../services';

export class GenreController {
	public static async findAll(req: Request, res: Response): Promise<Response> {
		const genres = await new GenreService().findAll()

		return res.status(200).json({
			success: true,
			status: 200,
			message: 'Genres fetched successfully.',
			data: genres,
		});
	}

	public static async create(req: Request, res: Response): Promise<Response> {
		const payload = req.body;
		const genre = await new GenreService().create(payload);

		return res.status(201).json({
			success: true,
			status: 201,
			message: 'Genre created successfully.',
			data: genre,
		});
	}

	public static async update(req: Request, res: Response): Promise<Response> {
		const id = parseInt(req.params.id);
		const data = req.body;

		const update = await new GenreService().update(id, data);
		if(update === false) {
			throw new Error(`Couldnot update genre with id ${id}`)	
		}
		return res.status(200).json({
			success: true,
			status: 200,
			message: 'Genre updated successfully.',
		});
	}

	public static async delete(req: Request, res: Response): Promise<Response> {
		const id = parseInt(req.params.id);
		await new GenreService().delete(id);
		return res.status(200).json({
			success: true,
			status: 200,
			message: 'Genre deleted successfully.',
		});
	}

}
