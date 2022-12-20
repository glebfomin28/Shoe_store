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

