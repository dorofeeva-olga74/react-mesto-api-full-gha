export class Api {
  constructor({url}) {
    this._url = url;// или options.url    
  }
  //приватный метод ответа сервера
  _getResponse(response) {
    //console.log(response)
    if (response.ok) {
      return response.json();//дай мне ответ в формате json()
    }
    return Promise.reject(new Error("Возникла ошибка"));
  }

  _request(url, options) {
   return fetch(url, {...options, authorization: `Bearer ${localStorage.getItem('token')}`}).then(this._getResponse)
  }
  
  //инициировать карточки //получение данных с сервера
  getInitialCards(url) { //getAllToddos
    return this._request(`${this._url}/cards`, { headers: {authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json' }})
  }

 //удалить карточку
  deleteCardApi(id) {
    const options = {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,'Content-Type': 'application/json' },
      method: 'DELETE'
    }
    return this._request(`${this._url}/cards/${id}`, options)
  }  
  //создать карточку
  createCardApi(data) {
    const options = {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data)
    }
    return this._request(`${this._url}/cards`, options)
  }  
  /*профиль*/
  //получение данных пользователя с сервера
  getProfileInfo() {
    return this._request(`${this._url}/users/me`, { headers: {authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json' }})
  }
  //отправка данных на сервер   
  changeUserData(data) {
    const options = {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      })
    }
    return this._request(`${this._url}/users/me`, options)
  }
  //отправка данных на сервер   
  changeAvatarUrl(data) {
    const options = {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({ avatar: data.avatar })
    }
    return this._request(`${this._url}/users/me/avatar`, options)
  }  
  //Метод  запроса последней версии лайка
  addLikeCardData(id) {
    const options = {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,'Content-Type': 'application/json' },
      method: 'PUT'
    }
    return this._request(`${this._url}/cards/${id}/likes`, options)
  }
   
  //удаление лайка с карточки    
  deleteLikeCardData(id) {
    const options = {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,'Content-Type': 'application/json' },
      method: 'DELETE'
    }
    return this._request(`${this._url}/cards/${id}/likes`, options)
  } 
}
//для карточек
const apiConfig = {
  url: "https://api.jupiter.nomoredomainsmonster.ru",
  //url: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
     authorization: `Bearer ${localStorage.getItem('token')}`,
    //"authorization": "ae84b954-9fdb-4967-8466-ffa99a62c9a2",
 },
};
/*API*/
const api = new Api(apiConfig);
export default api;