window.addEventListener("DOMContentLoaded", createAlerts);

function createAlerts() {
  const allAlerts = document.getElementById("kcalert-accordion");

  // remote API
  const BASE_URL = "https://kcm-api-test.ibi-transit.com/developer/api/v2";
  const API_KEY = "gvMjFrABizrQwye9KBD3KB";

  const REMOTE_ALERT_API = `${BASE_URL}/alerts?api_key=${API_KEY}`;
  const REMOTE_ROUTES_API = `${BASE_URL}/routes?api_key=${API_KEY}`;

  // local JSON
  const LOCAL_ALERT_DATA = "../../json/alerts20221207.json";
  const LOCAL_ROUTE_DATA = "../../json/routes.json";

  // set fetch type
  const isRemote = false;

  const ALERT_URL = isRemote ? REMOTE_ALERT_API : LOCAL_ALERT_DATA;
  const ROUTE_URL = isRemote ? REMOTE_ROUTES_API : LOCAL_ROUTE_DATA;

  // fetch data
  Promise.all([
    fetch(ALERT_URL).then((res) => res.json()),
    fetch(ROUTE_URL).then((res) => res.json()),
  ]).then((res) => {
    // process data
    const alerts = processAlerts(res[0].alerts); // array of objs that hold the alert and pertinent routes
    const routes = organizeRoutes(res[1].mode[1].route); // array of all available routes
    const allData = cleanup(processData(alerts, routes));
    // console.log(allData);

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
    searchInput.addEventListener("keyup", () => searchRoutes(true));

    const clearInput = document.getElementById("clear-search");
    clearInput.addEventListener("click", clearSearch);

    const resize_ob = new ResizeObserver(function (entries) {
      // since we are observing only a single element, so we access the first element in entries array
      let rect = entries[0].contentRect;
      const errorMsg = document.getElementById("no-alerts-msg");

      if (rect.height === 0) {
        errorMsg.setAttribute("style", "display: block;");
        allAlerts.setAttribute("style", "border-color: transparent;");
      } else {
        errorMsg.setAttribute("style", "display: none;");
        allAlerts.setAttribute("style", "border-color: #eee;");
      }
    });

    // start observing for resize
    resize_ob.observe(allAlerts);
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

  // console.log(routeArr);
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
    `toggle advisory-block ${ongoingClass} ${upcomingClass}`
  );
  header.setAttribute("data-route", routeName);

  const button = document.createElement("input");
  button.setAttribute("id", `toggle-advisory-${route.route_id}`);
  button.setAttribute("type", "checkbox");
  button.setAttribute("name", `toggle-advisory-${route.route_id}`);
  button.setAttribute("aria-hidden", "true");

  const label = document.createElement("label");
  label.setAttribute(
    "class",
    "toggle-head advisory-block-title with-description"
  );
  label.setAttribute("for", `toggle-advisory-${route.route_id}`);

  const title = document.createElement("h2");
  title.setAttribute("class", "accordion-title");
  title.textContent = routeName;

  // const panelContainer = document.createElement("div");
  // panelContainer.setAttribute("class", "panel-container");

  const alertStatus = document.createElement("div");
  alertStatus.setAttribute("class", "route-status");
  alertStatus.setAttribute("aria-hidden", "true");
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
  label.append(title, alertStatus);
  header.append(button, label);

  // create alert container
  const alertBody = document.createElement("div");
  alertBody.setAttribute("class", "toggle-inner");

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
  // alert content
  const alertContent = document.createElement("div");
  alertContent.setAttribute(
    "class",
    `advisory-content ${icon(alert.effect_name)}`
  );

  const alertType = document.createElement("h4");
  alertType.setAttribute("class", "advisory-type");
  alertType.textContent = expandType(alert.effect_name);

  const flag = document.createElement("span");
  flag.setAttribute("class", `alert-status ${status.toLowerCase()}`);
  flag.append(status);
  alertType.append(flag);

  const alertTitle = document.createElement("p");
  alertTitle.setAttribute("class", "advisory-title");
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
    alertDates.setAttribute("class", "advisory-dates");
    // else if only one effective date range
  } else if (alert.effect_periods.length === 1) {
    alertDates.textContent = `Effective Dates: ${processAlertDates(
      alert.effect_periods[0].effect_start,
      alert.effect_periods[0].effect_end
    )}`;
    alertDates.setAttribute("class", "advisory-dates");
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
  return alertContent;
}

/* Helper Functions
 ******************************************************* */

/**
 * Outputs array of effective dates to human readable string
 *
 * @param {Array} dates Effective dates for the alert
 * @returns String
 */
function printDates(dates) {
  let str = "Effective Dates: ";
  for (let i = 0; i < dates.length; i++) {
    if (i === dates.length - 1) {
      str += `and ${processAlertDates(
        dates[i].effect_start,
        dates[i].effect_end
      )}`;
    } else {
      str += `${processAlertDates(
        dates[i].effect_start,
        dates[i].effect_end
      )}, `;
    }
  }
  return str;
}

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
 * Generates text for alert effective dates
 *
 * @param {Int} start
 * @param {Int} end
 * @returns String describing effective dates
 */
function processAlertDates(startDate, endDate) {
  const today = Math.round(new Date().getTime() / 1000);
  const start = convertEpoch(startDate);
  const end = convertEpoch(endDate);

  if (start === end) {
    // if start and end dates are the same, return one value
    return start;
  } else if (endDate < today) {
    // if end date is out of range, swap end value for until further notice
    return `${start} until further notice`;
  } else {
    // else return date range
    return `${start} to ${end}`;
  }
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

    case "Delay of Service":
      text = "timer";
      break;

    case "Emergency Snow Network":
    case "Snow Route":
      text = "ac_unit";
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
  res = res.replaceAll(/ Ave?\b/gm, " Avenue");
  res = res.replaceAll(/ St\b/gm, " Street");
  res = res.replaceAll(/ Pl\b/gm, " Place");
  res = res.replaceAll(/ Rd\b/gm, " Road");
  res = res.replaceAll(/ Pkwy\b/gm, " Parkway");
  res = res.replaceAll(/ Blvd\b/gm, " Boulevard");

  res = res.replaceAll(/ Lk\b/gm, " Lake");
  res = res.replaceAll(/ Samm\b/gm, " Sammamish");

  return res;
}

/**
 * Expands alert type text for improved accessibility
 *
 * @param {String} type
 * @returns expanded version of alert type
 */
function expandType(type) {
  let res = "";
  res = type.replaceAll(/ESN\b/gm, " Emergency Snow Network");
  return res;
}

/**
 * Generates text for status flag and alert classes
 *
 * @param {String} status
 * @returns String to display in status flag and classnames
 */
function statusText(status) {
  if (status === "New" || status.includes("Ongoing")) return "ongoing";
  return "upcoming";
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
  accordion.setAttribute("class", `accordion accordion-flush ${show}`);

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
function searchRoutes(showClear = false) {
  if (showClear) {
    const clearBttn = document.getElementById("clear-search");
    clearBttn.setAttribute("style", "visibility: visible;");
  }

  // get the search value
  const input = document.getElementById("route-search").value.toLowerCase();

  // filter routes
  const routes = document.getElementsByClassName("advisory-block");
  for (route of routes) {
    const routeName = route.getAttribute("data-route").toLowerCase();
    if (!routeName.includes(input)) {
      route.setAttribute("style", "display:none;");
    } else {
      route.setAttribute("style", "display:block;");
    }
  }
}

function clearSearch() {
  const clearBttn = document.getElementById("clear-search");
  clearBttn.setAttribute("style", "visibility: hidden;");

  const searchInput = document.getElementById("route-search");
  searchInput.value = "";
  searchRoutes(false);
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
