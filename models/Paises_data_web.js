import { DataTypes } from 'sequelize'
import database from '../config/db.js'

const PaisesDataWeb = database.define('paises_data_web', {
    nombre_pais: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    accion: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    timestamps: false
})

//PaisesDataWeb.belongsTo(Paises)

export default PaisesDataWeb