import data from "./data/english.json";
import "./style.css";

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener("DOMContentLoaded", () => {
  // Populate header and intro text
  document.getElementById("hero-title").textContent = data.hero_1_title;
  document.getElementById("hero-image").src = data.hero_1_image;
  document.getElementById("p-1-value").textContent = data.p_1_value;
  document.getElementById("p-2-value").textContent = data.p_2_value;
  document.getElementById("p-3-value").textContent = data.p_3_value;
  document.getElementById("p-4-value").textContent = data.p_4_value;
  document.getElementById("p-5-value").textContent = data.p_5_value;
  document.getElementById("p-6-value").textContent = data.p_6_value;
  document.getElementById("p-7-value").textContent = data.p_7_value;
  document.getElementById("p-8-value").textContent = data.p_8_value;
  document.getElementById("p-9-value").textContent = data.p_9_value;
  document.getElementById("p-10-value").textContent = data.p_10_value;

  const cityInput = document.getElementById("city-input");
  const cityList = document.getElementById("city-list");
  const cityInfo = document.getElementById("city-info");

  const debouncedSearch = debounce(() => {
    const query = cityInput.value.toLowerCase();
    cityList.innerHTML = "";

    if (query) {
      const cityKeys = Object.keys(data)
        .filter((key) => key.includes("_name"))
        .map((key) => {
          const cityName = capitalizeFirstLetter(data[key].toLowerCase());
          const cityAqi = data[key.replace("_name", "_aqi")];
          const cityCigg = data[key.replace("_name", "_cigg")];
          return { key, cityName, cityAqi, cityCigg };
        })
        .filter((city) => city.cityName.toLowerCase().includes(query));

      cityKeys.forEach((city) => {
        const listItem = document.createElement("li");
        listItem.textContent = city.cityName;
        listItem.addEventListener("click", () => showCityInfo(city));
        cityList.appendChild(listItem);
      });
    }
  }, 300);

  cityInput.addEventListener("input", debouncedSearch);

  const showCityInfo = (city) => {
    // Display selected city information
    cityInfo.style.display = "block";
    document.getElementById("selected-city").textContent = capitalizeFirstLetter(city.cityName);
    document.getElementById("city-aqi").textContent = `AQI: ${city.cityAqi}`;
    document.getElementById("city-cigarettes").textContent = `Cigarettes per day: ${city.cityCigg}`;

    // Set the selected city name in the search field
    cityInput.value = capitalizeFirstLetter(city.cityName);

    // Clear the city list
    cityList.innerHTML = "";
  };

  // Close the city list when clicking outside
  document.addEventListener("click", (event) => {
    if (!cityInput.contains(event.target) && !cityList.contains(event.target)) {
      cityList.innerHTML = "";
    }
  });
});
