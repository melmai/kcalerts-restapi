/**
 * alerts-list.js
 *
 * This file controls the main list of alerts/advisories. The data is pulled locally or
 * remotely, based on the IS_REMOTE variable in settings.js.
 *
 * To change the local data, add the json file to dist/static/json and update the setting
 * in settings.js
 *
 */

import {
  IS_REMOTE,
  REMOTE_ALERTS_API,
  LOCAL_ALERTS_DATA,
  REMOTE_ROUTES_API,
  LOCAL_ROUTES_DATA,
} from "./settings";
import {
  cleanup,
  uniqueRoutes,
  routeLabel,
  organizeRoutes,
  incrementStatusType,
  incrementSnowCount,
  createStatusFlag,
} from "./modules/helpers";
import {
  showAlerts,
  notifyNoResults,
  searchRoutes,
  clearSearch,
} from "./modules/events";
import { generateSingleAlert } from "./modules/single-alert";

if (document.readyState !== "loading") {
  createAlerts();
} else {
  window.addEventListener("DOMContentLoaded", createAlerts);
}

/**
 * Init Function
 */
function createAlerts() {
  const allAlerts = document.getElementById("kcalert-accordion");

  // set fetch URLs
  const ALERT_URL = IS_REMOTE ? REMOTE_ALERTS_API : LOCAL_ALERTS_DATA;
  const ROUTE_URL = IS_REMOTE ? REMOTE_ROUTES_API : LOCAL_ROUTES_DATA;

  // fetch data
  Promise.all([
    fetch(ALERT_URL).then((res) => res.json()),
    fetch(ROUTE_URL).then((res) => res.json()),
  ])
    .then((res) => {
      // process data
      const alerts = processAlerts(res[0].alerts); // array of objs that hold the alert and pertinent routes
      const routes = organizeRoutes(res[1].mode[1].route); // array of all available routes
      console.log(res[1]);
      const allData = cleanup(processData(alerts, routes));
      // console.log("route data");

      // build accordion
      let accordion = new DocumentFragment();
      allData.forEach((route, idx) => {
        accordion.append(createRoutePanel(route, idx));
      });

      allAlerts.append(accordion);

      // attach event handlers
      setupListEvents(allAlerts);
    })
    .catch((err) => {
      console.log("error with create fxn", err);
    });
}

/* Process API Data / Backend
 ******************************************************* */
/**
 * Organizes the alert data by route and alert type count
 *
 * @param {Array} alertArr array of alert objects with alert and array of route_id
 * @param {Array} routeArr array of route objects with route_id and route_name properties
 */
function processData(alertArr, routeArr) {
  let routes = routeArr;
  // console.log(routes);

  alertArr.forEach((data) => {
    // console.log(data);
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

          // set snow flag
          route.is_snow = incrementSnowCount(
            data.alert.effect_name,
            route.is_snow
          );
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

  // set status class for filtering
  const ongoingClass = route.status.ongoing ? "ongoing" : "";
  const upcomingClass = route.status.upcoming ? "upcoming" : "";
  header.setAttribute(
    "class",
    `toggle advisory-block ${ongoingClass} ${upcomingClass}`
  );
  header.setAttribute("data-route", routeName);

  // create toggle for accordion as button header
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

  // route name
  const title = document.createElement("h2");
  title.setAttribute("class", "accordion-title");
  title.textContent = routeName;

  // status flag icon container
  const alertStatus = document.createElement("div");
  alertStatus.setAttribute("class", "route-status");
  alertStatus.setAttribute("aria-hidden", "true");

  // create status flags and add to container
  let snow, ongoing, upcoming;
  if (route.is_snow > 0) snow = createStatusFlag("snow", route.is_snow);

  if (route.status.ongoing > 0)
    ongoing = createStatusFlag("ongoing", route.status.ongoing);

  if (route.status.upcoming > 0)
    upcoming = createStatusFlag("upcoming", route.status.upcoming);

  alertStatus.append(snow || "", ongoing || "", upcoming || "");

  // add elements to route header section
  label.append(title, alertStatus);
  header.append(button, label);

  // create alert container
  const alertBody = document.createElement("div");
  alertBody.setAttribute("class", "toggle-inner");

  // append alerts to alert container
  route.alerts.forEach((alert, idx) => {
    alertBody.append(generateSingleAlert(alert));
  });
  header.append(alertBody);
  routePanel.append(header);
  return routePanel;
}

/**
 * Sets up all event listeners
 *
 * @param {HTMLElement} element to watch
 */
function setupListEvents(element) {
  // reset to default view
  const reset = document.getElementById("reset");
  reset.addEventListener("click", () => showAlerts());

  // show only ongoing alerts
  const ongoingAlertsBttn = document.getElementById("ongoing-filter");
  ongoingAlertsBttn.addEventListener("click", () =>
    showAlerts("ongoing", "upcoming")
  );

  // show only upcoming alerts
  const upcomingAlertsBttn = document.getElementById("upcoming-filter");
  upcomingAlertsBttn.addEventListener("click", () =>
    showAlerts("upcoming", "ongoing")
  );

  // search input
  const searchInput = document.getElementById("route-search");
  searchInput.addEventListener("keyup", () => searchRoutes(true));

  // clear search
  const clearInput = document.getElementById("clear-search");
  clearInput.addEventListener("click", clearSearch);

  // notify user if no results
  notifyNoResults(element);
}
