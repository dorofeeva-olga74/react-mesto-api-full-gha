[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# react-mesto-api-full
Учебный проект выполненный в рамках курса "Веб-разработчик" от Яндекс Практикум.
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями:
* авторизации и регистрации пользователей, 
* редактирование профиля,
* операции с карточками и пользователями,
* лайки/дизлайки   

Адрес репозитория: https://github.com/dorofeeva-olga74/react-mesto-api-full-gha

## Ссылки на проект

IP <158.160.60.163>

Frontend https://jupiter.nomoredomainsmonster.ru

Backend https://api.jupiter.nomoredomainsmonster.ru

### Функциональность проекта

- Backend:
  - В проекте созданы схемы и модели пользователей и карточек с контентом:
    - `card` — схема карточки с контентом
    - `user` — схема пользователя
  - В проекте созданы эндпоинты:
    - `/cards` — обрабатывает:
      - GET запросы — отдаёт все карточки из БД
      - POST запросы — создаёт новую карточку с контентом
    - `/cards/:cardId` — обрабатывает DELETE запросы, удаляет карточку по `cardId`
    - `/cards/:cardId/likes` — обрабатывает:
      - PUT запросы — добавляет лайк карточке с контентом
      - DELETE запросы — удаляет лайк карточке с контентом
    - `/signin` — обрабатывает POST запросы, производит аутентификацию пользователя
    - `/signup` — обрабатывает POST запросы, производит регистрацию пользователя
    - `/users` — обрабатывает:
      - GET запросы — отдаёт всех пользователей из БД
      - POST запросы — создаёт нового пользователя
    - `/users/:userId` — обрабатывает GET запросы, отдаёт пользователя по `userId`
    - `/users/me` — обрабатывает:
      - GET запросы — отдаёт информацию о текущем пользователе
      - PATCH запросы — обновляет информацию о пользователе
      - DELETE запросы — производит выход пользователя, с удалением JWT-токена из Cookie
    - `/users/me/avatar` — обрабатывает PATCH запросы, обновляет аватар пользователя
  - Созданы мидлвары:
    - Централизованной обработки ошибок
    - Авторизации пользователя
    - Ограничитель количества запросов (защита от DDoS атак)
    - Поддержки CORS запросов, включая обработку предварительных запросов
    - Логирования запросов и ошибок
  - Производится валидация поступающих данных:
    - до передачи информации контроллерам с помощью joi и celebrate
    - на уровне схем с помощью validator и встроенных методов mongoose
- Frontend:
  - Возможность регистрации и аутентификации пользователя
  - Возможность редактировать информацию о пользователе (установить имя пользователя, информацию «о себе», аватар)
  - Возможность создавать карточки мест (добавить\удалить карточку места, поставить\снять лайк карточке)
  - Возможность просматривать детальную фотографию карточки
  