// admin\models\application_carrer.js
import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Amigo = sequelize.define('Amigo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  estado_civil: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  mascotas: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  tableName: 'amigos',
  timestamps: false,
});

export default Amigo;