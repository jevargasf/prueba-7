import Paises from "./Paises.js";
import PaisesPib from "./Paises_pib.js";
import PaisesDataWeb from "./Paises_data_web.js";



const defineAssociations = (Paises, PaisesPib, PaisesDataWeb) => {
    // relaciones entre Paises y PaisesPib
    Paises.hasOne(PaisesPib, { foreignKey: 'nombre_pais' });
    PaisesPib.belongsTo(Paises, { foreignKey: 'nombre_pais' });

    // relaciones entre Paises y PaisesDataWeb
    Paises.hasOne(PaisesDataWeb, { foreignKey: 'nombre_pais' });
    PaisesDataWeb.belongsTo(Paises, { foreignKey: 'nombre_pais' });
}

export default defineAssociations