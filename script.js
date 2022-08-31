window.addEventListener("DOMContentLoaded", createAlerts);

function createAlerts() {
  const root = document.getElementById("root");
  const BASE_URL = "http://107.23.133.228:8090/developer/api/v2";
  const API_KEY = "4oJedLBt80WP-d7E6Ekf5w";

  Promise.all([
    fetch(`${BASE_URL}/alerts?api_key=${API_KEY}`).then((res) => res.json()),
    fetch(`${BASE_URL}/routes?api_key=${API_KEY}`).then((res) => res.json()),
  ]).then((res) => {
    const alerts = processAlerts(res[0].alerts); // array of objs that hold the alert and pertinent routes
    const routes = res[1].mode[1].route; // array of all available routes

    const data = processData(alerts, routes);
  });
}

/**
 *
 * @param {Array} alerts array of alert objects with alert and array of route_id
 * @param {Array} routes array of route objects with route_id and route_name properties
 */
function processData(alertArr, routes) {
  let routeArr = routes;

  alertArr.forEach((data) => {
    data.route_ids.forEach((routeID) => {
      routeArr.forEach((route) => {
        if (routeID === route.route_id) {
          if (route.alerts) {
            route.alerts = [...route.alerts, data.alert];
          } else {
            route.alerts = [];
            route.alerts[0] = data.alert;
          }
        }
      });
    });
  });

  return routeArr;
}

/**
 * Process all alerts
 *
 * @param {Array} alerts
 * @returns an array of objects that contain an alert and its unique routes
 */
function processAlerts(alerts) {
  let result = [];

  // loop through all alerts and create an array of routes that have alerts
  alerts.forEach((alert) => {
    const routes = uniqueRoutes(alert.affected_services.services, "alert");

    result.push({
      route_ids: routes,
      alert: alert,
    });
  });

  return result;
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
