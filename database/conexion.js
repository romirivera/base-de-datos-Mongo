const mongoose = require('mongoose');
//codigo para conectar a la base de datos
const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/back-end-users17', {
      userNewUrlParser: true,
      userUnifiedTopology: true,
    });
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error en la conexion a la base de datos:', error);
  }
};
module.exports = { dbConnection };
