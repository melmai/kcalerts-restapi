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

function accessibleDate(ms) {
  const date = new Date(ms);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return { day: day, month: month, year: year };
}

/**
 * Removes routes without ongoing alerts
 *
 * @param {Array} routes an array of routes with route_id, route_name, and alerts properties
 * @returns array of routes with ongoing alerts
 */
function cleanup(routes) {
  return routes.filter((route) => route.alerts);
}

/**
 * Filter array of routes so that only unique routes are listed
 *
 * @param {obj} alert
 * @returns array of routes to append this alert to
 */
function uniqueRoutes(routes, type) {
  if (type === "alert") {
    return [...new Set(routes.map((route) => route.route_id))];
  } else if (type === "route") {
    return [...new Set(routes.map((route) => route))];
  } else {
    return [];
  }
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

    case "Emergency Snow Network":
    case "Snow Routes":
    case "Snow Route":
      text = "ac_unit";
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
  res = res.replaceAll(/ Ave?\b/gm, " Avenue");
  res = res.replaceAll(/ St\b/gm, " Street");
  res = res.replaceAll(/ Pl\b/gm, " Place");
  res = res.replaceAll(/ Rd\b/gm, " Road");
  res = res.replaceAll(/ Pkwy\b/gm, " Parkway");
  res = res.replaceAll(/ Blvd\b/gm, " Boulevard");

  res = res.replaceAll(/ Lk\b/gm, " Lake");
  res = res.replaceAll(/ Samm\b/gm, " Sammamish");

  return res;
}

/**
 * Expands alert type text for improved accessibility
 *
 * @param {String} type
 * @returns expanded version of alert type
 */
function expandType(type) {
  let res = "";
  res = type.replaceAll(/ESN\b/gm, " Emergency Snow Network");
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

/**
 * Adjusts the route title based on route number
 *
 * @todo: adjust Water Taxi route labels to be more descriptive
 *
 * @param {String} route
 * @returns String describing route type
 */
function routeLabel(route) {
  const labels = [
    "Duvall-Monroe Shuttle",
    "Trailhead Direct Mt. Si",
    "First Hill Streetcar",
    "South Lake Union Streetcar",
  ];

  if (labels.includes(route)) return route;
  if (route === "SVT") return "SVT Shuttle";
  if (route === "973") return "West Seattle Water Taxi";
  if (route === "975") return "Vashon Water Taxi";
  if (route.charAt(0).match(/[a-z]/i)) return `RapidRide ${route}`;
  if (isST(route)) return `ST ${route}`;
  if (isDART(route)) return `DART ${route}`;
  return `Route ${route}`;
}

/**
 * Determines if a given route is DART
 *
 * @param {String} route
 * @returns boolean
 */
function isDART(route) {
  const routeNum = parseInt(route);
  if (
    routeNum === 204 ||
    routeNum === 224 ||
    routeNum === 630 ||
    routeNum === 631 ||
    (routeNum >= 901 && routeNum <= 930)
  ) {
    return true;
  }
  return false;
}
/**
 * Determines if a given route operates under Sound Transit Express
 *
 * @param {String} route
 * @returns boolean
 */
function isST(route) {
  const routeNum = parseInt(route);
  if (routeNum >= 500 && routeNum < 600) {
    return true;
  }
  return false;
}

/**
 * Removes shuttle route and places it at the end of the array
 *
 * @param {Array} routes
 * @returns Array of routes in correct order
 */
function organizeRoutes(routes) {
  let shuttleRtes = [];
  let routeArr = [];
  routes.forEach((route) => {
    if (
      route.route_id === "102698" ||
      route.route_id === "102699" ||
      route.route_name === "Trailhead Direct Mt. Si"
    ) {
      shuttleRtes.push(route);
    } else {
      routeArr.push(route);
    }
  });

  return [...routeArr, ...shuttleRtes];
}

function countAlertTypes(data) {
  let ongoing = 0;
  let upcoming = 0;
  let snow = 0;

  data.forEach((route) => {
    route.alerts.forEach((alert) => {
      if (alert.alert_lifecycle === "Upcoming") {
        upcoming++;
      } else {
        ongoing++;
      }

      if (alert.effect_name.toLowerCase().includes("snow")) {
        snow++;
      }
    });
  });

  return {
    ongoing: ongoing,
    upcoming: upcoming,
    snow: snow,
  };
}

/**
 * Increments alert status
 *
 * @param {String} alertStatus
 * @param {Object} routeStatus
 * @returns Object that holds status of alerts for the route
 */
function incrementStatusType(
  alertStatus,
  routeStatus = { ongoing: 0, upcoming: 0 }
) {
  let res = routeStatus;
  if (alertStatus.includes("Ongoing") || alertStatus === "New") {
    res.ongoing = res.ongoing + 1;
  } else {
    res.upcoming = res.upcoming + 1;
  }

  return res;
}

function incrementSnowCount(title, snow = 0) {
  if (title.toLowerCase().includes("snow")) return snow + 1;
  return snow;
}

/**
 * Creates status flag
 *
 * @param {String} type
 * @param {String} text
 * @returns
 */
function createStatusFlag(type, text) {
  const flag = document.createElement("span");
  if (type !== "snow") {
    flag.setAttribute("class", type);
    flag.textContent = text;
  } else {
    flag.setAttribute("class", "snow-icon material-symbols-outlined");
    flag.setAttribute("translate", "no");
    flag.textContent = "ac_unit";
  }
  return flag;
}

export {
  printDates,
  cleanup,
  uniqueRoutes,
  processAlertDates,
  icon,
  accessibleText,
  statusText,
  convertEpoch,
  routeLabel,
  isDART,
  isST,
  organizeRoutes,
  expandType,
  countAlertTypes,
  incrementStatusType,
  incrementSnowCount,
  createStatusFlag,
};
