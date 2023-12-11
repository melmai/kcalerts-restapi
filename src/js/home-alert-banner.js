/**
 * home-alert-banner.js
 *
 * This file controls the system alert banner that is displayed on the Metro home page and
 * renders the most recent system alert with the banner_text field.
 *
 * To change the local data, add the json file to dist/static/json and update the variable
 * in settings.js
 *
 */

import "bootstrap";
import { IS_REMOTE, ALERTS_URL } from "./settings";

if (document.readyState !== "loading") {
  systemAlertInit();
} else {
  window.addEventListener("DOMContentLoaded", systemAlertInit);
}

function systemAlertInit() {
  // const systemAlertContainer = document.querySelector(
  //   ".alert-advanced > .container"
  // );

  const systemAlertContainer = document.getElementById("collapseAlertText");

  fetch(ALERT_URL)
    .then((res) => res.json())
    .then((res) => {
      const bannerAlerts = getBannerAlerts(res.alerts);

      // if (bannerAlerts.length === 0) return; // don't proceed if no system alerts

      // let featuredAlert = bannerAlerts[0];
      let featuredAlert = {
        alert_id: 1713,
        effect_name: "Snow Routes",
        effect: "DETOUR",
        cause_name: "snow",
        cause: "WEATHER",
        header_text:
          "Snow is falling across King County, but Metro buses are currently able to operate on their regular routes. Transit Alerts will be sent out if there is a need to switch to snow routes.",
        short_header_text:
          "Snow is falling across King County, but Metro buses are regular operation",
        url: "https://kingcountymetro.blog/",
        severity: "Significant",
        created_dt: "1670339549",
        last_modified_dt: "1670428019",
        service_effect_text:
          "Bus, Marine and Rail service is operating on snow routes.",
        alert_lifecycle: "New",
        banner_text:
          "Snow is falling across King County, but Metro buses are currently able to operate on their regular routes. Transit Alerts will be sent out if there is a need to switch to snow routes.",
        effect_periods: [{ effect_start: "1670339520", effect_end: "" }],
        affected_services: {
          services: [
            { route_type: "0", mode_name: "Light Rail" },
            { route_type: "3", mode_name: "Bus" },
            { route_type: "4", mode_name: "Boat" },
          ],
          elevators: [],
        },
      };

      if (bannerAlerts.length > 1) featuredAlert = featuredAlert(bannerAlerts);
      systemAlertContainer.prepend(buildBanner(featuredAlert));
    });
}

// generate list of alerts with banner text
function getBannerAlerts(alerts) {
  let bannerAlerts = [];
  alerts.forEach((alert) => {
    if (alert.banner_text) bannerAlerts.push(alert);
  });

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
  // bannerContent.setAttribute(
  //   "class",
  //   "alert alert-warning alert-dismissible fade show"
  // );
  // bannerContent.setAttribute("role", "alert");

  // const alertInner = document.createElement("div");
  // alertInner.setAttribute("class", "container");

  // const row = document.createElement("div");
  // row.setAttribute("class", "row");

  // const col11 = document.createElement("div");
  // col11.setAttribute("class", "col-11");

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

  // close bttn
  // const buttonContainer = document.createElement("div");
  // buttonContainer.setAttribute("class", "col");

  // const closeButton = document.createElement("button");
  // closeButton.setAttribute("type", "button");
  // closeButton.setAttribute("class", "close");
  // closeButton.setAttribute("data-dismiss", "alert");
  // closeButton.setAttribute("aria-label", "Close");

  // const spanX = document.createElement("span");
  // spanX.setAttribute("aria-hidden", "true");
  // spanX.textContent = "x";

  // closeButton.append(spanX);
  // buttonContainer.append(closeButton);

  content.append(bodyText);
  // col11.append(title, content);
  // row.append(col11, buttonContainer);
  // alertInner.append(row);
  // bannerContent.append(alertInner);
  bannerContent.append(title, content);

  return bannerContent;
}
