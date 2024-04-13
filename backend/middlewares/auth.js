const jwt = require("jsonwebtoken");
require("dotenv").config();
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError.js');

module.exports = async function (req, res, next) {
  // Верификация токена
  let payload;
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new UnauthorizedError("Не правильные email или password");
    }
    const validTocken = token.replace("Bearer ", ""); //отрезать Bearer
    console.log(`validTocken: ${validTocken}`);
    payload = await jwt.verify(validTocken, NODE_ENV === 'production' ? JWT_SECRET : "dev-secret");
  } catch (err) {
    if (err.message === "NotAutanticate") {
      return next(new UnauthorizedError("Необходима авторизация")); //401
    }
    if ((err.name = "JsonWebTokenError")) {
      return next(new UnauthorizedError("С токеном что-то не так")); //401
    } else {
      return next(err);
    }
  }
  // Добавление пейлоуда в объект запроса
  req.user = payload;
  next(); // если ошибка 404 нужно убрать эту строчку
}