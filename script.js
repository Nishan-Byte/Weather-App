const apiKey = "b73c070cc8a54a10bef22943252206";
const form = document.getElementById("weatherForm");
const locationInput = document.getElementById("locationInput");
const resultContainer = document.getElementById("weatherResult");
const locationName = document.getElementById("locationName");
const weatherDescription = document.getElementById("weatherDescription");
const temperature = document.getElementById("temperature");
const weatherImage = document.getElementById("weatherImage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (!location) return;

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = getWeatherImage(condition.toLowerCase());

    locationName.textContent = `${data.location.name}, ${data.location.country}`;
    weatherDescription.textContent = condition;
    temperature.textContent = temp;
    weatherImage.src = icon;
    resultContainer.classList.remove("hidden");

  } catch (err) {
    alert("Couldn't fetch weather. Please check the location.");
    resultContainer.classList.add("hidden");
  }
});

function getWeatherImage(condition) {
  if (condition.includes("sunny") || condition.includes("clear")) {
    return "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Sunny
  } else if (condition.includes("cloud") || condition.includes("overcast")) {
    return "https://cdn-icons-png.flaticon.com/512/414/414825.png"; // Cloudy
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Rainy
  } else if (condition.includes("snow")) {
    return "https://cdn-icons-png.flaticon.com/512/642/642102.png"; // Snow
  } else {
    return "https://cdn-icons-png.flaticon.com/512/252/252035.png"; // Default
  }
}
