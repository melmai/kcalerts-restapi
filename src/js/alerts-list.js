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
import { Fancybox } from "@fancyapps/ui";
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
  getSystemAlerts,
} from "./modules/helpers";
import {
  showAlerts,
  searchRoutes,
  clearSearch,
  showAlertType,
  initLottie,
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
  const snowMap = document.getElementById("snow-map-link");

  // set fetch URLs
  const ALERT_URL = IS_REMOTE ? REMOTE_ALERTS_API : LOCAL_ALERTS_DATA;
  const ROUTE_URL = IS_REMOTE ? REMOTE_ROUTES_API : LOCAL_ROUTES_DATA;
  // const ALERT_URL = "https://cm10-prod.kingcounty.gov/~/media/king-county/fe-apps/metro/service-advisories/snow-alerts-json.json";
  // const ROUTE_URL = REMOTE_ROUTES_API;

  // fetch data
  Promise.all([
    fetch(ALERT_URL).then((res) => res.json()),
    fetch(ROUTE_URL).then((res) => res.json()),
  ])
    .then((res) => {
      // process data
      // TODO: refactor to generate an object that separates routes by mode
      // const alerts = processAlerts(res[0].alerts); // array of objs that hold the alert and pertinent routes
      const [rail, bus, marine] = res[1].mode;
      const busRoutes = organizeRoutes(bus.route);
      const alerts = getAlertsByMode(res[0].alerts);
      console.log("alerts", alerts);

      // number of alerts for each mode
      const busCount = alerts.bus.length;
      const railCount = alerts.rail.length;
      const marineCount = alerts.waterTaxi.length;
      const elevatorCount = alerts.elevators.length;
      const systemCount = alerts.systemAlerts.length;

      // TODO: create banner for system alert on list page
      // const systemAlerts = getSystemAlerts(res[0].alerts);

      let data = cleanup(processData(processAlerts(alerts.bus), busRoutes));

      // snow flag
      let snow = false;

      // build accordion
      let accordion = new DocumentFragment();

      // loop through data and create route panels
      let container = document.createElement("div");
      container.id = "bus-alerts";
      container.setAttribute("class", "alerts bus-alerts");
      data.forEach((route, idx) => {
        if (!snow && route.is_snow > 0) snow = true;
        container.append(createRoutePanel(route, "bus", idx));
      });
      accordion.append(container);

      console.log("bus done");

      // loop through data and create rail panels
      data = cleanup(processData(processAlerts(alerts.rail), rail.route));
      container = document.createElement("div");
      container.id = "rail-alerts";
      container.setAttribute("class", "alerts rail-alerts");
      container.style.display = "none";

      data.forEach((route, idx) => {
        container.append(createRoutePanel(route, "rail", idx));
      });
      accordion.append(container);
      console.log("rail done");

      // loop through data and create water taxi panels
      data = cleanup(
        processData(processAlerts(alerts.waterTaxi), marine.route)
      );
      container = document.createElement("div");
      container.id = "water-taxi-alerts";
      container.setAttribute("class", "alerts water-taxi-alerts");
      container.style.display = "none";
      data.forEach((alert, idx) => {
        container.append(createRoutePanel(route, "marine", idx));
      });
      accordion.append(container);
      console.log("marine done");

      // loop through data and create elevator alerts
      data = alerts.elevators;
      container = document.createElement("div");
      container.id = "elevator-alerts";
      container.setAttribute("class", "alerts elevator-alerts");
      container.style.display = "none";
      data.forEach((alert, idx) => {
        container.append(createRoutePanel(alert, "elevator", idx));
      });
      accordion.append(container);
      console.log("elevator done");

      // show snow map link
      if (snow) {
        snowMap.classList.remove("d-none");
      }

      // remove load spinner
      document.getElementById("loading").remove();

      // test lottie
      initLottie();

      // add system alerts
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

  alertArr.forEach((data) => {
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
 * Creates an object that holds alerts separated by mode
 *
 * @param {Array} alerts array of alert objects
 * @returns an object with keys for each mode
 */
function getAlertsByMode(alerts) {
  const busAlerts = [];
  const railAlerts = [];
  const waterTaxiAlerts = [];
  const elevatorAlerts = [];
  const systemAlerts = [];

  for (const alert of alerts) {
    if (alert.affected_services.elevators.length) {
      elevatorAlerts.push(alert);
    } else if (alert.affected_services.services[0].mode_name === "Rail") {
      railAlerts.push(alert);
    } else if (alert.affected_services.services[0].mode_name === "Marine") {
      waterTaxiAlerts.push(alert);
    } else if (alert.affected_services.services[0].mode_name === "Bus") {
      busAlerts.push(alert);
    } else {
      systemAlerts.push(alert);
    }
  }

  return {
    bus: busAlerts,
    rail: railAlerts,
    waterTaxi: waterTaxiAlerts,
    elevators: elevatorAlerts,
    systemAlerts: systemAlerts,
  };
}

/**
 * Process all alerts
 *
 * @param {Array} alerts
 * @returns an array of objects that contain an alert and its unique routes
 */
function processAlerts(alerts, type = "bus") {
  let result = [];

  if (type === "elevator") {
    alerts.forEach((alert) => {
      const routes = uniqueRoutes(
        alert.affected_services.elevators,
        "elevator"
      );

      result.push({
        // route_ids: routes,
        alert: alert,
        status: statusText(alert.alert_lifecycle),
      });
    });
  } else {
    // loop through all alerts and create an array of routes that have alerts
    alerts.forEach((alert) => {
      const routes = uniqueRoutes(alert.affected_services.services, "alert");

      result.push({
        route_ids: routes,
        alert: alert,
        status: alert.alert_lifecycle,
      });
    });
  }

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
function createRoutePanel(route, type = "bus", idx) {
  // create parent fragment
  let routePanel = new DocumentFragment();

  let routeName;
  if (type === "elevator") {
    routeName = route.affected_services.elevators[0].elev_name;
  } else {
    routeName = routeLabel(route.route_name);
  }

  // create panel elements
  const id = route.route_id || route.alert_id;
  const header = document.createElement("div");
  header.id = id;

  // set status class for filtering
  let ongoingClass,
    upcomingClass = "";

  if (route.status) {
    ongoingClass = route.status.ongoing ? "ongoing" : "";
    upcomingClass = route.status.upcoming ? "upcoming" : "";
  } else {
    ongoingClass = "ongoing";
  }
  header.setAttribute(
    "class",
    `toggle advisory-block ${ongoingClass} ${upcomingClass}`
  );
  header.setAttribute("data-route", routeName);

  // create toggle for accordion as button header
  const button = document.createElement("input");
  button.setAttribute("id", `toggle-advisory-${id}`);
  button.setAttribute("type", "checkbox");
  button.setAttribute("name", `toggle-advisory-${id}`);
  button.setAttribute("aria-hidden", "true");

  const label = document.createElement("label");
  label.setAttribute(
    "class",
    "toggle-head advisory-block-title with-description"
  );
  label.setAttribute("for", `toggle-advisory-${id}`);

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

  if (route.status) {
    if (route.status.ongoing > 0)
      ongoing = createStatusFlag("ongoing", route.status.ongoing);

    if (route.status.upcoming > 0)
      upcoming = createStatusFlag("upcoming", route.status.upcoming);
  } else {
    ongoing = createStatusFlag("ongoing", 1);
  }

  alertStatus.append(snow || "", ongoing || "", upcoming || "");

  // add elements to route header section
  label.append(title, alertStatus);
  header.append(button, label);

  // create alert container
  const alertBody = document.createElement("div");
  alertBody.setAttribute("class", "toggle-inner");

  // append alerts to alert container
  if (route.alerts) {
    route.alerts.forEach((alert, idx) => {
      alertBody.append(generateSingleAlert(alert));
    });
  } else {
    alertBody.append(generateSingleAlert(route, "elevator"));
  }
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

  // show alerts by type
  const alertTypeBttns = document.getElementsByClassName("alert-type-bttn");
  for (const bttn of alertTypeBttns) {
    bttn.addEventListener("click", (e) => {
      const type = e.target.dataset.type || e.target.parentElement.dataset.type;
      console.log(type);
      showAlertType(type);
    });
  }

  // search input
  const searchInput = document.getElementById("route-search");
  searchInput.addEventListener("keyup", () => searchRoutes(true));

  // clear search
  const clearInput = document.getElementById("clear-search");
  clearInput.addEventListener("click", clearSearch);
}

// FancyBox
document.getElementById("snow-map-link").addEventListener("click", () => {
  Fancybox.show([
    {
      src: "https://map.metrowinter.com/map-iframe/",
      type: "iframe",
      preload: false,
    },
  ]);
});

Fancybox.bind("[data-fancybox]", {
  // Custom options
  hideScrollbar: true,
});
