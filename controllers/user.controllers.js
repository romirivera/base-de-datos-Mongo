const User = require('../models/usermodels');
const bcrypt = require('bcrypt');
const jwt = required('jsonwebtoken');
require('dotenv').config();

//crear un nuevo usuario
//req=request : tendriamos disponible info que envía el cliente
const createNewUser = async (req, res) => {
  const { name, email, password } = req.body; //es lo mismo que hacer: const name=req.body.name
  if (!name || !email || !password) {
    res.status(404).json({ message: 'Por favor, rellena todos los campos' });
    return;
  }

  try {
    //guarddar contraseña
    const salt = bcrypt.genSaltSyncd(); //define la dificultad de encriptado
    const passwordHash = bcrypt.hashSync(password, salt); //encripta la contraseña

    await User.create({
      //codigo asincrono //body
      name: name,
      email: email,
      password: passwordHash,
      rol: {
        type: string,
        default: 'user', //si no indica el rol, por defcto queda en user
        emun: ['user', 'admin'], // o es user o admin
      },
    });
    res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error de servidor al crear el usuario' });
    console.log(error);
  }
};

//hacer login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Se busca el registro en la colección de la base
    const FindUser = await User.findOne({ email: email });
    if (!FindUser) {
      return res.status(400).json({
        message: 'Ususario no encontrado',
      });
    }
    //comparar(verificar) la contraseña
    const passVerify = bcrypt.compareSync(password, findUser.password);
    if (!passVerify) {
      return res.status(400).json({
        message: 'Contraseña incorrecta',
      });
    }

    const token = jwt.sign(
      { id: findUser._id, userType: findUser },
      proces.env.SECRET_JWT,
      {
        expiresIn: '1h',
      }
    );
    //el segundo argumento es la firma que utilizo para firmarlo
    //pusimos que token expira en 1 hora
    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      })
      .json({
        message: 'Usuario logueado correctamente',
        data: {
          name: findUser.name,
          id: findUser._id,
          token: token,
        },
      });
  } catch (error) {
    res.status(500).jason({
      message: 'Error en el servidor',
    });
    console.log(error);
  }
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
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!User) {
      return res.status(400).json({
        message: 'Usuario no encontrado',
      });
    }
    res.status(200).json({
      message: 'usuario eliminado con éxito',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error de servidor',
    });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  const userList = await User.find({});
  res.status(200).json({ message: 'obtener todos los usuarios', data: userList });
};
// User.find permite traer todos los usuarios registrados

const getDataUser = async (req, res) => {
  try {
    const user = await user.findById(req.userId);
    res.status(200).json({
      message: 'Datos del usuario',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error de servidor' });
  }
};
const logout = (req, res) => {
  res
    .clearcookie('token', {
      httpOnly: true,
      secure: false,
    })
    .json({ message: 'Sesión cerrada' });
};

module.exports = {
  createNewUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getDataUser,
  logout,
};
