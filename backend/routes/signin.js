const { login } = require("../controllers/users.js");
const { Joi, celebrate, errors } = require("celebrate");

// создадим express router
const signinRouter = require("express").Router();

// Здесь роутинг
signinRouter.post("/", celebrate({
  // валидируем тело запроса
    body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

signinRouter.use(errors());// обработчик ошибок celebrate
// экспортируем его
module.exports = signinRouter; // экспортировали роутер