/**
 * General Settings for API and data fetching
 */

// // Specific Route Alerts - use only one and comment out the rest
// // const ROUTE = "002"; // single
const ROUTE = "007"; // single
// // const ROUTE = '271';     // single
// // const ROUTE = "007-271"; // multiple
// const LOCAL_ROUTE_DATA = `../static/json/route/${ROUTE}.json`;

/**
 * API Endpoints - these will be used if IS_REMOTE is set to false
 *
 * Example API calls
 * TEST: https://kcm-api.ibi-test.com/developer/api/v2/alerts?api_key=gvMjFrABizrQwye9KBD3KB&format=json
 * PROD: https://kcm-api.ibi-transit.com/developer/api/v2/alerts?api_key=3QxRRLWBsUAZbfT62GEB2Q&format=json
 */

const ALERTS_URL = process.env.ALERTS_URL;
const ROUTES_URL = process.env.ROUTES_URL;
const ALERT_URL = process.env.ALERT_URL;

let singleAlertURL;
if (process.env.NODE_ENV === "development") {
  singleAlertURL = ALERT_URL + ROUTE + ".json";
}
singleAlertURL = ALERT_URL + ROUTE;

export { ALERTS_URL, ROUTES_URL, ROUTE, singleAlertURL };
