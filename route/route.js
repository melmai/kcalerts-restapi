window.addEventListener("DOMContentLoaded", generateAlerts);

async function generateAlerts() {
  let path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/545";
  //   path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/217-212";
  path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/240-241";
  //   const path = window.location.pathname;
  const alertContainer = document.getElementById("advisory-block-wrapper");
  const BASE_URL = "http://107.23.133.228:8090/developer/api/v2";
  const API_KEY = "4oJedLBt80WP-d7E6Ekf5w";

  // TODO replace static route with parsed version from window.location.pathname
  const routeNames = parseRoutes(path);
  console.log(routeNames);

  if (routeNames.length === 1) {
    const routeID = await getRouteID(BASE_URL, API_KEY, routeNames[0]);
    console.log(routeID);

    const alerts = await getAlertsByRoute(BASE_URL, API_KEY, routeID);
    console.log(alerts);
  } else {
    let alerts = [];
    Promise.all([
      getRouteID(BASE_URL, API_KEY, routeNames[0]),
      getRouteID(BASE_URL, API_KEY, routeNames[1]),
    ]).then((res) => {
      console.log(res);
      Promise.all([
        getAlertsByRoute(BASE_URL, API_KEY, res[0]),
        getAlertsByRoute(BASE_URL, API_KEY, res[1]),
      ]).then((res) => {
        alerts = res;
        console.log(alerts);
      });
    });
  }
}

function parseRoutes(path) {
  let routes = path.match(/(\d+)/g); // extract route numbers from path
  return routes.map((route) => route.replaceAll(/^0+/g, "")); // remove leading zeros
}

async function getRouteID(baseURL, apiKey, routeName) {
  // get all routes and find the one we're looking for
  // TODO find for all routes (multi-route pages)
  const routes = await fetch(`${baseURL}/routes?api_key=${apiKey}`).then(
    (res) => res.json()
  );

  // find the route ID we're looking for
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
