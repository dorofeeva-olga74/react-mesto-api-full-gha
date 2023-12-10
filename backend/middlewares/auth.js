const jwt = require("jsonwebtoken");
const {JWT_SECRET = "7472c8114dce9424984b33f9ba38c58b4ad3ab8e"} = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError.js');

module.exports = async (req, res, next) => {
  // Верификация токена
  let payload;
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new UnauthorizedError("Не правильные email или password");
    }
    const validTocken = token.replace("Bearer ", "");//отрезать Bearer
    //console.log(`validTocken: ${validTocken}`)
    payload = await jwt.verify(validTocken, process.env.NODE_ENV === 'production'? JWT_SECRET : "dev-secret");
    //console.log(`payload: ${payload}`)
  } catch (err) {
    if (err.message === "NotAutanticate") {
      return next(new UnauthorizedError("Необходима авторизация"));//401
    }
    if ((err.name = "JsonWebTokenError")) {
      return next(new UnauthorizedError("С токеном что-то не так"));//401
    } else {
      return next(err);
    }
  }
  // Добавление пейлоуда в объект запроса
  req.user = payload;
  next();
}