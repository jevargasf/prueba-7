import { DataTypes } from 'sequelize'
import database from '../config/db.js'
import PaisesDataWeb from './Paises_data_web.js'
import PaisesPib from './Paises_pib.js'


const Paises = database.define('paises', {
    // estructura de la tabla
    nombre: {
        type: DataTypes.STRING(200),
        primaryKey: true,
        allowNull: false
    },
    continente: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    poblacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

/*Paises.hasOne(PaisesPib, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
PaisesPib.belongsTo(Paises, { foreignKey: 'nombre' })
Paises.hasOne(PaisesDataWeb, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
PaisesDataWeb.belongsTo(Paises, { foreignKey: 'nombre' })*/


export default Paises