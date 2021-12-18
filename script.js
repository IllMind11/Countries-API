let countries = [];

let data = fetch("https://restcountries.com/v2/all")
  .then((blob) => blob.json())
  .then((data) => countries.push(...data));

const cardWrapper = document.querySelector(".cards");
const searchInput = document.querySelector(".search");
const selectOption = document.querySelector(".options");

function searchForCountry(placeToSearch, countries) {
  return countries.filter((place) => {
    const regex = new RegExp(placeToSearch, "gi");
    if (place.capital === undefined) {
      return place.name.match(regex) && place.region.match(selectOption.value);
    } else {
      return (
        (place.name.match(regex) && place.region.match(selectOption.value)) ||
        (place.capital.match(regex) && place.region.match(selectOption.value))
      );
    }
  });
}

function filterByRegion() {
  const html = countries
    .filter((place) => {
      return place.region === selectOption.value;
    })
    .map((place) => {
      return `
      <a href="#">
    <div class="card">
     <div data-name="${place.name}" class="photo" style="background: url(${
        place.flag
      }); 
       background-repeat: no-repeat;
    background-position: center;
    background-size: cover;"></div>
      </a>

      <div class="content">
        <h4>${place.name}</h4>
        <p>Population:
    <span class="info">${numberWithCommas(place.population)}</span></p>
        <p>Region: 
    <span class="info">${place.region}</span></p>
        <p>Capital: 
    <span class="info">${place.capital}</span></p>
      </div>
      </div>
    `;
    })
    .join("");
  cardWrapper.innerHTML = html;
}

//                           _
//                          | \
//                          | |
//                          | |
//     |\                   | |
//    /, ~\                / /
//   X     `-.....-------./ /
//    ~-. ~  ~              |
//       \             /    |
//        \  /_     ___\   /
//        | /\ ~~~~~   \ |
//        | | \        || |
//        | |\ \       || )
//       (_/ (_/      ((_/
//
//
//

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayResults() {
  const matchedPlace = searchForCountry(this.value, countries);
  const html = matchedPlace
    .map((place) => {
      return `
      <a href="#">
      <div class="card">
      <div data-name="${place.name}" class="photo" style="background: url(${
        place.flag
      }); 
       background-repeat: no-repeat;
    background-position: center;
    background-size: cover;"></div>
      </a>  

      <div class="content">
        <h4>${place.name}</h4>
        <p>Population:
    <span class="info">${numberWithCommas(place.population)}</span></p>
        <p>Region: 
    <span class="info">${place.region}</span></p>
        <p>Capital: 
    <span class="info">${place.capital}</span></p>
      </div>
      </div>
      `;
    })
    .join("");
  cardWrapper.innerHTML = html;
}

const res = document.querySelector(".click");

selectOption.addEventListener("change", filterByRegion);
res.addEventListener("click", displayResults);
searchInput.addEventListener("input", displayResults);

// country-info page code starts here
const wrapper = document.querySelector(".wrapper");

function hideInfo() {
  wrapper.classList.remove("active");
}

function getCountryInfo(e) {
  if (e.target.nodeName.toLowerCase() !== "div") return;
  wrapper.classList.add("active");
  const dataName = e.target.dataset.name;
  // const borders = countries.map(place => place.borders).map(border => border).filter(border => border)

  const filter = countries
    .filter((place) => {
      return place.name == dataName;
    })
    .map((place) => {
      return `
      <div
          class="flag-pic"
          style="
            background: url(${place.flag});
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
          "
        ></div>
        <div class="country-info">
          <h3>${place.name}</h3>
          <p>Native Name: <span class="info">${place.nativeName}</span></p>
          <p>Population: <span class="info">${numberWithCommas(
            place.population
          )}</span></p>
          <p>Region: <span class="info">${place.region}</span></p>
          <p>Area: <span class="info">${numberWithCommas(
            place.area
          )} km²</span></p>
          <p>Sub Region: <span class="info">${place.subregion}</span></p>
          <p>Capital: <span class="info">${place.capital}</span></p>
          <p>Top Level Domain: <span class="info">${
            place.topLevelDomain
          }</span></p>
          <p>Currencies: <span class="info">${place.currencies
            .map((cur) => cur.name)
            .join(", ")}</span></p>
          <p>Languages: <span class="info">${place.languages
            .map((lan) => lan.name)
            .join(", ")}</span></p>
        </div>

      <button class="closeBtn" onclick="hideInfo()">Close</button>
      `;
    })
    .join("");
  wrapper.innerHTML = filter;
}

cardWrapper.addEventListener("click", getCountryInfo);

//Dark Mode code starts here
const darkModeBtn = document.querySelector(".dark-mode");

function toggleDarkMode() {
  document.querySelector("input").classList.toggle("dark");
  document.querySelector("select").classList.toggle("dark");
  document.body.classList.toggle("dark");
  document.querySelector("nav").classList.toggle("dark");
  // document.querySelector('div').classList.toggle('dark');
  document
    .querySelectorAll("span")
    .forEach((span) => span.classList.toggle("dark"));
  document.querySelectorAll("p").forEach((p) => p.classList.toggle("dark"));
  document
    .querySelectorAll(".card")
    .forEach((card) => card.classList.toggle("dark"));
  document
    .querySelectorAll(".country-info")
    .forEach((info) => info.classList.toggle("dark"));
}

darkModeBtn.addEventListener("click", toggleDarkMode);
