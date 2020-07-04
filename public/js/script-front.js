var data
 var dataToSend = [
  {
      "login": "login1",
      "money": 1000
  }
]

fetch("./user_data.json")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))
//     .then((response) => {
//         data = response;
//     })
//     .catch(error => console.log(error))
//     window.onload = () => console.log(data)

// fetch("./user_data.json", {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(dataToSend)
// })
// .then((response) => {
//   return response.json()
// })
// .then((response) => {
//   data = response;
//   console.log(data)
// })
// .catch(error => console.log(error))

fetch('/',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(dataToSend)
})
