import { DataTypes } from 'sequelize'
import database from '../config/db.js'


const PaisesDataWeb = database.define('paises_data_web', {
    nombre_pais: {
        type: DataTypes.STRING(200),
        primaryKey: true,
        allowNull: false
    },
    accion: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    timestamps: false
})

PaisesDataWeb.belongsTo(Paises, { foreignKey: 'nombre' })

export default PaisesDataWeb