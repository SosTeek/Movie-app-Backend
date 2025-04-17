import { Database } from "../config";
import * as Sequelize from 'sequelize';
const sequelize = Database.sequelize;
import { RoleEnum } from "../enums";
import { UserModelInterface } from "../interfaces";

const User = sequelize.define<UserModelInterface>("users", {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM(RoleEnum.admin, RoleEnum.user),
    allowNull: false,
    defaultValue: RoleEnum.user,
  }
}, {
  timestamps: false,
});

export default User;
