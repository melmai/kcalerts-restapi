window.addEventListener("DOMContentLoaded", generateAlerts);

async function generateAlerts() {
  const path = "/sitecore/content/KCGov/home/depts/metro/schedules-maps/007";
  //   const path = window.location.pathname;
  const alertContainer = document.getElementById("advisory-block-wrapper");
  const BASE_URL = "http://107.23.133.228:8090/developer/api/v2";
  const API_KEY = "4oJedLBt80WP-d7E6Ekf5w";

  const routeName = "7"; // route 7

  const routes = await fetch(`${BASE_URL}/routes?api_key=${API_KEY}`).then(
    (res) => res.json()
  );

  // find the route ID we're looking for
  const route = routes.mode[1].route.find(
    (route) => route.route_name === routeName
  );
  console.log(route);
  const routeID = route.route_id;
  console.log(routeID);

  // find alerts based on route ID
  const alerts = await fetch(
    `${BASE_URL}/alertsbyroute?api_key=${API_KEY}&route=${routeID}`
  ).then((res) => res.json());
  console.log(alerts.alerts);
}
