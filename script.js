window.addEventListener("DOMContentLoaded", createAlerts);

function createAlerts() {
  const allAlerts = document.getElementById("accordion");
  const BASE_URL = "http://107.23.133.228:8090/developer/api/v2";
  const API_KEY = "4oJedLBt80WP-d7E6Ekf5w";

  Promise.all([
    fetch(`${BASE_URL}/alerts?api_key=${API_KEY}`).then((res) => res.json()),
    fetch(`${BASE_URL}/routes?api_key=${API_KEY}`).then((res) => res.json()),
  ]).then((res) => {
    // process data
    const alerts = processAlerts(res[0].alerts); // array of objs that hold the alert and pertinent routes
    const routes = res[1].mode[1].route; // array of all available routes
    const allData = cleanup(processData(alerts, routes));
    console.log(allData);

    // build accordion
    let accordion = new DocumentFragment();
    allData.forEach((route, idx) => {
      accordion.append(createRoutePanel(route, idx));
    });
    allAlerts.append(accordion);

    // attach event handlers
    const reset = document.getElementById("reset");
    reset.addEventListener("click", showAllAlerts);

    const activeAlertsBttn = document.getElementById("active-filter");
    activeAlertsBttn.addEventListener("click", showActiveAlerts);

    const plannedAlertsBttn = document.getElementById("planned-filter");
    plannedAlertsBttn.addEventListener("click", showPlannedAlerts);
  });
}

/* Process API Data / Backend
 ******************************************************* */
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
          // append alert
          if (route.alerts) {
            route.alerts = [...route.alerts, data.alert];
          } else {
            route.alerts = [];
            route.alerts[0] = data.alert;
          }

          // increment alert type
          route.status = incrementStatusType(data.status, route.status);
        }
      });
    });
  });

  console.log(routeArr);
  return routeArr;
}

/**
 * Increments alert status
 *
 * @param {String} alertStatus
 * @param {Object} routeStatus
 * @returns Object that holds status of alerts for the route
 */
function incrementStatusType(
  alertStatus,
  routeStatus = { active: 0, planned: 0 }
) {
  let res = routeStatus;
  if (alertStatus.includes("Ongoing") || alertStatus === "New") {
    res.active = res.active + 1;
  } else {
    res.planned = res.planned + 1;
  }

  return res;
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
      status: alert.alert_lifecycle,
    });
  });

  return result;
}

/* Build Front End
 ******************************************************* */

/**
 * Builds route panel with alerts
 *
 * @param {object} route
 * @param {Int} id
 * @returns route element with alerts
 */
function createRoutePanel(route, id) {
  // create parent fragment
  let routePanel = new DocumentFragment();

  // create panel elements
  const header = document.createElement("div");
  header.id = route.route_id;

  const activeClass = route.status.active ? "active" : "";
  const plannedClass = route.status.planned ? "planned" : "";
  header.setAttribute("class", `accordion-item ${activeClass} ${plannedClass}`);

  const button = document.createElement("button");
  button.setAttribute("class", "accordion-button collapsed panel-title");
  // button.setAttribute("type", "button");
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", `#collapse${id}`);
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", `collapse${id}`);

  const panelContainer = document.createElement("div");
  panelContainer.setAttribute("class", "panel-container");

  const title = document.createElement("h3");
  title.setAttribute("class", "accordion-title");
  title.textContent = routeLabel(route.route_name);

  const alertStatus = document.createElement("div");
  alertStatus.setAttribute("class", "route-status");
  let active, planned;
  if (route.status.active > 0) {
    active = document.createElement("span");
    active.setAttribute("class", "active");
    active.textContent = route.status.active;
  }

  if (route.status.planned > 0) {
    planned = document.createElement("span");
    planned.setAttribute("class", "planned");
    planned.textContent = route.status.planned;
  }

  alertStatus.append(active || "", planned || "");

  // add elements to route header section
  panelContainer.append(title, alertStatus);
  button.append(panelContainer);
  header.append(button);
  routePanel.append(header);

  // create alert container
  const alertBody = document.createElement("div");
  alertBody.id = `collapse${id}`;
  alertBody.setAttribute("class", "accordion-collapse collapse");
  alertBody.setAttribute("aria-labelledby", `heading${id}`);
  // alertBody.setAttribute("data-bs-parent", "#accordionExample");

  // append alerts to alert container
  route.alerts.forEach((alert, idx) => {
    alertBody.append(createAlertPanel(alert, idx));
  });

  routePanel.append(alertBody);
  return routePanel;
}

