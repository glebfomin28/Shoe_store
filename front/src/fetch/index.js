
// хиты продаж
import {deleteOrderList, setAddress, setCheckbox, setInfoItem, setPhone, setSuccess} from "../store/reducers";

export const getBestsellerList = (dispatch, reducer) => {
  try {
    fetch("http://localhost:7070/api/top-sales")
      .then( (res) => res.json() )
      .then( (json) => dispatch(reducer(json)) )
  } catch (e) {
    return console.log(e)
  }
}

// каталог: категории
export const getCategories = (dispatch, reducer) => {
  try {
    fetch("http://localhost:7070/api/categories")
      .then( (res) => res.json() )
      .then( (json) => dispatch(reducer(json)) )

  } catch (e) {
    return console.log(e)
  }
}

// каталог: получить объект с каталогом
export const getCatalogList = (dispatch, reducer, URL) => {
  try {
    fetch(URL)
      .then( (res) => res.json() )
      .then( (json) => dispatch(reducer(json)) )

  } catch (e) {
    return console.log(e)
  }
}

// каталог: поиск
export const searchCatalogItems = (dispatch, reducer, value) => {
  if (value === '') return
  try {
    fetch(`http://localhost:7070/api/items?q=${value}`)
      .then( (res) => res.json() )
      .then( (json) => {
        dispatch(reducer(json))
      })
  } catch (e) {
    return console.log(e)
  }
}

// покупка
export const getInfoItem = (
  dispatch,
  reducer,
  value,
  check,
  loader
) => {
  try {
    fetch(`http://localhost:7070/api/items/${value}`)
      .then( (res) => res.json() )
      .then( (json) => {
        check(json)
        return dispatch(reducer(json))
      } )
    loader(false)
  } catch (e) {
    return console.log(e)
  }
}

// post
export const orderRegistration = (
  dispatch,
  success,
  phone,
  address,
  checkbox,
  cleaning,
  checkLoad,
  jsonOrder
) => {
  checkLoad(true)
  fetch('http://localhost:7070/api/order', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:  JSON.stringify(jsonOrder),
  })
    .then( (response) => {
      if (response.status >= 200 && response.status < 300) {
        checkLoad(false)
        dispatch(success(1))
        dispatch(phone(''))
        dispatch(address(''))
        dispatch(checkbox(false))
        dispatch(cleaning())
      }
      return response;
    })
    .catch(function (error) {
      success(-1)
      console.log('Request failed', error);
    });
}