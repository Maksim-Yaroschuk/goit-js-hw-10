import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

// let name = ""
const inputCountry = document.querySelector("#search-box")
const infoCountry = document.querySelector(".country-info")
const listCountry = document.querySelector(".country-list")
inputCountry.addEventListener("input", debounce(onGetCountry, 1300))


function onGetCountry(event) {
    console.log(event.target.value)
    // name = event.target.value

    fetchCountries(event.target.value)
        .then((countries) => {
            countries.map(({flags, name, capital, population, languages}) => { 
                // console.log(country)
                // console.log(flags.svg)
                console.log(name.official)
                // console.log(capital)
                // console.log(population)
                // console.log(languages)
                const markup = 
                    `<li><img width="33.8px", heigth="21.1px" src="${flags.svg}"></li>
                     <li>${name.official}</li>`
                listCountry.insertAdjacentHTML("afterbegin", markup) 
                infoCountry.innerHTML = `
                    <ul>
                        <li><img width="101.44px", heigth="63.4px" src="${flags.svg}"> ${name.official}</li>
                        <li>Capital: ${capital}</li>
                        <li>Population: ${population}</li>
                        <li>Languages: ${languages}</li>
                    </ul> `
            })
                
        })
        .catch((error) => console.log(error));
}

// fetchCountries(name)

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


// function fetchUsers() {
//   return fetch("https://jsonplaceholder.typicode.com/users").then(
//     (response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }



// console.log(inputCountry.value)
