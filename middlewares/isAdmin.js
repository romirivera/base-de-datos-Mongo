const isAdmin = (req, res, next) => {
  if (req.rol !== 'admin')
    return res.status(403).json({ message: 'Acceso denegado - no eres administrado' });
  next();
};

module.exports = isAdmin;
