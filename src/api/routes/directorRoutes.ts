import { Router } from 'express';

import { DirectorController } from '../controllers';
import { exceptionHandler, Guard } from '../../middlewares';
import { RoleEnum } from '../../enums';

const directorRoutes = Router();

directorRoutes.get('/', exceptionHandler(DirectorController.findAll));
directorRoutes.get('/:id', exceptionHandler(DirectorController.findOne));

directorRoutes.post(
	'/',
	exceptionHandler(Guard.grantAccess),
	exceptionHandler(DirectorController.create)
);

directorRoutes.patch(
	'/:id',
	exceptionHandler(Guard.grantAccess),
	exceptionHandler(Guard.grantRole(RoleEnum.admin)),
	exceptionHandler(DirectorController.update)
);

directorRoutes.delete(
	'/:id',
	exceptionHandler(Guard.grantAccess),
	exceptionHandler(Guard.grantRole(RoleEnum.admin)),
	exceptionHandler(DirectorController.delete)
);

export default directorRoutes;
