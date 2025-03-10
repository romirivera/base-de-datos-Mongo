require('dotenv').config();
const jwt = require('jsonwebtoken');

const authJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Acceso denegado, no hay token' });

  try {
    const decodedtoken = jwt.verify(token, process.env.SECRET_JWT);
    req.userId = decodedtoken.id;
    req.rol = decodedtoken.userType;
    next(); //para que continue con el sig middleware o controlador
  } catch (error) {
    res.status(500).json({ message: 'token no valido' });
  }
};
modules.exports = authJWT;
