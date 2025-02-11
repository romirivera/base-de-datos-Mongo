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
      name: name,
      email: email,
      password: password,
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

const updateUser = async (req, res) => {
  //recibir id del usuario obtendremos de los parametros de url(req)
  const { id } = req.params;

  // cliente va a mandar datos a actualizar (req)
  const { name, enail } = req.body;
  const dataUpdate = {
    name,
    email,
  };
  try {
    const user = await User.findByIdAndUpdate(id, dataUpdate);
    if (!User) {
      return res.status(400).json({
        message: 'Usuario no encontrado',
      });
    }
    res.status(200).json({
      message: 'Usuario actualizado',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error de servidor al actualizar el usuario' });
    console.log(error);
  }
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
// User.find permite traer todos los usuarios registrados
module.exports = { createNewUser, loginUser, updateUser, deleteUser, getAllUsers };
