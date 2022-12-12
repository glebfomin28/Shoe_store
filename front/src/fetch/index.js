// каталог: поиск
export const searchCatalogItems = (value, activeTabs, setCatalog) => {
  try {
    fetch(`http://localhost:7070/api/items?q=${value}`)
      .then( (res) => res.json() )
      .then( (json) => {
        const filterValue = json.filter((v) =>
            activeTabs === 11 ? true : v.category === activeTabs
        )
        return setCatalog(filterValue)
      } )
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