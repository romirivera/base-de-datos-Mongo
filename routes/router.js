const router = require('express/lib/router');

//actualizar datos del usuario
router.put('/update', updateUser);

//eliminar usuario
router.delete('/delete', deleteUser);
//obtener todos los usuarios
router.get('/users', getAllUsers);

module.exports = router;
