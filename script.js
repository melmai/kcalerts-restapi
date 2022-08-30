window.addEventListener("DOMContentLoaded", createAlerts);

function createAlerts() {
  const root = document.getElementById("root");
  const BASE_URL = "http://107.23.133.228:8090/developer/api/v2";
  const API_KEY = "4oJedLBt80WP-d7E6Ekf5w";

  // const alerts = getAlerts(BASE_URL, API_KEY); // array of alerts
  // const routes = getRoutes(BASE_URL, API_KEY); // array of routes

  // const data1 = Promise.all([
  //   getAlerts(BASE_URL, API_KEY),
  //   getRoutes(BASE_URL, API_KEY),
  // ]).then((res) => res);

  const data = Promise.all([
    fetch(`${BASE_URL}/alerts?api_key=${API_KEY}`).then((res) => res.json()),
    fetch(`${BASE_URL}/routes?api_key=${API_KEY}`).then((res) => res.json()),
  ]).then((res) => {
    console.log(res[0]); // alerts
    console.log(res[1]); // routes
  });
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
      let result = []; // contains array of route objects with alerts
      let routes = []; // contains array of routes with active alerts

      // loop through all alerts and create an array of routes that have alerts
      data.alerts.forEach((alert) => {
        routes = uniqueRoutes(alert.affected_services.services, "alert");

        result.push({
          routes: routes,
          alert: alert,
        });
      });

      console.log(result);
      return result;
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
function uniqueRoutes(routes, type) {
  if (type === "alert") {
    return [...new Set(routes.map((route) => route.route_id))];
  } else if (type === "route") {
    return [...new Set(routes.map((route) => route))];
  } else {
    return [];
  }
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
    if (!alertArr.includes(route_id)) createRouteObj(route, alertArr);
    appendAlert(route, alertArr, alert);
  });
}

function createRouteObj(route, alertArr) {}
function appendAlert(route, alertArr, alert) {}
