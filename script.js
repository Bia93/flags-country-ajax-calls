/*const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const getCountryData = function (country) {
  //cand avem mai multe tari
  const request = new XMLHttpRequest(); //the old way
  //i want to see how AJAX CALLS USE TO BE handled with events an callback functions.
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`); //GET is for getting the data;api- we need the url to which  tha ajax call should actually be made
  request.send(); //send off the request; fetching the data in the background;once that it is done it will emit the addEvent Listner

  request.addEventListener("load", function () {
    //as soon as the data arrives,this callback function will be called
    //responseText-is gonna be set once the data has actually arrived
    const [data] = JSON.parse(this.responseText); //JSON- tr transform it into an array of object
    console.log(data);
    //this- is the request( de la addEventListener)
    //we use destructuring la data -
    const html = `  <article class="country">
<img class="country__img" src="${data.coatOfArms.png}" />
<div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 100000).toFixed(
    1
  )}</p>
  <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
  <p class="country__row"><span>💰</span>${data.continents}</p>
</div>
</article>`;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData("portugal"); //AJAX CALLS
getCountryData("romania"); */
//we have to ajax calls happening in the same time, in parallel
//the data arrrives slighlty different( in different order);adica sua prima si portugalia a 2 sau invers-its time we reaload the page
//it s shoes the non blocking behaviour
//whenever the first one arrives will then fore the load event first
//if we want in a order,we have to chain the requests

//-----WE WILL CREATE A SEQUENCE OF AJAX CALLS, SO THE SECOND ONE RUNS ONLY AFTER THE FIRST ONE HAS FINISHED (adica portugal sa apara prima si apoi romania)

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const renderCountry = function (data, className = "") {
  //pt a scrie tara vecina
  const html = `  <article class="country ${className}">
  <img class="country__img" src="${data.flags[1]}" />
  <div class="country__data">
    <h3 class="country__name">${data.altSpellings[2]}</h3>
    <h4 class="country__region">${data.capital}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 100000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.flag}</p>
    <p class="country__row"><span>💰</span>${data.continents}</p>
  </div>
  </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};
const getCountryandNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest(); //the old way
  //i want to see how AJAX CALLS USE TO BE handled with events an callback functions.
  request.open("GET", `https://restcountries.com/v3/name/${country}`); //GET is for getting the data;api- we need the url to which  tha ajax call should actually be made
  request.send(); //send off the request; fetching the data in the background;once that it is done it will emit the addEvent Listner

  request.addEventListener("load", function () {
    //as soon as the data arrives,this callback function will be called
    //responseText-is gonna be set once the data has actually arrived
    const [data] = JSON.parse(this.responseText); //JSON- tr transform it into an array of object   //this- is the request( de la addEventListener)
    //we use destructuring la data
    console.log(data);
    //Render country 1
    renderCountry(data);
    //GET neighbour country (2) //practic scriem cu cine sa invecineaza de la proprietatea de boarder din api
    const [neighbour] = data.borders; //using destructuring
    if (!neighbour) return; //daca nu exista, sa mi intoarca; e posibil ca unele tari sa nu aiba
    //AJAX call country 2
    const request2 = new XMLHttpRequest(); //the old way
    //i want to see how AJAX CALLS USE TO BE handled with events an callback functions.
    request2.open("GET", `https://restcountries.com/v3/alpha/${neighbour}`); //alpha- de la public api-github - CODE
    request2.send();
    request2.addEventListener("load", function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, "neighbour"); //neighbour pt a screi tara vecina
    });
  });
};
getCountryandNeighbour("romania"); //AJAX CALLS
