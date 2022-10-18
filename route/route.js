window.addEventListener("DOMContentLoaded", generateAlerts);

async function generateAlerts() {
  let path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/241-545";
  //   path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/217-212";
  //   path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/240-241-245";
  //   const path = window.location.pathname;
  const alertContainer = document.getElementById("accordion");
  const BASE_URL = "http://107.23.133.228:8090/developer/api/v2";
  const API_KEY = "4oJedLBt80WP-d7E6Ekf5w";

  // TODO replace static route with parsed version from window.location.pathname
  const routeNames = parseRoutes(path);

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
  console.log(data);

  // build accordion
  let accordion = new DocumentFragment();
  accordion.append(buildAccordion(data));
  alertContainer.append(accordion);
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
  const statusFlag = document.createElement("span");
  statusFlag.setAttribute("class", "route-status ongoing");
  statusFlag.textContent = "3";

  label.append(statusFlag);
  toggleBlock.append(button, label, createAlertsPanel(data));
  return toggleBlock;
}

function createAlertsPanel(data) {
  // create panel to hold route alerts
  const alerts = document.createElement("div");
  alerts.setAttribute("class", "toggle-inner");

  data.forEach((data) => {
    alerts.append(generateRouteAlerts(data));
  });
  return alerts;
}

function generateRouteAlerts(data) {
  const routeData = new DocumentFragment();

  // route header
  const routeHeader = document.createElement("h3");
  routeHeader.setAttribute("class", "route-header");
  routeHeader.textContent = data.route_name;
  routeData.append(routeHeader);

  // print alerts
  data.alerts.forEach((alert, idx) => {
    routeData.append(generateSingleAlert(alert, idx));
  });

  return routeData;
}

function generateSingleAlert(alert, idx) {
  // alert panel
  const alertPanel = document.createElement("div");
  alertPanel.setAttribute(
    "class",
    `advisory-content ${icon(alert.effect_name)}`
  );

  // alert type
  const type = document.createElement("h4");
  type.setAttribute("class", "advisory-type");
  type.textContent = alert.effect_name;

  // alert flag
  const flag = document.createElement("span");
  flag.setAttribute("class", "advisory-status ongoing");
  flag.textContent = "ongoing";

  type.append(flag);

  // alert title
  const title = document.createElement("p");
  title.setAttribute("class", "advisory-title");
  title.textContent = accessibleText(alert.header_text);

  // description toggle
  const toggleLink = document.createElement("div");
  toggleLink.setAttribute("class", "toggle-link");

  const checkbox = document.createElement("input");
  checkbox.id = `detail-${idx}`;
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "details");
  checkbox.setAttribute("aria-hidden", "true");

  const label = document.createElement("label");
  label.setAttribute("for", `detail-${idx}`);
  label.setAttribute("class", "toggle-link-label");
  label.setAttribute("aria-hidden", "true");

  let description = "";
  if (alert.description_text) {
    description = document.createElement("p");
    description.setAttribute("class", "advisory-detail");
    description.textContent = accessibleText(alert.description_text);
  }

  toggleLink.append(checkbox, label, description);

  // alert dates
  const dates = document.createElement("p");
  dates.setAttribute("class", "advisory-dates");
  dates.textContent = "Effective Dates: 4/2/2022 to 1/1/2023";

  alertPanel.append(type, title, toggleLink, dates);
  return alertPanel;
}

function parseRoutes(path) {
  // extract route numbers from path
  let routes = path.match(/(\d+)/g);
  // remove leading zeros
  return routes.map((route) => route.replaceAll(/^0+/g, ""));
}

async function getRouteID(baseURL, apiKey, routeName) {
  // get all routes
  const routes = await fetch(`${baseURL}/routes?api_key=${apiKey}`).then(
    (res) => res.json()
  );

  // find the route ID we're looking for based on its name
  const route = routes.mode[1].route.find(
    (route) => route.route_name === routeName
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
