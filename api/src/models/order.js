'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    customer_name: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    keterangan: DataTypes.STRING
  }, {});
  order.associate = function(models) {
  order.belongsTo(models.product, { foreignKey: 'product_id'})
    // associations can be defined here
  };
  return order;
};