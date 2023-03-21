import { DataTypes } from 'sequelize'
import database from '../config/db.js'


const PaisesPib = database.define('paises_pib', {
    // estructura de la tabla
    nombre_pais: {
        type: DataTypes.STRING(200),
        primaryKey: true,
        allowNull: false
    },
    pib_2019: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pib_2020: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

PaisesPib.belongsTo(Paises, { foreignKey: 'nombre' });

export default PaisesPib