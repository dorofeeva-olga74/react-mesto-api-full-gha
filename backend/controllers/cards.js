const Card = require("../models/Card.js");
const mongoose = require("mongoose");
const httpConstants = require("http2").constants;

const BadRequest = require("../errors/BadRequest.js");
const ForbiddenError = require("../errors/ForbiddenError.js");
const NotFoundError = require("../errors/NotFoundError.js");

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({})
    return res.send(cards);
  } catch (next) {
    return next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  // console.log(`name ${name}`)
  try {
    const newCard = await Card.create({ name, link, owner: req.user._id });
    // _id станет доступен
    //console.log(`newCard ${newCard}`)
    //console.log(`newCard: ${await newCard.save()}`)
    return res.status(httpConstants.HTTP_STATUS_CREATED).send(await newCard.save());
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequest("Переданы некорректные данные"));
    } else {
      return next(err);
    }
  }
}

module.exports.deleteCard = async (req, res, next) => {
  const objectID = req.params.cardId;
  await Card.findById(objectID)
    .populate(["likes", "owner"])
    .orFail(() => {
      throw new NotFoundError("Карточка не найдена");
    })
    .then((card) => {
      const owner = card.owner._id + '';
      //const owner = card.owner.toString();
      // console.log(`req.user._id = ${req.user._id}`)
      // console.log(`owner._id = ${owner}`)
      // console.log(req.user._id === owner)
      if (req.user._id === owner) {
        //console.log(`card = ${card}`)
        Card.deleteOne(card)
            .then(() => {
            return res.status(httpConstants.HTTP_STATUS_OK).send(card);
          })
          .catch(next);
      } else {
        return next(new ForbiddenError("Нет прав на удаление карточки"));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequest("Передан не валидный id"));
      } else {
        return next(err);
      }
    });
};
module.exports.likeCard = async (req, res, next) => {
  try {
    const likesCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
      //.populate(["likes", "owner"])
      .orFail(() => {
        throw new NotFoundError("Карточка не найдена");
      })
    return res.status(httpConstants.HTTP_STATUS_CREATED).send(await likesCard.save());
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequest("Передан не валидный id"));
    } else {
      return next(err);
    }
  }
}

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const dislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    //.populate(["likes", "owner"])
    if (!dislike) {
      throw new NotFoundError("Карточка не найдена");
    }
    return res.status(httpConstants.HTTP_STATUS_OK).send(await dislike.save());
  } catch (err) {
    if (err.message === "NotFound") {
      return next(new NotFoundError("Карточка не найдена"));
    }
    if (err.name === "CastError") {
      return next(new BadRequest("Передан не валидный id"));
    } else {
      return next(err);
    }
  }
}