require('dotenv').config();
const mongoose = require('mongoose');
//codigo para conectar a la base de datos
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error en la conexion a la base de datos:', error);
  }
};
module.exports = { dbConnection };
