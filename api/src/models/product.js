'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    gambar: DataTypes.STRING,
    tanggal: DataTypes.DATE
  }, {});
  product.associate = function(models) {
    product.hasMany(models.order, {foreignKey: 'product_id'})
  };
  return product;
};