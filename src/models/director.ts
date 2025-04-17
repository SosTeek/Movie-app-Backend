import * as Sequelize from 'sequelize';
import { Database } from '../config';
import { DirectorModelInterface } from '../interfaces';

const sequelize = Database.sequelize;

const Director = sequelize.define<DirectorModelInterface>(
	'directors',
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
		country: {
			type: Sequelize.STRING,
		},
		dob: {
			type: Sequelize.DATE,
		},
	},
	{
		timestamps: false,
	}
);

export default Director;
