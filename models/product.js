const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    link: DataTypes.STRING,
  }, {
    tableName: 'products',
    // underscored: true,
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Store,
      {
        foreignKey: "storeId",
        as: "Store"
      }  
    );
    Product.belongsTo(models.Category,
      {
        foreignKey: "categoryId",
        as: "Category"
      }  
    );
  }

  return Product
}

module.exports = Product;
