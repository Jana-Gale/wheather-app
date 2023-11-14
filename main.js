//8GqxrKsfS2Cxc3D8ETsAt5ApHAGpkjoP

//select elements
let Apikey = 'uqaAzA0O3QgwXr8Evk7y0tSHgSU86u85';
let Listcard = document.querySelector('.List-card')
let List = document.querySelector('.list')
let searchCity = document.querySelector('#searchCity')
let cityname = document.querySelector('#cityname')
let weatherText = document.querySelector('#weatherText')
let degree = document.querySelector('#degree')
let Image_time = document.querySelector('#Image_time')







//create function reading from server

const getCityName = async(city) => {
    //autocomplete  link
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
    const query = `?apikey=${Apikey}&q=${city}`

    //store responce
    const response = await fetch(url + query)
        //change json data
    const data = await response.json()
        // console.log(data);
    return data


}

//event input 
searchCity.addEventListener("keyup", (e) => {
    // console.log(e.target.value);
    // if empty input return non input
    if (e.target.value.length === 0) {
        Listcard.classList.add('d-none')

    } else {
        List.innerHTML = '';


        getCityName(e.target.value.trim().toLowerCase())
            .then((data) => {
                // console.log(data);
                data.forEach((cities) => { //return city name user entered 
                    // display in the div list
                    // console.log(cities);
                    List.innerHTML += `<h4  class="target-glass">${cities.LocalizedName}</h4>`
                    Listcard.classList.remove('d-none')

                })
            }).catch((error) => {
                console.log(error);
            })

    }





})


//3/10/2023  lesson
// ogoow magaala kasto adoo magaceeda click siinaayo

List.addEventListener('click', (event) => {

    // console.log(event.target.innerText.trim().toLowerCase());
    //display on the  card div the city name and contry

    //create function
    UpdateTheUi(event.target.innerText.toLowerCase())
})






//get city code ang go to the internet
const getCityCode = async(city) => {
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${Apikey}&q=${city}`

    //store responce
    const response = await fetch(url + query)
        //change json data
    const data = await response.json()
        // console.log(data[0].Country.LocalizedName);
        // console.log(data);
        // console.log(data[0]);
    return data[0] //return data first object


}

const UpdateTheUi = (city) => {
    //get city code

    getCityCode(city)


    .then(data => { //you have get alot of information about city
        console.log(data);
        //display in (h1)
        cityname.innerHTML = `${data.LocalizedName}, ${data.Country.LocalizedName}`

        //khari magaaloyinka kala
        Listcard.classList.add('d-none')
        searchCity.value = "";

        //display text weather
        //getWeatherInfo
        return getWeatherInfo(data.Key) //retuns information about weather curren in the city


        //5/10/2023
    }).then(data => {
        console.log(data);
        //change text weather  current weather
        weatherText.innerHTML = `${data.WeatherText}`
            // addlocal(weatherText.innerHTML)
            //display Temprature of city
        degree.innerHTML = `${data.Temperature.Metric.Value} &deg;
        C`;



        console.log(city);


        //  day  and night
        if (data.IsDayTime) {
            console.log(data.IsDayTime);
            console.log("welcome");
            Image_time.setAttribute('src', './images/day.jpg')

            // Image_time.src = 'images/day.jpg'

        } else {
            Image_time.src = "images/night.jpg"
        }

        //local storage
        localStorage.setItem('city', city)

    })







}



// getCityCode('hargeisa')





//5/10/2023

//hel cimalada magaalada markaas aad doratay adoo key geeda sheegaaya  sunny cloud


const getWeatherInfo = async(citycode) => {
    const url = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${citycode}?apikey=${Apikey}`

    //store responce
    const response = await fetch(url + query)
        //change json data
    const data = await response.json()

    return data[0]
        // console.log(data[0]);

}


//read from local storage

if (localStorage.getItem('city').length > 0) {
    UpdateTheUi(localStorage.getItem('city'))
    console.log(UpdateTheUi(localStorage.getItem('city')));
}