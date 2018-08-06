const favoriteStorage = () => {
  let storageData = []
  if (localStorage.catalogueKey) {
    let catalogueData = JSON.parse(localStorage.getItem("catalogueKey"))
    catalogueData.forEach(function (item) {
      storageData.push(item)
    });
  }
  if (localStorage.mainPageKey) {
    let mainPageData = JSON.parse(localStorage.getItem("mainPageKey"))
    mainPageData.forEach(function (item) {
      storageData.push(item)
    });
  }
  if (localStorage.productCardKey) {
    let productCardData = JSON.parse(localStorage.getItem("productCardKey"))
    productCardData.forEach(function (item) {
      storageData.push(item)
    });
  }
  const serialStorageData = JSON.stringify(storageData)
  localStorage.setItem("favoriteKey", serialStorageData);
}

export default favoriteStorage