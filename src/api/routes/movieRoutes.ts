import { Router } from 'express';

import { MovieController } from '../controllers';
import { exceptionHandler, Multer } from '../../middlewares';

const movieRoutes = Router();

movieRoutes.get('/', exceptionHandler(MovieController.findAll));
movieRoutes.post(
	'/',
	exceptionHandler(new Multer().uploadSingle('file')),
	exceptionHandler(MovieController.create)
);

movieRoutes.patch('/:id', exceptionHandler(MovieController.update));
movieRoutes.delete('/:id', exceptionHandler(MovieController.delete));

movieRoutes.get('/:id', exceptionHandler(MovieController.findOne));

export default movieRoutes;
