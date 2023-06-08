/**
 * alerts-route.js
 *
 * This file generates the alert accordion on specific route pages. The page
 * can be for a single route, or for multiple routes. Multiple routes will be
 * identified by a route header within the accordion. The data being pulled can
 * be either local or remote, which is controlled by the IS_REMOTE variable in
 * settings.js
 *
 * To change the local data, add the json file to dist/static/json and update the
 * variable in settings.js
 */

import {
  IS_REMOTE,
  REMOTE_ROUTES_API,
  REMOTE_SINGLE_ALERT_API,
  LOCAL_ROUTE_DATA,
  ROUTE,
} from "./settings";
import { countAlertTypes, createStatusFlag } from "./modules/helpers";
import { generateSingleAlert } from "./modules/single-alert";

window.addEventListener("load", generateAlerts);

/**
 * Init Function
 */
async function generateAlerts() {
  const alertContainer = document.getElementById("alert-accordion");

  let data;
  if (IS_REMOTE) {
    // fetch remote data
    data = await getRemoteAlerts();
  } else {
    // fetch data locally
    data = await fetch(LOCAL_ROUTE_DATA).then((res) => res.json());

    // if local data is for a single route, set to an array
    if (!ROUTE.includes("-")) data = [data];
  }

  // remove system alerts
  data = removeSystemAlerts(data);

  // if no alerts, don't render accordion
  let alerts = false;
  data.forEach((route) => {
    if (route.alerts.length > 0) alerts = true;
  });
  if (!alerts) return;

  // build accordion
  let accordion = new DocumentFragment();
  accordion.append(buildAccordion(data));
  alertContainer.append(accordion);
}

/**
 * Fetches API data
 * @returns data array for routes parsed from URL string
 */
async function getRemoteAlerts() {
  // get route name from URL path
  const path = window.location.pathname;
  const routeNames = parseRoutes(path.split("/").pop());

  // get the route IDs
  const routeIDs = await Promise.all(
    routeNames.map(async (routeName) => {
      return await getRouteID(routeName);
    })
  );

  // get the alerts by route ID
  const data = await Promise.all(
    routeIDs.map(async (routeID) => {
      return await getAlertsByRoute(routeID);
    })
  );

  return data;
}

/**
 * Builds accordion container to hold service alerts
 *
 * @param {Array} data
 * @returns accordion panel within a div
 */
function buildAccordion(data) {
  // construct main panel
  const toggleBlock = document.createElement("div");
  toggleBlock.setAttribute("class", "toggle advisory-block");

  // button
  const button = document.createElement("input");
  button.id = "toggle-advisory";
  button.setAttribute("type", "checkbox");
  button.setAttribute("name", "advisory");
  button.setAttribute("aria-hidden", "true");

  // button label
  const label = document.createElement("label");
  label.setAttribute("for", "toggle-advisory");
  label.setAttribute(
    "class",
    "toggle-head advisory-block-title with-description"
  );
  label.textContent = "Service Advisory";

  // status flag container
  const statusFlags = document.createElement("span");
  statusFlags.setAttribute("class", "route-status");

  // get alerts by type
  const flagData = countAlertTypes(data);

  // add status icons based on alert type
  if (flagData.ongoing > 0) {
    const ongoingFlag = createStatusFlag("ongoing", flagData.ongoing);
    statusFlags.append(ongoingFlag);
  }
  if (flagData.upcoming > 0) {
    const upcomingFlag = createStatusFlag("upcoming", flagData.upcoming);
    statusFlags.append(upcomingFlag);
  }

  label.append(statusFlags);
  toggleBlock.append(button, label, createAlertsPanel(data));
  return toggleBlock;
}

/**
 * Builds accordion section inner panel for a single route's alerts
 *
 * @param {Array} data
 * @returns alerts within a div element
 */
function createAlertsPanel(data) {
  // create panel to hold route alerts
  const alerts = document.createElement("div");
  alerts.setAttribute("class", "toggle-inner");
  const isMultiple = data.length > 1;

  data.forEach((data) => {
    alerts.append(generateRouteAlerts(data, isMultiple));
  });
  return alerts;
}

/**
 * Builds grouping of alerts
 *
 * @param {Array} data
 * @param {Boolean} isMultiple
 * @returns
 */
function generateRouteAlerts(data, isMultiple) {
  const routeData = new DocumentFragment();

  // build header section if multiple routes exist on this page
  if (isMultiple && data.alerts.length > 0) {
    const routeHeader = document.createElement("h3");
    routeHeader.setAttribute("class", "route-header");
    routeHeader.textContent = data.route_name;
    routeData.append(routeHeader);
  }

  // print alerts
  data.alerts.forEach((alert) => {
    routeData.append(generateSingleAlert(alert));
  });

  return routeData;
}

/**
 * Determines routes that exist within the URL path
 *
 * @param {String} path
 * @returns array of route names
 */
function parseRoutes(path) {
  let routes = [];
  if (path[0].charAt(0).match(/[a-z]/i)) {
    // if rapid ride...
    // strip .html if working locally
    if (path.includes(".html")) path = path.replace(".html", "");
    routes[0] = path.replaceAll("-", " ");
  } else {
    // it's a numbered route, it could be multiple routes
    routes = path.match(/(\d+)/g);
    // remove leading zeros
    routes = routes.map((route) => route.replaceAll(/^0+/g, ""));
  }
  return routes;
}

/**
 * Gets IBI route ID for route
 *
 * @param {String} apiKey
 * @param {String} routeName
 * @returns route ID
 */
async function getRouteID(routeName) {
  // get all routes
  const routes = await fetch(REMOTE_ROUTES_API).then((res) => res.json());

  // find the route ID we're looking for based on its name
  const route = routes.mode[1].route.find(
    (route) => route.route_name.toLowerCase() === routeName
  );
  return route.route_id;
}

/**
 * Fetches alert data for a specific route by ID
 *
 * @param {String} apiKey
 * @param {String} routeID
 * @returns array of alerts
 */
async function getAlertsByRoute(routeID) {
  const fetchURL = REMOTE_SINGLE_ALERT_API + routeID;
  // find alerts based on route ID
  const alerts = await fetch(fetchURL).then((res) => res.json());
  return alerts;
}

function removeSystemAlerts(data) {
  let res = data;
  res.forEach((route) => {
    let alerts = [];
    route.alerts.forEach((alert) => {
      const services = alert.affected_services.services;
      for (let i = 0; i < services.length; i++) {
        if (services[i].hasOwnProperty("route_name")) {
          alerts.push(alert);
          break;
        }
      }
    });
    route.alerts = alerts;
  });
  return res;
}
