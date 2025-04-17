import express from 'express';
import bodyParser from 'body-parser';
import genreRoutes from './genreRoutes';
import directorRoutes from './directorRoutes';
import movieRoutes from './movieRoutes';
import authRoutes from './authRoutes';
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

router.use('/genres', genreRoutes);
router.use('/directors', directorRoutes);
router.use('/movies', movieRoutes);
router.use('/auth', authRoutes);

export default router;