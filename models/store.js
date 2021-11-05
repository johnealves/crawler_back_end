
const Store = (sequelize, DataTypes) => {
  const Store = sequelize.define("Store", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, { 
    undercored: true,
    tableName: 'stores'
  })

  Store.associate = (models) => {
    Store.hasMany(models.Product,
      {
        foreignkey: "storeId",
        as: "products"
      })
  }

  return Store;
}

module.exports = Store;