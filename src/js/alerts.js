import {
  printDates,
  cleanup,
  uniqueRoutes,
  processAlertDates,
  icon,
  accessibleText,
  routeLabel,
  organizeRoutes,
  showAlerts,
  searchRoutes,
  clearSearch,
  toggleDetails,
  expandType,
} from "./helpers";

window.addEventListener("DOMContentLoaded", createAlerts);

function createAlerts() {
  const allAlerts = document.getElementById("kcalert-accordion");

  // remote API
  const BASE_URL = "https://kcm-api-test.ibi-transit.com/developer/api/v2";
  const API_KEY = "gvMjFrABizrQwye9KBD3KB";

  const REMOTE_ALERT_API = `${BASE_URL}/alerts?api_key=${API_KEY}`;
  const REMOTE_ROUTES_API = `${BASE_URL}/routes?api_key=${API_KEY}`;

  // local JSON
  const LOCAL_ALERT_DATA = "../static/json/alerts20221207.json";
  const LOCAL_ROUTE_DATA = "../static/json/routes.json";

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
