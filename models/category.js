const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING
  }, { 
    underscored: true,
    tableName: 'categories'
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product,
      {
        foreignkey: "categorId",
        as: "products"
      })
  }

  return Category
}

module.exports = Category