let main = document.querySelector('main')

main.innerHTML = `
   <section>
      <div>
        <p>My balance</p>
        <p>$921.48</p>
      </div>
      
      <div>
        <img src="images/logo.svg" alt="logo of company">
      </div>
   </section>

   <section>
      <div id="display">
        <p>Spending - Last 7 days</p>
        
        <div id="error"></div>
        <div id="chart"></div>
      </div>

      <hr>

      <div id="stats">
        <p>Total this month</p>

        <section>
          <div>
            <p>$478.33</p>
          </div>
          <div>
            <p>+2.4%</p>
            <p>from last month</p>
          </div>
        </section>
      </div>
   </section>
`
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