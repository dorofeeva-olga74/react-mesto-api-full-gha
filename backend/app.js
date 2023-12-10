const express = require("express");//
//Ключ заносят в переменные окружения в файл с расширением .env в корне проекта и
//Чтобы загрузить этот файл в Node.js, нужно установить в проект модуль dotenv
const dotenv = require("dotenv");
dotenv.config();
const { NODE_ENV, PORT, MONGO_URL } = process.env;
console.log(NODE_ENV); // production

const cors = require("./middlewares/cors");

const { requestLogger, errorLogger } = require("./middlewares/logger.js");

const mongoose = require("mongoose");

//'helmet' Заголовки безопасности можно проставлять автоматически// npm i
const helmet = require("helmet");

//'express-rate-limit' Используется для ограничения повторных запросов к общедоступным API
const rateLimit = require("express-rate-limit");

const { errors } = require("celebrate");
const router = require("./routes"); // импортируем роутеры
const app = express();

const NotFoundError = require("./errors/NotFoundError.js");
const ERROR_INTERNAL_SERVER = 500;//вынесены магические числа

// Слушаем 3000 порт
mongoose.connect(MONGO_URL || "mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
}).then(() => {
  console.log("Connected to MongoDB");
})
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100 // можно совершить максимум 100 запросов с одного IP
});

//мидлвэр
app.use(helmet());
app.use(express.json());

//Логгер запросов нужно подключить до всех обработчиков роутов:
app.use(cors);
//app.use(cors({origin: ['http://localhost:3000']}));
app.use(requestLogger); // подключаем логгер запросов
// подключаем rate-limiter
app.use(limiter);

// КРАШ-ТЕСТ сервера
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use("/", router); // запускаем роутер

// errors
app.use(errorLogger); // подключаем логгер ошибок
app.use(function (req, res, next) {
  return next(new NotFoundError("Переданы некорректные данные или такого маршрута несуществует"));
});
app.use(errors());// обработчик ошибок celebrate

// здесь обрабатываем все ошибки
app.use((err, req, res, next) => { // централизованный обработчик ошибок
  // если у ошибки нет статуса, выставляем 500 - ERROR_INTERNAL_SERVER
  const { statusCode = ERROR_INTERNAL_SERVER, message } = err;//500
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === ERROR_INTERNAL_SERVER
      ? "На сервере произошла ошибка"
      : message
  });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})