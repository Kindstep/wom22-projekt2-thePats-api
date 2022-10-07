module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("service", {
      service: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    });
  
    return Service;
  };