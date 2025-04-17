import { Router } from 'express';

import { GenreController } from '../controllers';
import { exceptionHandler, Validator } from '../../middlewares';
import { createGenre } from '../../validators';

const genreRoutes = Router();

genreRoutes.get('/', exceptionHandler(GenreController.findAll));

genreRoutes.post(
	'/',
	exceptionHandler(Validator.check(createGenre)),
	exceptionHandler(GenreController.create)
);

genreRoutes.patch('/:id', exceptionHandler(GenreController.update));
genreRoutes.delete('/:id', exceptionHandler(GenreController.delete));

export default genreRoutes;
