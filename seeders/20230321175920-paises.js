/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('paises', [{
       nombre: 'Luxemburgo',
       continente: 'Europa',
       poblacion: 602005
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
  }
};
