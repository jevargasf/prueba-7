import Paises from "../models/Paises.js";
import PaisesPib from "../models/Paises_pib.js";
import PaisesDataWeb from "../models/Paises_data_web.js";
import defineAssociations from "../models/associations.js";
import database from "../config/db.js";

// consulta SELECT ALL para petición get ** falta hacer inner join (y poblar tablas para eso)

const getPaises = (req, res) => {
    Paises.findAll({
        include: [PaisesPib, PaisesDataWeb]
    })
        .then(data => {
            res.json(data)
        })
}

// consulta INSERT INTO para petición post

const postPaises = async (req, res) => {
    // instanciar transacción
    const t = await database.transaction()

    try{
        // crear instanciar para recibir los datos en los modelos
        const paises = await Paises.create(req.body[0].paises, { transaction: t })
        const paisesPib = await PaisesPib.create(req.body[0].paises_pib, { transaction: t })
        const paisesDataWeb = await PaisesDataWeb.create(req.body[0].paises_data_web, { transaction: t })

        // asociar instancias
        //paises.setPaisesPib(paisesPib)
        //paises.setPaisesDataWeb(paisesDataWeb)

        // guardar cambios
        await paises.save()
        await paisesPib.save()
        await paisesDataWeb.save()

        await t.commit()

        res.status(201).json({ mensaje: "Registro creado exitosamente." })
    } catch (err) {
        await t.rollback()
        console.log('Error: ', err)
    }
}

// consulta DELETE con parámetro

const deletePaises = (req, res) => {
    res.send("manejador delete")
}

export { getPaises, postPaises, deletePaises }