window.addEventListener("DOMContentLoaded", generateAlerts);

async function generateAlerts() {
  const path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/545";
  //   const path = window.location.pathname;
  const alertContainer = document.getElementById("advisory-block-wrapper");
  const BASE_URL = "http://107.23.133.228:8090/developer/api/v2";
  const API_KEY = "4oJedLBt80WP-d7E6Ekf5w";

  // TODO replace static route with parsed version from window.location.pathname
  const routeName = parseRoutes(path) || "7"; // route 7

  const routeID = await getRouteIDs(BASE_URL, API_KEY, routeName);
  console.log(routeID);

  // find alerts based on route ID
  const alerts = await fetch(
    `${BASE_URL}/alertsbyroute?api_key=${API_KEY}&route=${routeID}`
  ).then((res) => res.json());
  console.log(alerts.alerts);
}

function parseRoutes(path) {
  return path.match(/(\d+)/)[0].replaceAll("0", "");
}

async function getRouteIDs(baseURL, apiKey, routeNames) {
  // get all routes and find the one we're looking for
  // TODO find for all routes (multi-route pages)
  console.log(routeNames);
  const routes = await fetch(`${baseURL}/routes?api_key=${apiKey}`).then(
    (res) => res.json()
  );

  // find the route ID we're looking for
  const route = routes.mode[1].route.find(
    (route) => route.route_name === routeNames
  );
  console.log(route);
  return route.route_id;
}
