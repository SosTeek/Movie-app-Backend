import * as Sequelize from 'sequelize';

export interface InputGenreInterface {
  name: string;
}

export interface GenreInterface extends InputGenreInterface  {
  id: number;
}

export interface GenreModelInterface
  extends Sequelize.Model<GenreInterface, Partial<InputGenreInterface>>,
  GenreInterface {}