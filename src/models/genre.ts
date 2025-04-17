import * as Sequelize from 'sequelize';
import { Database } from "../config";
import { GenreModelInterface } from '../interfaces';

const sequelize = Database.sequelize;

const Genre = sequelize.define<GenreModelInterface>(
  'genres',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Genre;