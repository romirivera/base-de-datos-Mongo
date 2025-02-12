const router = require('express/lib/router');
const {
  loginUser,
  createNewUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require('../controllers/user.controllers');
const authJWT = require('../middlewares/auth');

//crear un nuevo usuario
router.post('/register', createNewUser);

//hacer login
router.post('/login', loginUser);

//actualizar datos del usuario
router.put('/update/:id', updateUser);

//eliminar usuario
router.delete('/delete/:id', deleteUser);

//obtener todos los usuarios
router.get('/users', authJWT, getAllUsers); //ruta protegida

module.exports = router;
