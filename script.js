window.addEventListener("DOMContentLoaded", createAlerts);

function createAlerts() {
  const root = document.getElementById("root");
  const BASE_URL = "http://107.23.133.228:8090/developer/api/v2/";
  const API_KEY = "4oJedLBt80WP-d7E6Ekf5w";

  const alerts = getAlerts(BASE_URL, API_KEY); // array of alerts
  // const routes = getRoutes(BASE_URL, API_KEY); // array of routes
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
      data.alerts.forEach((alert) => {
        // console.log(alert);
        // console.log(extractActiveRoutes(alert));

        const routes = extractActiveRoutes(alert);
      });

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

/**
 * Extract active routes that pertain to this alert
 *
 * @param {obj} alert
 * @returns array of routes to append this alert to
 */
function extractActiveRoutes(alert) {
  const routesArr = alert.affected_services.services;
  return [...new Set(routesArr.map((route) => route.route_name))];
}

/**
 * Adds alert to the list
 *
 * @param {Array} routeArr
 * @param {Object} alert
 * @param {Array} alertArr
 */
function addAlertToRoute(routeArr, alert, alertArr) {}
