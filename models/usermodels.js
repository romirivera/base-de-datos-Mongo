const { Schema, model } = mongoose;

//creacion del Schema
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});
//definición del modelo
const User = model('User,userSchema');
module.exports = User;
