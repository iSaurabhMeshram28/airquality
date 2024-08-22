import data from "./data/english.json";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements for easier access
  const heroTitle = document.getElementById("hero-title");
  const heroImage = document.getElementById("hero-image");
  const paragraphs1 = Array.from(document.querySelectorAll("#intro-section-1 p"));
  const paragraphs2 = Array.from(document.querySelectorAll("#intro-section-2 p"));
  const cityInput = document.getElementById("city-input");
  const cityList = document.getElementById("city-list");
  const cityInfo = document.getElementById("city-info");
  const selectedCity = document.getElementById("selected-city");
  const cityAqi = document.getElementById("city-aqi");
  const cityCigarettes = document.getElementById("city-cigarettes");

  const bylineElement = document.getElementById("byline");
  const dateElement = document.getElementById("date");
  const categoryElement = document.getElementById("category");
  const categoryLinkElement = document.getElementById("category-link");

  // Utility function to set text content of an element
  const setElementText = (element, text) => {
    element.textContent = text;
  };

  // Utility function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // Update the city list based on user input
  const updateCityList = () => {
    const query = cityInput.value.toLowerCase().trim();
    cityList.innerHTML = "";

    if (!query) return;

    // Filter and map city data for displaying in the dropdown list
    const cities = Object.keys(data)
      .filter((key) => key.includes("_name"))
      .map((key) => ({
        cityName: capitalizeFirstLetter(data[key].toLowerCase()),
        cityAqi: data[key.replace("_name", "_aqi")],
        cityCigarettes: data[key.replace("_name", "_cigg")],
      }))
      .filter(({ cityName }) => cityName.toLowerCase().includes(query));

    // Create list items for matching cities
    cities.forEach(({ cityName, cityAqi, cityCigarettes }) => {
      const listItem = document.createElement("li");
      listItem.textContent = cityName;
      listItem.addEventListener("click", () =>
        displayCityInfo(cityName, cityAqi, cityCigarettes)
      );
      cityList.appendChild(listItem);
    });
  };

  // Display selected city's information in the UI
  const displayCityInfo = (cityName, cityAqiValue, cityCigarettesValue) => {
    setElementText(selectedCity, cityName);
    setElementText(cityAqi, `AQI: ${cityAqiValue}`);
    setElementText(
      document.getElementById("cigarettes-count"),
      `Cigarette Count: ${cityCigarettesValue}`
    );

    // Clear previous icons
    const cigaretteIconsContainer = document.getElementById("cigarette-icons");
    cigaretteIconsContainer.innerHTML = "";

    // Append the correct number of cigarette icons
    for (let i = 0; i < cityCigarettesValue; i++) {
      const img = document.createElement("img");
      img.src = "images/ciggrette_icon.png"; // Path to the cigarette icon
      img.alt = "Cigarettes Icon";
      img.className = "cigarette-icon";
      cigaretteIconsContainer.appendChild(img);
    }

    cityInput.value = cityName;
    cityList.innerHTML = "";

    // Show the city-info block when a city is selected
    cityInfo.style.display = "block";
  };

  // Hide city info if input is cleared
  cityInput.addEventListener("input", () => {
    if (!cityInput.value.trim()) {
      cityInfo.style.display = "none";
    }
  });

  // Populate the initial data when the page loads
  const populateInitialData = () => {
    setElementText(heroTitle, data.hero_1_title);
    heroImage.src = data.hero_1_image;

    paragraphs1.forEach((p, index) => {
      setElementText(p, data[`p_${index + 1}_value`]);
    });

    paragraphs2.forEach((p, index) => {
      setElementText(p, data[`p_${index + 6}_value`]);
    });

    // Populate additional article info (byline, date, category)
    setElementText(bylineElement, data["article-info_1_byline"]);
    setElementText(dateElement, data["article-info_1_date"]);
    setElementText(categoryElement, data["article-info_1_category"]);
    categoryLinkElement.href = data["article-info_1_category_url"];
    setElementText(categoryLinkElement, data["article-info_1_category"]);
  };

  // Debounce function to limit the rate of city list updates
  const debouncedUpdateCityList = debounce(updateCityList, 300);

  // Update city list on input with debouncing
  cityInput.addEventListener("input", debouncedUpdateCityList);

  // Hide city list when clicking outside the input or list
  document.addEventListener("click", (event) => {
    if (!cityInput.contains(event.target) && !cityList.contains(event.target)) {
      cityList.innerHTML = "";
    }
  });

  // Initial population of the data
  populateInitialData();
});

// Debounce function to delay execution of a function
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
