var data
 var dataToSend = {
   money: 1000
 }

fetch("./user_data.json")
    .then((response) => {
        return response.json()
    })
    .then((response) => {
        data = response;
    })
    .catch(error => console.log(error))
    window.onload = () => console.log(data)

let request = new Request('./user_data.json');
fetch(request, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataToSend)
})
.then((response) => {
  return response.json()
})
.then((response) => {
  data = response;
  console.log(data)
})
.catch(error => console.log(error))

fetch('/',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataToSend)
})
