window.addEventListener("DOMContentLoaded", systemAlertInit);

function systemAlertInit() {
  const systemAlertContainer = document.getElementById("system-alerts-banner");

  // remote API
  const BASE_URL = "https://kcm-api-test.ibi-transit.com/developer/api/v2";
  const API_KEY = "gvMjFrABizrQwye9KBD3KB";
  const REMOTE_ALERT_API = `${BASE_URL}/alerts?api_key=${API_KEY}`;

  // local data
  const LOCAL_ALERT_DATA = "../static/json/alerts20221207.json";

  // set fetch type
  const isRemote = false;
  const ALERT_URL = isRemote ? REMOTE_ALERT_API : LOCAL_ALERT_DATA;

  fetch(ALERT_URL)
    .then((res) => res.json())
    .then((res) => {
      const bannerAlerts = getBannerAlerts(res.alerts);
      let featuredAlert = bannerAlerts[0];
      if (bannerAlerts.length > 1) featuredAlert = featuredAlert(bannerAlerts);
      systemAlertContainer.append(buildBanner(featuredAlert));
    });
}

// generate list of alerts with banner text
function getBannerAlerts(alerts) {
  let bannerAlerts = [];
  alerts.forEach((alert) => {
    if (alert.banner_text) bannerAlerts.push(alert);
  });

  console.log(bannerAlerts);
  return bannerAlerts;
}

// get most recent alert
function featuredAlert(alerts) {}

// build banner with most recent alert
function buildBanner(alert) {
  const bannerContent = new DocumentFragment();

  // title
  const title = document.createElement("h2");
  title.textContent = "Title";

  // text
  const bodyText = document.createElement("p");
  bodyText.textContent = alert.banner_text;

  // effective date
  const date = document.createElement("span");
  date.textContent = processAlertDates(
    alert.effect_periods[0].effect_start,
    alert.effect_periods[0].effect_end
  );

  // link
  const link = document.createElement("a");
  link.setAttribute("href", "#");
  link.textContent = "";

  bannerContent.append(title, bodyText, date);
  return bannerContent;
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
