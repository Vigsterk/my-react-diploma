const favoriteStorage = () => {
  let storageData = []
  let catalogueData = JSON.parse(localStorage.getItem("catalogueKey"))
  catalogueData.forEach(function (item) {
    storageData.push(item)
  });
  let mainPageData = JSON.parse(localStorage.getItem("mainPageKey"))
  mainPageData.forEach(function (item) {
    storageData.push(item)
  });
  let productCardData = JSON.parse(localStorage.getItem("productCardKey"))
  productCardData.forEach(function (item) {
    storageData.push(item)
  });

  const serialStorageData = JSON.stringify(storageData)
  localStorage.setItem("favoriteKey", serialStorageData);
}

export default favoriteStorage