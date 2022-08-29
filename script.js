window.addEventListener("DOMContentLoaded", createAlerts);

function createAlerts() {
  const root = document.getElementById("root");
  const BASE_URL = "http://107.23.133.228:8090/developer/api/v2/";
  const API_KEY = "4oJedLBt80WP-d7E6Ekf5w";

  const alerts = getAlerts(BASE_URL, API_KEY);
  const routes = getRoutes(BASE_URL, API_KEY);
}

/**
 * Fetches all alerts
 *
 * @param {String} baseURL
 * @param {String} apiKey
 * @returns an array of published alerts
 */
function getAlerts(baseURL, apiKey) {
  fetch(`${baseURL}/alerts?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.alerts);
      return data.alerts;
    })
    .catch((error) =>
      console.error("Problem with Alert Fetch operation:", error)
    );
}

/**
 * Fetches all routes
 *
 * @param {String} baseURL
 * @param {String} apiKey
 * @returns array of route objects with route_id and route_name properties
 *
 *  */
function getRoutes(baseURL, apiKey) {
  fetch(`${baseURL}/routes?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.mode[1].route);
      return data.mode[1].route;
    })
    .catch((error) =>
      console.error("Problem with Route Fetch operation:", error)
    );
}
