const btn = document.querySelector(".btn-country");
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
getCountryData("romania");
//we have to ajax calls happening in the same time, in parallel
//the data arrrives slighlty different( in different order);adica sua prima si portugalia a 2 sau invers-its time we reaload the page
//it s shoes the non blocking behaviour
//whenever the first one arrives will then fore the load event first
//if we want in a order,we have to chain the requests
