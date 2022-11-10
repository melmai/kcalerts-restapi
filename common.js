/* Helper Functions
 ******************************************************* */

function countAlertTypes(data) {
  let ongoing = 0;
  let upcoming = 0;

  data.forEach((route) => {
    route.alerts.forEach((alert) => {
      if (alert.alert_lifecycle === "Upcoming") {
        upcoming++;
      } else {
        ongoing++;
      }
    });
  });

  return {
    ongoing: ongoing,
    upcoming: upcoming,
  };
}

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

    case "ESN":
    case "Emergency Snow Network":
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
