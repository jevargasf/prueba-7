import Paises from "../models/Paises.js";
import PaisesPib from "../models/Paises_pib.js";
import PaisesDataWeb from "../models/Paises_data_web.js";
import database from "../config/db.js";



// consulta inner join para petición get filtrando registros con accion = '0'

const getPaises = async (req, res) => {
    const { page, pageSize } = req.query
    const limit = parseInt(pageSize) || 10
    const offset = (parseInt(page) - 1)*limit

    const rows = await Paises.findAll({
        include: [PaisesPib, { model: PaisesDataWeb,
            where: {
                accion: '1'
            }
        }]
,
        limit,
        offset
    })
    
    const count = await PaisesDataWeb.count({
        where: {
            accion: '1'
        }
    })

    res.json({
        data: rows,
        count
    })
}

// consulta INSERT INTO para petición post

const postPaises = async (req, res) => {
try {
    // verificar si registro existe en la bbdd
    const registroAgregar = await PaisesDataWeb.findOne( {
        where: { nombre_pais: req.body.nombre}
    })
    if (registroAgregar === null) {
       const t = await database.transaction()

    // instanciar transacción
    // recibir data body y formatear para ingresar
    const dataPaises = {
        nombre: req.body.nombre,
        continente: req.body.continente,
        poblacion: parseInt(req.body.poblacion)
    }
    const dataPaisesPib = {
        nombre_pais: req.body.nombre,
        pib_2019: parseInt(req.body.pib_2019),
        pib_2020: parseInt(req.body.pib_2020)
    }
    const dataPaisesDataWeb = {
        nombre_pais: req.body.nombre,
        accion: "1"
    }
        // crear instancia para recibir los datos en los modelos
        const paises = await Paises.create(dataPaises, { transaction: t })
        const paisesPib = await PaisesPib.create(dataPaisesPib, { transaction: t })
        const paisesDataWeb = await PaisesDataWeb.create(dataPaisesDataWeb, { transaction: t })


        // guardar cambios
        await paises.save()
        await paisesPib.save()
        await paisesDataWeb.save()

        await t.commit()

        res.status(201).json({ mensaje: "Registro creado exitosamente." })
    } else {
        registroAgregar.dataValues.accion = '1'
        await PaisesDataWeb.update(registroAgregar.dataValues, {
            where: {
                id: registroAgregar.dataValues.id 
            }
        })
        console.log(registroAgregar.dataValues)

        res.status(201).json({ mensaje: "Registro actualizado exitosamente. Presione 'Agregar un registro' si desea ingresar más datos." })
        }
    } catch (err) {
        await t.rollback()
        console.log('Error: ', err)
    }
}

// consulta DELETE con parámetro

const deletePaises = async (req, res) => {
    try {
        console.log(req.params)
        // verificar si registro existe en bbdd

        const registroBorrar = await PaisesDataWeb.findOne( {
            where: { nombre_pais: req.params.nombre}
        })
        if (registroBorrar === null) {
            console.log("No se encontró")
            res.json({ mensaje: "No se encontró el registro. Por favor, intente nuevamente." })
        } else {
            registroBorrar.dataValues.accion = '0'
            await PaisesDataWeb.update(registroBorrar.dataValues, {
                where: {
                    id: registroBorrar.dataValues.id 
                }
            })
            res.json( { mensaje: "El registro se eliminó exitosamente." })
        }
    } catch (err) {
        console.log('Error:', err)
    }
}

export { getPaises, postPaises, deletePaises }