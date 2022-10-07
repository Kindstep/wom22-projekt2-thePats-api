module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      date: {
        type: Sequelize.DATE
      },
      cabin: {
        type: Sequelize.STRING
      },
      service: {
        type: Sequelize.STRING
      },
      done: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Order;
  };