window.addEventListener("DOMContentLoaded", createAlerts);

function createAlerts() {
  const root = document.getElementById("root");
  const BASE_URL = "http://107.23.133.228:8090/developer/api/v2";
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
      let alertArr = [];
      data.alerts.forEach((alert) => {
        // console.log(alert);
        console.log(uniqueRoutes(alert.affected_services.services));

        const routes = uniqueRoutes(alert.affected_services.services);
        // addAlertToRoute(routes, alert, alertArr);
      });
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
 * Filter array of routes so that only unique routes are listed
 *
 * @param {obj} alert
 * @returns array of routes to append this alert to
 */
function uniqueRoutes(routes) {
  return [...new Set(routes.map((route) => route.route_name))];
}

/**
 * Adds alert to the list
 *
 * @param {Array} routeArr
 * @param {Object} alert
 * @param {Array} alertArr
 */
function addAlertToRoute(routeArr, alert, alertArr) {
  routeArr.forEach((route) => {
    if (!alertArr.includes(route)) createRouteObj(route, alertArr);
    appendAlert(route, alertArr, alert);
  });
}

function createRouteObj(route, alertArr) {}
function appendAlert(route, alertArr, alert) {}
