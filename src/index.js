import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector("#search-box")
const infoCountry = document.querySelector(".country-info")
const listCountry = document.querySelector(".country-list")
inputCountry.addEventListener("input", debounce(onGetCountry, DEBOUNCE_DELAY))
let markup = ""

function onGetCountry(event) {
    console.log(event.target.value)

  if (event.target.value === "") {
    clearField()
    return
  }
  
  fetchCountries(event.target.value)
    .then((countries) => {
      console.log(countries.length)
      if (countries.length === 1) {
        clearField()
        renderInfoCountry(countries)
      } else {
        if (countries.length > 10) {
          clearField()
          Notify.info("Too many matches found. Please enter a more specific name.")
          return
        }
        clearField()
        renderListCountry(countries)
      }       
    })
    .catch((error) => {
      console.log(error)
      Notify.failure("Oops, there is no country with that name")
    });
}

function renderInfoCountry(countries) {
  countries.map(({ flags, name, capital, population, languages }) => { 
  markup = `<h1><img width="50", heigth="25" src="${flags.svg}"> ${name.official}</h1>
            <p><b>Capital:</b> ${capital}</p>
            <p><b>Population:</b> ${population}</p>
            <p><b>Languages:</b> ${(Object.values(languages)).map(languages => languages).join(", ")}</p>`
  infoCountry.innerHTML = markup
  }).join("")
}

function renderListCountry(countries) {
  
  countries.map(({ flags, name }) => {
  listCountry.style = `list-style-type: none`
  markup = `<li><img width="30", heigth="15" src="${flags.svg}"> ${name.official}</li>`
  listCountry.insertAdjacentHTML('afterbegin', markup)
  }).join("")
}

function clearField() {
    listCountry.innerHTML = ""
    infoCountry.innerHTML = ""
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=flags,name,capital,population,languages`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
        
      }
      return response.json();
    }
  );
}