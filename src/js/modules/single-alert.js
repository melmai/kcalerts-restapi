import {
  printDates,
  processAlertDates,
  icon,
  accessibleText,
  statusText,
} from "./helpers";
import { toggleDetails } from "./events";

function createURL(url) {
  const urlContainer = document.createElement("p");
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.setAttribute("class", "advisory-link");

  // set link text and class based on url
  if (url.includes("drive.google.com")) {
    link.textContent = "View map";
    link.setAttribute("class", "advisory-link link-icon-picture_as_pdf");
  } else if (url.includes("kingcountymetro.blog")) {
    link.textContent = "View Blog Post";
    link.setAttribute("class", "advisory-link link-icon-outbound");
  } else if (url.includes("tripplanner.kingcounty.gov")) {
    link.textContent = "View next departures";
  } else if (url.includes("#route-map")) {
    link.textContent = "View route map";
  } else if (url.includes("/metro/routes-and-service/schedules-and-maps")) {
    link.textContent = "View route schedule";
  } else {
    link.textContent = "More info";
  }

  urlContainer.append(link);
  return urlContainer;
}

export function generateSingleAlert(alert, isList = true) {
  // alert panel
  const alertPanel = document.createElement("div");
  alertPanel.setAttribute("class", `advisory-panel`);

  const alertIcon = document.createElement("span");
  alertIcon.setAttribute("class", `advisory-icon ${icon(alert.effect_name)}`);
  alertIcon.setAttribute("aria-hidden", "true");
  alertIcon.setAttribute("translate", "no");
  alertIcon.textContent = icon(alert.effect_name);

  const alertContent = document.createElement("div");
  alertContent.setAttribute("class", "advisory-content");

  const alertTitle = document.createElement("div");
  alertTitle.setAttribute("class", "advisory-title-container");

  // alert type
  const type = document.createElement("h3");
  type.setAttribute("class", "advisory-type");
  type.textContent = alert.effect_name;

  // alert flag
  const flag = document.createElement("span");
  flag.setAttribute(
    "class",
    `advisory-status ${statusText(alert.alert_lifecycle)}`
  );
  flag.textContent = statusText(alert.alert_lifecycle);

  alertTitle.append(type, flag);

  // alert title
  const title = document.createElement("p");
  title.setAttribute("class", "advisory-title");
  title.textContent = accessibleText(alert.header_text);

  // conditionally add description
  let alertDescription = "";
  let relatedLink = alert.url;
  let alertURL = "";

  // add URL
  if (relatedLink) {
    alertURL = createURL(relatedLink);
  }

  if (!isList && relatedLink && relatedLink.includes("schedules-and-maps")) {
    relatedLink = "";
  }

  if (alert.description_text) {
    alertDescription = document.createElement("p");
    alertDescription.textContent = accessibleText(alert.description_text);
    alertDescription.setAttribute("class", "alert-description");
    alertDescription.setAttribute("style", "display:none;");

    if (relatedLink) {
      alertDescription.append(createURL(relatedLink));
    }
  } else if (relatedLink) {
    alertURL = createURL(relatedLink);
  }

  // more details button
  let expandLink = "";
  if (alert.description_text) {
    expandLink = document.createElement("a");
    expandLink.setAttribute("class", "expand-link");
    expandLink.addEventListener("click", toggleDetails);
    expandLink.textContent = "Show details";
  }

  // cause
  let alertCause = "";
  if (alert.cause_name) {
    alertCause = document.createElement("p");
    alertCause.textContent = `Cause: ${alert.cause_name}`;
    alertCause.setAttribute("class", "cause");
  }

  // alert dates
  const dates = document.createElement("p");
  dates.setAttribute("class", "advisory-dates");
  // if more than one effective date range
  if (alert.effect_periods.length > 1) {
    dates.textContent = printDates(alert.effect_periods);
    // else if only one effective date range
  } else if (alert.effect_periods.length === 1) {
    dates.textContent = `Effective Dates: ${processAlertDates(
      alert.effect_periods[0].effect_start,
      alert.effect_periods[0].effect_end
    )}`;
  }

  const footer = document.createElement("p");
  footer.setAttribute("class", "alert-footer");
  footer.textContent = `Alert ID: ${
    alert.alert_id
  }, Last Updated: ${processAlertDates(
    alert.last_modified_dt,
    alert.last_modified_dt
  )}`;

  alertContent.append(
    alertTitle,
    title,
    expandLink,
    alertDescription,
    alertURL,
    alertCause,
    dates,
    footer
  );

  alertPanel.append(alertIcon, alertContent);
  return alertPanel;
}
