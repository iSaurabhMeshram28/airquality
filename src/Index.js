
import data from "./data/english.json";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.getElementById("hero-title");
  const heroImage = document.getElementById("hero-image");
  const paragraphs = Array.from(document.querySelectorAll("header p"));
  const cityInput = document.getElementById("city-input");
  const cityList = document.getElementById("city-list");
  const cityInfo = document.getElementById("city-info");
  const selectedCity = document.getElementById("selected-city");
  const cityAqi = document.getElementById("city-aqi");
  const cityCigarettes = document.getElementById("city-cigarettes");

  const setElementText = (element, text) => {
    element.textContent = text;
  };

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const updateCityList = () => {
    const query = cityInput.value.toLowerCase().trim();
    cityList.innerHTML = "";

    if (!query) return;

    const cities = Object.keys(data)
      .filter((key) => key.includes("_name"))
      .map((key) => ({
        cityName: capitalizeFirstLetter(data[key].toLowerCase()),
        cityAqi: data[key.replace("_name", "_aqi")],
        cityCigarettes: data[key.replace("_name", "_cigg")],
      }))
      .filter(({ cityName }) => cityName.toLowerCase().includes(query));

    cities.forEach(({ cityName, cityAqi, cityCigarettes }) => {
      const listItem = document.createElement("li");
      listItem.textContent = cityName;
      listItem.addEventListener("click", () =>
        displayCityInfo(cityName, cityAqi, cityCigarettes)
      );
      cityList.appendChild(listItem);
    });
  };

  const displayCityInfo = (cityName, cityAqiValue, cityCigarettesValue) => {
    setElementText(selectedCity, cityName);
    setElementText(cityAqi, `AQI: ${cityAqiValue}`);
    setElementText(cityCigarettes, `Cigarettes per day: ${cityCigarettesValue}`);

    cityInput.value = cityName;
    cityList.innerHTML = "";
    cityInfo.style.display = "block";
  };

  const populateInitialData = () => {
    setElementText(heroTitle, data.hero_1_title);
    heroImage.src = data.hero_1_image;

    paragraphs.forEach((p, index) => {
      setElementText(p, data[`p_${index + 1}_value`]);
    });
  };

  const debouncedUpdateCityList = debounce(updateCityList, 300);

  cityInput.addEventListener("input", debouncedUpdateCityList);

  document.addEventListener("click", (event) => {
    if (!cityInput.contains(event.target) && !cityList.contains(event.target)) {
      cityList.innerHTML = "";
    }
  });

  populateInitialData();
});

// Debounce function
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}


