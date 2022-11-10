window.addEventListener("DOMContentLoaded", createAlerts);

function createAlerts() {
  const allAlerts = document.getElementById("accordion");
  // const BASE_URL = "http://107.23.133.228:8090/developer/api/v2";
  const BASE_URL = "http://3.228.90.146:8090/developer/api/v2";
  const API_KEY = "4oJedLBt80WP-d7E6Ekf5w";

  Promise.all([
    fetch(`${BASE_URL}/alerts?api_key=${API_KEY}`).then((res) => res.json()),
    fetch(`${BASE_URL}/routes?api_key=${API_KEY}`).then((res) => res.json()),
  ]).then((res) => {
    // process data
    const alerts = processAlerts(res[0].alerts); // array of objs that hold the alert and pertinent routes
    const routes = organizeRoutes(res[1].mode[1].route); // array of all available routes
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
    reset.addEventListener("click", () => showAlerts());

    const ongoingAlertsBttn = document.getElementById("ongoing-filter");
    ongoingAlertsBttn.addEventListener("click", () =>
      showAlerts("ongoing", "upcoming")
    );

    const upcomingAlertsBttn = document.getElementById("upcoming-filter");
    upcomingAlertsBttn.addEventListener("click", () =>
      showAlerts("upcoming", "ongoing")
    );

    const searchInput = document.getElementById("route-search");
    searchInput.addEventListener("keyup", searchRoutes);
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
  routeStatus = { ongoing: 0, upcoming: 0 }
) {
  // console.log(alertStatus);
  let res = routeStatus;
  if (alertStatus.includes("Ongoing") || alertStatus === "New") {
    res.ongoing = res.ongoing + 1;
  } else {
    res.upcoming = res.upcoming + 1;
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
  const routeName = routeLabel(route.route_name);

  // create panel elements
  const header = document.createElement("div");
  header.id = route.route_id;

  const ongoingClass = route.status.ongoing ? "ongoing" : "";
  const upcomingClass = route.status.upcoming ? "upcoming" : "";
  header.setAttribute(
    "class",
    `accordion-item ${ongoingClass} ${upcomingClass}`
  );
  header.setAttribute("data-route", routeName);

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
  title.textContent = routeName;

  const alertStatus = document.createElement("div");
  alertStatus.setAttribute("class", "route-status");
  let ongoing, upcoming;
  if (route.status.ongoing > 0) {
    ongoing = document.createElement("span");
    ongoing.setAttribute("class", "ongoing");
    ongoing.textContent = route.status.ongoing;
  }

  if (route.status.upcoming > 0) {
    upcoming = document.createElement("span");
    upcoming.setAttribute("class", "upcoming");
    upcoming.textContent = route.status.upcoming;
  }

  alertStatus.append(ongoing || "", upcoming || "");

  // add elements to route header section
  panelContainer.append(title, alertStatus);
  button.append(panelContainer);
  header.append(button);

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
  header.append(alertBody);
  routePanel.append(header);
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
  flag.setAttribute("class", `alert-status ${status.toLowerCase()}`);
  flag.append(status);
  alertType.append(flag);

  const alertTitle = document.createElement("p");
  alertTitle.setAttribute("class", "alert-title");
  alertTitle.textContent = accessibleText(alert.header_text);

  // conditionally add description
  let alertDescription = "";
  if (alert.description_text) {
    // console.log(accessibleText(alert.description_text));
    alertDescription = document.createElement("p");
    alertDescription.textContent = accessibleText(alert.description_text);
    alertDescription.setAttribute("class", "alert-description");
    alertDescription.setAttribute("style", "display:none;");
  }

  // more details button
  let expandLink = "";
  if (alert.description_text) {
    expandLink = document.createElement("a");
    expandLink.setAttribute("class", "expand-link");
    expandLink.addEventListener("click", toggleDetails);
    expandLink.textContent = "View details";
  }

  const alertCause = document.createElement("p");
  alertCause.textContent = `Cause: ${alert.cause}`;
  alertCause.setAttribute("class", "cause");

  // if array is not empty
  let alertDates = "N/A";
  // console.log(alert.effect_periods.length);
  alertDates = document.createElement("p");
  // if more than one effective date range
  if (alert.effect_periods.length > 1) {
    alertDates.textContent = printDates(alert.effect_periods);
    alertDates.setAttribute("class", "dates");
    // else if only one effective date range
  } else if (alert.effect_periods.length === 1) {
    alertDates.textContent = `Effective Dates: ${processAlertDates(
      alert.effect_periods[0].effect_start,
      alert.effect_periods[0].effect_end
    )}`;
    alertDates.setAttribute("class", "dates");
  }

  const footer = document.createElement("p");
  footer.setAttribute("class", "alert-footer");
  footer.textContent = `Alert ID: ${
    alert.alert_id
  }, Last Updated: ${processAlertDates(
    alert.last_modified_dt,
    alert.last_modified_dt
  )}`;

  alertContent.append(
    alertType,
    alertTitle,
    expandLink,
    alertDescription,
    alertCause,
    alertDates,
    footer
  );

  alertPanel.append(alertContent);

  return alertPanel;
}

/* Helper Functions
 ******************************************************* */

/**
 * Removes routes without ongoing alerts
 *
 * @param {Array} routes an array of routes with route_id, route_name, and alerts properties
 * @returns array of routes with ongoing alerts
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
  return `Route ${route}`;
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

/**
 * Removes shuttle route and places it at the end of the array
 *
 * @param {Array} routes
 * @returns Array of routes in correct order
 */
function organizeRoutes(routes) {
  let shuttleRte = "";
  let routeArr = [];
  routes.forEach((route) => {
    if (route.route_id === "102698") {
      shuttleRte = route;
    } else {
      routeArr.push(route);
    }
  });

  return [...routeArr, shuttleRte];
}

/* Event Handlers
 ******************************************************* */
/**
 * Remove ongoing styling from filter buttons
 *
 */
function clearButtons() {
  const bttns = document.getElementsByClassName("tab-btn");
  for (bttn of bttns) {
    bttn.removeAttribute("class", "selected");
    bttn.setAttribute("class", "tab-btn");
  }
}

/**
 * Change the type of alerts in the view
 *
 * @param {String} show alert type to show
 * @param {String} hide alert type to hide
 */
function showAlerts(show = "", hide = "") {
  const accordion = document.getElementById("accordion");

  // change accordion view
  if (show === "") {
    accordion.removeAttribute("class", "ongoing upcoming");
  } else {
    accordion.removeAttribute("class", hide);
  }
  accordion.setAttribute("class", `accordion ${show}`);

  // update buttons
  clearButtons();

  let bttn;
  if (show === "") {
    bttn = document.getElementById("reset");
  } else {
    bttn = document.getElementById(`${show}-filter`);
  }
  bttn.setAttribute("class", "tab-btn selected");
}

/**
 * Hides routes that do not include search input
 *
 */
function searchRoutes() {
  // get the search value
  const input = document.getElementById("route-search").value.toLowerCase();

  // filter routes
  const routes = document.getElementsByClassName("accordion-item");
  for (route of routes) {
    const routeName = route.getAttribute("data-route").toLowerCase();
    if (!routeName.includes(input)) {
      route.setAttribute("style", "display:none;");
    } else {
      route.setAttribute("style", "display:block;");
    }
  }
}

function toggleDetails(e) {
  // const desc = e.target.parentElement.nextSibling;
  const desc = e.target.nextSibling;
  if (desc.style.display === "none") {
    desc.style.display = "block";
  } else {
    desc.style.display = "none";
  }

  if (e.target.textContent === "View details") {
    e.target.textContent = "Hide details";
  } else {
    e.target.textContent = "View details";
  }
}
