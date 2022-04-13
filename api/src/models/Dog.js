const { DataTypes } = require("sequelize");
const { nanoid } = require("nanoid");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    id: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: true,
      defaultValue: nanoid(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lifespan: {
      type: DataTypes.STRING,
      defaultValue: "1 - 10",
      set(value) {
        this.setDataValue("lifespan", value + " years");
      },
    },
  });
};
