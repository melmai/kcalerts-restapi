import {
  printDates,
  processAlertDates,
  icon,
  accessibleText,
  statusText,
} from "./helpers";
import { toggleDetails } from "./events";

export function generateSingleAlert(alert) {
  // alert panel
  const alertPanel = document.createElement("div");
  alertPanel.setAttribute(
    "class",
    `advisory-content ${icon(alert.effect_name)}`
  );

  // alert type
  const type = document.createElement("h4");
  type.setAttribute("class", "advisory-type");
  type.textContent = alert.effect_name;

  // alert flag
  const flag = document.createElement("span");
  flag.setAttribute(
    "class",
    `advisory-status ${statusText(alert.alert_lifecycle)}`
  );
  flag.textContent = statusText(alert.alert_lifecycle);

  type.append(flag);

  // alert title
  const title = document.createElement("p");
  title.setAttribute("class", "advisory-title");
  title.textContent = accessibleText(alert.header_text);

  // conditionally add description
  let alertDescription = "";
  if (alert.description_text) {
    alertDescription = document.createElement("p");
    alertDescription.textContent = accessibleText(alert.description_text);
    alertDescription.setAttribute("class", "alert-description");
    alertDescription.setAttribute("style", "display:none;");
  }

  // more details button
  let expandLink = "";
  if (alert.description_text) {
    expandLink = document.createElement("a");
    expandLink.setAttribute("class", "expand-link");
    expandLink.addEventListener("click", toggleDetails);
    expandLink.textContent = "View details";
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

  alertPanel.append(
    type,
    title,
    expandLink,
    alertDescription,
    alertCause,
    dates,
    footer
  );
  return alertPanel;
}
