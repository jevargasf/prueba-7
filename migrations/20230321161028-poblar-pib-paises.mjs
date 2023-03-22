import Paises from '../models/Paises.js'
import PaisesPib from '../models/Paises_pib.js'
import PaisesDataWeb from '../models/Paises_data_web.js'



export default {

  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(Paises);
    await queryInterface.createTable(PaisesPib);
    await queryInterface.createTable(PaisesDataWeb);

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
