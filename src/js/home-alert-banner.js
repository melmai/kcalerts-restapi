import "bootstrap";
import { BASE_URL, API_KEY } from "./cred";
import { processAlertDates } from "./helpers";

window.addEventListener("DOMContentLoaded", systemAlertInit);

function systemAlertInit() {
  const systemAlertContainer = document.getElementById("system-alerts-banner");

  // remote API
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
function featuredAlert(alerts) {
  let featured = alerts[0];
  for (let i = 1; i < alerts.length; i++) {
    if (featured.last_modified_dt > alerts[i].last_modified_dt)
      featured = alerts[i];
  }
  return featured;
}

// build banner with most recent alert
function buildBanner(alert) {
  const bannerContent = document.createElement("div");
  bannerContent.setAttribute(
    "class",
    "alert alert-warning alert-dismissible fade show"
  );
  bannerContent.setAttribute("role", "alert");

  const alertInner = document.createElement("div");
  alertInner.setAttribute("class", "container");

  const row = document.createElement("div");
  row.setAttribute("class", "row");

  const col11 = document.createElement("div");
  col11.setAttribute("class", "col-11");

  // title
  const title = document.createElement("h2");
  title.setAttribute("class", "alert-title");
  title.textContent = alert.service_effect_text;

  // text
  const content = document.createElement("div");
  content.setAttribute("class", "alert-text");

  const bodyText = document.createElement("p");
  bodyText.setAttribute("class", "rich-text");
  bodyText.textContent = alert.banner_text;

  // effective date
  // const date = document.createElement("span");
  // date.textContent = processAlertDates(
  //   alert.effect_periods[0].effect_start,
  //   alert.effect_periods[0].effect_end
  // );

  // link
  // const link = document.createElement("a");
  // link.setAttribute("href", "#");
  // link.textContent = "";

  // close bttn
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "col");

  const closeButton = document.createElement("button");
  closeButton.setAttribute("type", "button");
  closeButton.setAttribute("class", "close");
  closeButton.setAttribute("data-dismiss", "alert");
  closeButton.setAttribute("aria-label", "Close");

  const spanX = document.createElement("span");
  spanX.setAttribute("aria-hidden", "true");
  spanX.textContent = "x";

  closeButton.append(spanX);
  buttonContainer.append(closeButton);

  content.append(bodyText);
  col11.append(title, content);
  row.append(col11, buttonContainer);
  alertInner.append(row);
  bannerContent.append(alertInner);

  return bannerContent;
}
