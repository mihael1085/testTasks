// console.log(res.result.flights[0].flight.legs)

// console.log(res.result.flights[1].flight.legs)

// console.log(res.result.flights[2].flight.legs)

// console.log('мой полет:', res.result.flights[0].flight.legs[0].segments)


//Functions from Internet

function getTimeFromMins(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + ' ч ' + minutes + ' мин ';
};

function getWeekDay(date) {
	let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
	return days[date.getDay()];
  }

  function getMonth(date) {
	  let month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
	  let mon = date.getMonth() - 1
	  return month[mon - 1]
  }

//////////////
const segments = document.getElementById('segments')

  //Event listeners

  const buttonsPrice = document.querySelectorAll('input[name="sortType"]')

  console.log(buttonsPrice)


  
  buttonsPrice.forEach((elem) => {
	  elem.addEventListener('change', function(event) {
		  let item = event.target.value
		  console.log(item)
		  res.result.flights.sort((a,b) => {
			  console.log('a : ', a)
			let one = a.flight.price.passengerPrices[0].total.amount
			let two = b.flight.price.passengerPrices[0].total.amount 
			return one == two ? 0 : one < two ? -1 : 1;
		  })
		  segments.innerHTML = ''
		  render()
	  })
  })
//   formSortPrice.addEventListener('click change', changeSortHandler)
  
//   function changeSortHandler(event) {
// 	  // event.preventDefault()
// 	  console.log(event.type)
//   }


  /////////


render()

function render() { 
	res.result.flights.forEach((el, index) => {
	console.log('element:', el)
	let carrier = el.flight.carrier.uid
	console.log('company ; ', carrier)
	let html = `
		<div class="card__header">
			<img src="img/${el.flight.carrier.airlineCode}.png">
			<div class="price_block">
				<div class="price" style="height: 16px;">${el.flight.price.passengerPrices[0].total.amount}&#8381;</div>
				<p style="height: 0px">Стоимость для одного пассажира</p>
			</div>
		</div>
	`
	el.flight.legs.forEach((leg, number) => {
		let numOfChanges = leg.segments.length
		if(numOfChanges > 2) {
			console.log('слишком много пересадок')
			changes = `${leg.segments.length - 1} пересадки`
		} else changes = ` 1 пересадка `
		let duration = getTimeFromMins(leg.duration)
		let departureCity = leg.segments[0].departureCity.caption
		let departureTime = new Date(leg.segments[0].departureDate)
		let arrivalCity = leg.segments[numOfChanges-1].arrivalCity.caption
		let arrivalTime = new Date(leg.segments[numOfChanges-1].arrivalDate)
		let depart = leg.segments[0].departureAirport
		let arrive = leg.segments[numOfChanges-1].arrivalAirport
		html += `
			<div class="oneLeg"><p>${departureCity} , ${depart.caption} <p class="uid">( ${depart.uid} )<p> &#8594; ${arrivalCity} , ${arrive.caption} <p class="uid">( ${arrive.uid} )</p></p></div>
			<hr>
			<div class="timing">
				<div class="time">${departureTime.getHours()}:${departureTime.getMinutes()} <span class="date">${departureTime.getDate()} ${getMonth(departureTime)}</span></div>
				<div> &#9719; ${duration}</div>
				<div class="time">${arrivalTime.getHours()}:${arrivalTime.getMinutes()} <span class="date">${arrivalTime.getDate()} ${getMonth(arrivalTime)}</span></div>	
			</div>
			<div style="text-align: center">
					<div style="text-align: center"> ${changes} </div>
			</div>
	
			<br>
			<div>Рейс выполняет: ${el.flight.carrier.caption}</div>
			<hr>
			<div style="text-align: center"><button> ВЫБРАТЬ </button></div>
			<br>
		`
		if(number > 10) return null
	})
	let paragraph = document.createElement('div')
	paragraph.classList.add(`route#${index}`)
	paragraph.innerHTML = html
	segments.appendChild(paragraph)
})

}

// res.result.flights[0].flight.legs[0].forEach((el, index) => {
// 	console.log(`вылет из ${el.departureCity.caption}, прилет в ${el.arrivalCity.caption}`)
// 	let paragraph = document.createElement('div')
// 	paragraph.classList.add('route')
// })

