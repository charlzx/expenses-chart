let error = document.querySelector('#error')
let chart = document.querySelector('#chart')

const getData = async () => {
   let request = await fetch('../json/data.json')

   if (request.status !== 200) {
      error.innerHTML = 'couldn\'t fetch data'
      throw new Error('cannot find data.json file')
   }

   let response = await request.json()
   
   return response;
}

getData()
   .then(data => {
      chart.style.gridTemplateColumns = `repeat(${data.length}, 1fr)`

      data.forEach(function(item){
         chart.innerHTML += `
            <ul>
               <li>$${item.amount}</li>
               <li style="height: ${item.amount*3}px"></li>
               <li>${item.day}</li>
            </ul>
         `

      })
   })
   .catch(error => {
      console.log(error)
   })