/**
 * Creates an alert panel to append to a route
 *
 * @param {Object} alert
 * @param {Int} idx
 * @returns alert element
 */
function createAlertPanel(alert, idx) {
  const alertPanel = document.createElement("div");
  const status = statusText(alert.alert_lifecycle);
  alertPanel.id = `alert-collapse${idx}`;
  alertPanel.setAttribute("class", `alert-panel ${status.toLowerCase()}`);
  alertPanel.setAttribute("aria-labelledby", `alert-heading${idx}`);
  alertPanel.setAttribute("data-bs-parent", `#collapse${idx}`);

  // alert icon
  const alertIcon = document.createElement("span");
  const alertClass = alert.effect.toLowerCase();
  alertIcon.setAttribute("aria-hidden", "true");
  alertIcon.setAttribute(
    "class",
    `material-symbols-outlined alert-icon ${alertClass}`
  );
  alertIcon.textContent = icon(alert.effect_name);

  alertPanel.append(alertIcon);

  // alert content
  const alertContent = document.createElement("div");
  alertContent.setAttribute("class", "alert-content");

  const alertType = document.createElement("h4");
  alertType.setAttribute("class", "alert-type");
  alertType.textContent = alert.effect_name;

  const flag = document.createElement("span");
  // console.log(status);
  flag.setAttribute("class", `alert-status ${status.toLowerCase()}`);
  flag.append(status);
  alertType.append(flag);

  const alertTitle = document.createElement("h5");
  alertTitle.setAttribute("class", "alert-title");
  alertTitle.textContent = accessibleText(alert.header_text);

  // conditionally add description
  let alertDescription = "";
  if (alert.description_text) {
    // console.log(accessibleText(alert.description_text));
    alertDescription = document.createElement("p");
    alertDescription.textContent = accessibleText(alert.description_text);
    alertDescription.setAttribute("style", "white-space:pre-wrap;");
  }

  // conditionally add alertURL
  let alertLink = "";
  if (alert.url) {
    alertLink = document.createElement("p");
    const alertURL = document.createElement("a");
    alertURL.setAttribute("href", alert.url);
    alertURL.setAttribute("target", "_blank");
    alertURL.textContent = "More Details";
    alertLink.append(alertURL);
  }

  const alertCause = document.createElement("p");
  alertCause.textContent = `Cause: ${alert.cause}`;
  alertCause.setAttribute("class", "cause");

  // if array is not empty
  let alertDates = "N/A";
  if (alert.effect_periods.length > 0) {
    alertDates = document.createElement("p");
    alertDates.textContent = `Effective Dates: ${processAlertDates(
      alert.effect_periods[0].effect_start,
      alert.effect_periods[0].effect_end
    )}`;
    alertDates.setAttribute("class", "dates");
  }

  alertContent.append(
    alertType,
    alertTitle,
    alertDescription,
    alertLink,
    alertCause,
    alertDates
  );

  alertPanel.append(alertContent);

  return alertPanel;
}

/* Helper Functions
 ******************************************************* */

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

/**
 * Generates text for alert effective dates
 *
 * @param {Int} start
 * @param {Int} end
 * @returns String describing effective dates
 */
function processAlertDates(start, end) {
  const today = Math.round(new Date().getTime() / 1000);
  if (end < today) return `${convertEpoch(start)} until further notice`;
  return `${convertEpoch(start)} to ${convertEpoch(end)}`;
}

/**
 * Generates string to call material icon that corresponds to alert type
 *
 * @param {String} effectName
 * @returns String that represents Material Icon
 */
