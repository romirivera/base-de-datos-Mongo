const app = require('./app');
const { dbConnection } = require('./database/conexion');
const port = 8080;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
dbConnection();
