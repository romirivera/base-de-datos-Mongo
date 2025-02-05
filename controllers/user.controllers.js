const User = require('../models/usermodels');

//crear un nuevo usuario
//req=request : tendriamos disponible info que envía el cliente
const createNewUser = async (req, res) => {
  const { name, email, password } = req.body; //es lo mismo que hacer: const name=req.body.name
  if (!name || !email || !password) {
    res.status(404).json({ message: 'Por favor, rellena todos los campos' });
    return;
  }

  try {
    await User.create({
      //codigo asincrono //body
      name: 'Juan',
      email: 'email',
      password: '12312',
    });
    res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error de servidor al crear el usuario' });
    console.log(error);
  }
};

//hacer login
const loginUser = (req, res) => {
  res.send('Login de usuario');
};

module.exports = { createNewUser, loginUser };
