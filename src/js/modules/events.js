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

  if (e.target.textContent === "View details") {
    e.target.textContent = "Hide details";
  } else {
    e.target.textContent = "View details";
  }
}

function notifyNoResults(element) {
  const resize_ob = new ResizeObserver(function (entries) {
    // since we are observing only a single element, so we access the first element in entries array
    let rect = entries[0].contentRect;
    const errorMsg = document.getElementById("no-alerts-msg");

    if (rect.height === 0) {
      errorMsg.setAttribute("style", "display: block;");
      element.setAttribute("style", "border-color: transparent;");
    } else {
      errorMsg.setAttribute("style", "display: none;");
      element.setAttribute("style", "border-color: #eee;");
    }
  });

  // start observing for resize
  resize_ob.observe(element);
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

export {
  clearButtons,
  showAlerts,
  toggleDetails,
  notifyNoResults,
  searchRoutes,
  clearSearch,
};