function icon(effectName) {
  let text;

  switch (effectName) {
    case "Trip Cancelation":
    case "Suspension":
      text = "error";
      break;

    case "Trip Restoration":
      text = "task_alt";
      break;

    case "Stop Closure":
      text = "dangerous";
      break;

    case "Multi-route Reroute":
    case "Single Route Reroute":
      text = "alt_route";
      break;

    default:
      text = "warning";
  }

  return text;
}

/**
 * Replaces text in description that is difficult to parse for screen readers
 *
 * @param {String} desc
 * @returns expanded version of description
 */
function accessibleText(desc) {
  // if null, return
  if (desc === "") return "";

  // expand directionals
  let res = "";
  res = desc.replaceAll(/NB/g, "Northbound");
  res = res.replaceAll(/SB/g, "Southbound");
  res = res.replaceAll(/EB/g, "Eastbound");
  res = res.replaceAll(/WB/g, "Westbound");

  // expand streets
  res = res.replaceAll(/ Ave\b/gm, " Avenue");
  res = res.replaceAll(/ St\b/gm, " Street");
  res = res.replaceAll(/ Pl\b/gm, " Place");
  res = res.replaceAll(/ Rd\b/gm, " Road");

  return res;
}

/**
 * Generates text for status flag and alert classes
 *
 * @param {String} status
 * @returns String to display in status flag and classnames
 */
function statusText(status) {
  if (status === "New" || status.includes("Ongoing")) return "active";
  return "planned";
}

/**
 * Transforms epoch date to local date
 *
 * @param {Int} epochts
 * @returns human readable string for date
 */
function convertEpoch(epochts) {
  // return new Date(epochts * 1000).toDateString();
  return new Date(epochts * 1000).toLocaleDateString();
}

/**
 * Adjusts the route title based on route number
 *
 * @param {String} route
 * @returns String describing route type
 */
function routeLabel(route) {
  if (route === "Duvall-Monroe Shuttle") return route;
  if (route.charAt(0).match(/[a-z]/i)) return `RapidRide ${route}`;
  if (isST(route)) return `ST ${route}`;
  if (isDART(route)) return `DART ${route}`;
  return ` Route ${route}`;
}

/**
 * Determines if a given route is DART
 *
 * @param {String} route
 * @returns boolean
 */
function isDART(route) {
  const routeNum = parseInt(route);
  if (
    routeNum === 204 ||
    routeNum === 224 ||
    routeNum === 630 ||
    routeNum === 631 ||
    (routeNum >= 901 && routeNum <= 930)
  ) {
    return true;
  }
  return false;
}
/**
 * Determines if a given route operates under Sound Transit Express
 *
 * @param {String} route
 * @returns boolean
 */
function isST(route) {
  const routeNum = parseInt(route);
  if (routeNum >= 500 && routeNum < 600) {
    return true;
  }
  return false;
}

/* Event Handlers
 ******************************************************* */
function showAllAlerts() {
  const accordion = document.getElementById("accordion");
  accordion.removeAttribute("class", "active planned");
  accordion.setAttribute("class", "accordion");

  clearButtons();

  const bttn = document.getElementById("reset");
  bttn.setAttribute("class", "tab-btn selected");
}

function showActiveAlerts() {
  const accordion = document.getElementById("accordion");
  accordion.removeAttribute("class", "planned");
  accordion.setAttribute("class", "accordion active");

  clearButtons();

  const bttn = document.getElementById("active-filter");
  bttn.setAttribute("class", "tab-btn selected");
}

function showPlannedAlerts() {
  const accordion = document.getElementById("accordion");
  accordion.removeAttribute("class", "active");
  accordion.setAttribute("class", "accordion planned");

  clearButtons();

  const bttn = document.getElementById("planned-filter");
  bttn.setAttribute("class", "tab-btn selected");
}

function clearButtons() {
  const bttns = document.getElementsByClassName("tab-btn");
  console.log(bttns);
  for (bttn of bttns) {
    bttn.removeAttribute("class", "selected");
    bttn.setAttribute("class", "tab-btn");
  }
}
