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
    const data = cleanup(processData(alerts, routes));
    console.log(data);

    let accordion = new DocumentFragment();
    data.forEach((route, idx) => {
      accordion.append(addRoutePanel(route, idx));
    });
    root.append(accordion);
  });
}

/**
 *
 * @param {Array} alertArr array of alert objects with alert and array of route_id
 * @param {Array} routeArr array of route objects with route_id and route_name properties
 */
function processData(alertArr, routeArr) {
  let routes = routeArr;

  alertArr.forEach((data) => {
    data.route_ids.forEach((routeID) => {
      routes.forEach((route) => {
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
 * Removes routes without active alerts
 *
 * @param {Array} routes an array of routes with route_id, route_name, and alerts properties
 * @returns array of routes with active alerts
 */
function cleanup(routes) {
  return routes.filter((route) => route.alerts);
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

function addRoutePanel(route, id) {
  // create parent fragment
  let routePanel = new DocumentFragment();

  // create panel elements
  const header = document.createElement("div");
  header.id = route.route_id;
  header.setAttribute("class", "accordion-item");

  const title = document.createElement("h3");
  title.setAttribute("class", "accordion-header");

  const button = document.createElement("button");
  button.setAttribute("class", "accordion-button collapsed");
  // button.setAttribute("type", "button");
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", `#collapse${id}`);
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", `collapse${id}`);
  button.textContent = route.route_name;

  header.append(button);
  routePanel.append(header);

  const alertBody = document.createElement("div");
  alertBody.id = `collapse${id}`;
  alertBody.setAttribute("class", "accordion-collapse collapse");
  alertBody.setAttribute("aria-labelledby", `heading${id}`);
  // alertBody.setAttribute("data-bs-parent", "#accordionExample");

  // append alerts to each route panel body section
  route.alerts.forEach((alert, idx) => {
    let alertPanel = document.createElement("div");
    alertPanel.id = `alert-collapse${idx}`;
    // alertPanel.setAttribute("class", "collapse");
    alertPanel.setAttribute("aria-labelledby", `alert-heading${idx}`);
    alertPanel.setAttribute("data-bs-parent", `#collapse${idx}`);

    let alertTitle = document.createElement("h4");
    alertTitle.textContent = alert.short_header_text;

    let alertLifecycle = document.createElement("p");
    alertLifecycle.textContent = alert.alert_lifecycle;

    let alertDescription = document.createElement("p");
    alertDescription.textContent = alert.description_text;
    alertDescription.setAttribute("style", "white-space:pre;");

    let alertLink = document.createElement("p");
    let alertURL = document.createElement("a");
    alertURL.setAttribute("href", alert.url);
    alertURL.setAttribute("target", "_blank");
    alertURL.textContent = "More Details";
    alertLink.append(alertURL);

    let alertCause = document.createElement("p");
    alertCause.textContent = `Cause: ${alert.cause}`;

    let alertDates = `Effective Dates: ${convertEpoch(
      alert.effect_periods[0].effect_start
    )} to ${convertEpoch(alert.effect_periods[0].effect_end)}`;

    alertPanel.append(
      alertTitle,
      alertLifecycle,
      alertDescription,
      alertLink,
      alertCause,
      alertDates
    );
    alertBody.append(alertPanel);
  });

  routePanel.append(alertBody);
  return routePanel;
}

function convertEpoch(epochts) {
  return new Date(epochts * 1000).toDateString();
}
