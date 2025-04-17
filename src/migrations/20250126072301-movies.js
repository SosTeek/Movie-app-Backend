'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable('movies', {
			id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imdbScore: {
        type: Sequelize.DECIMAL(2,1),
        defaultValue: 0.0,
        allowNull: false,
      },
      directorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'directors',
          key: 'id'
        }
      },
      actors: {
        // 'Salman Khan, Sarukh Khan'
        type: Sequelize.STRING,
        allowNull: false,
      },
      genreId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'genres',
          key: 'id'
        }
      },
      description: {
        type: Sequelize.TEXT,
      },
      thumbnailUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      embedVideoUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avgRatings: {
        type: Sequelize.DECIMAL(2,1),
        defaultValue: 0.0,
        allowNull: false,
      },
      totalRatings: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      duration: {
        type: Sequelize.STRING,
      },
      releasedAt: {
        type: Sequelize.DATE,
      }
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
    await queryInterface.dropTable('movies');
  },
};
