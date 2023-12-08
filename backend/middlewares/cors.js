// Массив доменов, с которых разрешены кросс-доменные запросы
const ALLOWED_CORS = [
  "https://jupiter.nomoredomainsmonster.ru",
  "http://jupiter.nomoredomainsmonster.ru",
  "http://158.160.60.163",
  "https://158.160.60.163",
  'http://localhost:3001',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  // console.log(origin);
  // console.log(ALLOWED_CORS.includes(origin));
  const requestHeaders = req.headers["access-control-request-headers"];
  // проверяем, что источник запроса есть среди разрешённых
  if (ALLOWED_CORS.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы из любого источника
    //res.header('Access-Control-Allow-Origin', "*");
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    //"Access-Control-Allow-Credentials", true
    //запрашивает браузер, показывать ли ответ JavaScript  коду клиентской части,
    //когда в качестве режима учетных данных запроса используется  include.
    res.header("Access-Control-Allow-Credentials", true);
  }

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  return next();
};