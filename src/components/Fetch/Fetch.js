
const dataLoader = (param) => {
  console.log(param)
  return new Promise((resolve, reject) => {
    fetch(`https://api-neto.herokuapp.com/bosa-noga/${param}`, {
      method: "GET"
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response;
        }
        throw new Error(response.statusText);
      })
      .then(response => response.json())
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        console.log(error)
      });
  })
}

export default dataLoader