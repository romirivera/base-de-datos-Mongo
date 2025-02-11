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

//actualizar datos del usuario
const updateUser = (req, res) => {
  res.send('Actualizar datos del usuario');
};

//eliminar un usuario
const deleteUser = (req, res) => {
  res.send('Eliminar usuario');
};

//get all users
const getAllUsers = async (req, res) => {
  const userList = await User.find({});
  res.status(200).json({ message: 'obtener todos los usuarios', data: userList });
};

module.exports = { createNewUser, loginUser, updateUser, deleteUser, getAllUsers };
