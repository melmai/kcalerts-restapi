import { BASE_URL, API_KEY } from "./cred";
import { countAlertTypes } from "./helpers";
import { generateSingleAlert } from "./single-alert";

window.addEventListener("DOMContentLoaded", generateAlerts);

async function generateAlerts() {
  const alertContainer = document.getElementById("accordion");
  const isRemote = false;

  let data;
  if (isRemote) {
    data = await getRemoteAlerts();

    // if no alerts, don't render accordion
    let alerts = false;
    data.forEach((route) => {
      if (route.alerts.length > 0) alerts = true;
    });

    if (!alerts) return;
  } else {
    let json;
    json = "../static/json/route/c-line.json";
    json = "../static/json/route/007.json";
    // json = "../static/json/route/271.json";

    data = await fetch(json).then((res) => res.json());
    data = [data];
  }
  console.log(data);

  // build accordion
  let accordion = new DocumentFragment();
  accordion.append(buildAccordion(data));
  alertContainer.append(accordion);
}

async function getRemoteAlerts() {
  let path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/241";
  path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/c-line.html"; // alpha routes
  // path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/241-545"; // 2 routes
  // path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/217-241-245"; // 3 routes
  // path = window.location.pathname;

  const routeNames = parseRoutes(path.split("/").pop());

  // get the route IDs
  const routeIDs = await Promise.all(
    routeNames.map(async (routeName) => {
      return await getRouteID(BASE_URL, API_KEY, routeName);
    })
  );

  // get the alerts by route ID
  const data = await Promise.all(
    routeIDs.map(async (routeID) => {
      return await getAlertsByRoute(BASE_URL, API_KEY, routeID);
    })
  );

  return data;
}

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

  // status flag
  const statusFlags = document.createElement("span");
  statusFlags.setAttribute("class", "route-status");

  const flagData = countAlertTypes(data);

  if (flagData.ongoing > 0) {
    const ongoingFlag = document.createElement("span");
    ongoingFlag.textContent = flagData.ongoing;
    ongoingFlag.setAttribute("class", "ongoing");
    statusFlags.append(ongoingFlag);
  }
  if (flagData.upcoming > 0) {
    const upcomingFlag = document.createElement("span");
    upcomingFlag.textContent = flagData.upcoming;
    upcomingFlag.setAttribute("class", "upcoming");
    statusFlags.append(upcomingFlag);
  }

  label.append(statusFlags);
  toggleBlock.append(button, label, createAlertsPanel(data));
  return toggleBlock;
}

function createAlertsPanel(data) {
  // create panel to hold route alerts
  const alerts = document.createElement("div");
  alerts.setAttribute("class", "toggle-inner");
  const isMultiple = data.length > 1;

  data.forEach((data, idxa) => {
    alerts.append(generateRouteAlerts(data, idxa, isMultiple));
  });
  return alerts;
}

function generateRouteAlerts(data, idxa, isMultiple) {
  const routeData = new DocumentFragment();

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

async function getRouteID(baseURL, apiKey, routeName) {
  // get all routes
  const routes = await fetch(`${baseURL}/routes?api_key=${apiKey}`).then(
    (res) => res.json()
  );

  // find the route ID we're looking for based on its name
  const route = routes.mode[1].route.find(
    (route) => route.route_name.toLowerCase() === routeName
  );
  return route.route_id;
}

async function getAlertsByRoute(baseURL, apiKey, routeID) {
  // find alerts based on route ID
  const alerts = await fetch(
    `${baseURL}/alertsbyroute?api_key=${apiKey}&route=${routeID}`
  ).then((res) => res.json());
  return alerts;
}
