import { DotLottie } from "@lottiefiles/dotlottie-web";

/* Event Handlers
 ******************************************************* */
/**
 * Remove ongoing styling from filter buttons
 *
 */
function clearButtons() {
  const bttns = document.getElementsByClassName("tab-btn");
  for (const bttn of bttns) {
    bttn.removeAttribute("class", "selected");
    bttn.setAttribute("class", "tab-btn");
  }
}

/**
 * Change the type of alerts in the view
 *
 * @param {String} show alert type to show
 * @param {String} hide alert type to hide
 */
function showAlerts(show = "", hide = "") {
  const accordion = document.getElementById("kcalert-accordion");

  // change accordion view
  if (show === "") {
    accordion.removeAttribute("class", "ongoing upcoming");
  } else {
    accordion.removeAttribute("class", hide);
  }
  accordion.setAttribute("class", `accordion accordion-flush ${show}`);
  accordion.scrollIntoView();

  // update buttons
  clearButtons();

  let bttn;
  if (show === "") {
    bttn = document.getElementById("reset");
  } else {
    bttn = document.getElementById(`${show}-filter`);
  }
  bttn.setAttribute("class", "tab-btn selected");
}

function toggleDetails(e) {
  // const desc = e.target.parentElement.nextSibling;
  const desc = e.target.nextSibling;
  if (desc.style.display === "none") {
    desc.style.display = "block";
  } else {
    desc.style.display = "none";
  }

  if (e.target.textContent === "Show details") {
    e.target.textContent = "Hide details";
  } else {
    e.target.textContent = "Show details";
  }
}

/**
 * Hides routes that do not include search input
 *
 */
function searchRoutes(showClear = false) {
  if (showClear) {
    const clearBttn = document.getElementById("clear-search");
    clearBttn.setAttribute("style", "visibility: visible;");
  }

  // get the search value
  const input = document.getElementById("route-search").value.toLowerCase();

  // filter routes
  const routes = document.getElementsByClassName("advisory-block");
  for (const route of routes) {
    const routeName = route.getAttribute("data-route").toLowerCase();
    if (!routeName.includes(input)) {
      route.setAttribute("style", "display:none;");
    } else {
      route.setAttribute("style", "display:block;");
    }
  }

  document
    .getElementById("alerts-container")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearSearch() {
  const clearBttn = document.getElementById("clear-search");
  clearBttn.setAttribute("style", "visibility: hidden;");

  const searchInput = document.getElementById("route-search");
  searchInput.value = "";
  searchRoutes(false);
}

/**
 * Filter alerts by type
 *
 */
function showAlertType(type = "bus-alerts") {
  // change visible state of buttons
  const alertBttns = document.getElementsByClassName("alert-type-bttn");
  console.log(alertBttns);
  for (const bttn of alertBttns) {
    console.log(bttn);
    if (bttn.id === type + "-bttn") {
      bttn.setAttribute("class", "alert-type-bttn selected");
    } else {
      bttn.setAttribute("class", "alert-type-bttn");
    }
  }

  // show/hide alert sections
  const alertSections = document.getElementsByClassName("alerts");
  const errorMsg = document.getElementById("no-alerts-msg");
  errorMsg.setAttribute("class", "d-none");

  for (const section of alertSections) {
    if (section.id === type) {
      section.setAttribute("style", "display: block;");

      if (!section.hasChildNodes()) {
        // add no alert notification
        errorMsg.removeAttribute("class", "d-none");
      }
    } else {
      section.setAttribute("style", "display: none;");
    }
  }

  // TODO: if no alerts, show lottie animation
}

/**
 * Initialize Lottie animation
 *
 */
function initLottie() {
  const canvas = document.getElementById("dotlottie-canvas");
  const animation = new DotLottie({
    canvas,
    autoplay: true,
    loop: true,
    src: "https://lottie.host/5387d430-388a-4a2f-b124-1345aebfff6f/ra3lkmR3Rj.lottie",
  });
}

export {
  clearButtons,
  showAlerts,
  toggleDetails,
  searchRoutes,
  clearSearch,
  showAlertType,
  initLottie,
};
