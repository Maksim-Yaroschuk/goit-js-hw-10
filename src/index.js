import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from "./fetchCountries"

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector("#search-box")
const infoCountry = document.querySelector(".country-info")
const listCountry = document.querySelector(".country-list")

let markup = ""

inputCountry.addEventListener("input", debounce(onGetCountry, DEBOUNCE_DELAY))


function onGetCountry(event) {
  const inputValue = event.target.value
  if (inputValue === "") {
    clearField()
    return
  }
  
  fetchCountries(inputValue)
    .then((countries) => {
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