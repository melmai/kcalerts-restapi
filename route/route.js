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
  console.log(routeNames);

  // get the route IDs
  const routeIDs = await Promise.all(
    routeNames.map(async (routeName) => {
      return await getRouteID(BASE_URL, API_KEY, routeName);
    })
  );
  console.log(routeIDs);

  // get the alerts by route ID
  const data = await Promise.all(
    routeIDs.map(async (routeID) => {
      return await getAlertsByRoute(BASE_URL, API_KEY, routeID);
    })
  );
  console.log(data);

  // build accordion
  let accordion = new DocumentFragment();
  accordion.append(buildAccordion());
  alertContainer.append(accordion);
  // data.forEach((data, idx) => {
  //   accordion.append(createRoutePanel(data, idx));
  // });
  // alertContainer.append(accordion);
}

function buildAccordion() {
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
  toggleBlock.append(button, label);
  return toggleBlock;
}

function createRoutePanel(data, id) {}

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
