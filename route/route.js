window.addEventListener("DOMContentLoaded", generateAlerts);

async function generateAlerts() {
  const path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/007";
  //   const path = window.location.pathname;
  const alertContainer = document.getElementById("advisory-block-wrapper");
  const BASE_URL = "http://107.23.133.228:8090/developer/api/v2";
  const API_KEY = "4oJedLBt80WP-d7E6Ekf5w";

  // TODO replace static route with parsed version from window.location.pathname
  const routeName = "7"; // route 7

  // get all routes and find the one we're looking for
  // TODO find for all routes (multi-route pages)
  const routes = await fetch(`${BASE_URL}/routes?api_key=${API_KEY}`).then(
    (res) => res.json()
  );

  // find the route ID we're looking for
  const route = routes.mode[1].route.find(
    (route) => route.route_name === routeName
  );
  const routeID = route.route_id;

  // find alerts based on route ID
  const alerts = await fetch(
    `${BASE_URL}/alertsbyroute?api_key=${API_KEY}&route=${routeID}`
  ).then((res) => res.json());
  console.log(alerts.alerts);
}

function parseRoutes(path) {}
