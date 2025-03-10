const router = require('express/lib/router');
const {
  loginUser,
  createNewUser,
  updateUser,
  deleteUser,
  getAllUsers,
  logout,
  getDataUser,
} = require('../controllers/user.controllers');
const authJWT = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

//crear un nuevo usuario
router.post('/register', createNewUser);

//hacer login
router.post('/login', loginUser);

//actualizar datos del usuario
router.put('/update/:id', updateUser);

//eliminar usuario
router.delete('/delete/:id', deleteUser);

//obtener todos los usuarios
router.get('/users', authJWT, isAdmin, getAllUsers); //ruta protegida
router.get('user.data', authJWT, (req, res) => {
  res.status(200).json({ message: 'Datos del usuario', data: req.user });
});
router.get('/user-data', authJWT, getDataUser);
//cerrar sesión
router.get('/logout', logout);

module.exports = router;
