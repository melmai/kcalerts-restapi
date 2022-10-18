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
  data.forEach((data, idx) => {
    accordion.append(createRoutePanel(data, idx));
  });
  alertContainer.append(accordion);
}

/**
 * Builds route panel with alerts
 *
 * @param {object} route
 * @param {Int} id
 * @returns route element with alerts
 */
function createRoutePanel(data, id) {
  // create parent fragment
  let routePanel = new DocumentFragment();
  const routeName = routeLabel(data.route_name);

  // create panel elements
  const header = document.createElement("div");
  header.id = data.route_id;

  // const ongoingClass = data.status.ongoing ? "ongoing" : "";
  // const upcomingClass = data.status.upcoming ? "upcoming" : "";
  // header.setAttribute(
  //   "class",
  //   `accordion-item ${ongoingClass} ${upcomingClass}`
  // );
  header.setAttribute("class", `accordion-item `);
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
  // let ongoing, upcoming;
  // if (route.status.ongoing > 0) {
  //   ongoing = document.createElement("span");
  //   ongoing.setAttribute("class", "ongoing");
  //   ongoing.textContent = route.status.ongoing;
  // }

  // if (route.status.upcoming > 0) {
  //   upcoming = document.createElement("span");
  //   upcoming.setAttribute("class", "upcoming");
  //   upcoming.textContent = route.status.upcoming;
  // }

  // alertStatus.append(ongoing || "", upcoming || "");

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
  data.alerts.forEach((alert, idx) => {
    alertBody.append(createAlertPanel(alert, idx));
  });
  header.append(alertBody);
  routePanel.append(header);
  return routePanel;
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
