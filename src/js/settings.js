/**
 * General Settings for API and data fetching
 */

const IS_REMOTE = false;
const BASE_URL = "https://kcm-api-transit.ibi-transit.com/developer/api/v2";
const API_KEY = "3QxRRLWBsUAZbfT62GEB2Q";

/**
 * Local Files
 *
 */

// All Alerts
const LOCAL_ALERTS_DATA = "../static/json/alerts20221207.json";

// All Routes
const LOCAL_ROUTES_DATA = "../static/json/routes.json";

// Specific Route Alerts - use only one and comment out the rest
// const route = '007';    // single
// const route = '271';     // single
const route = "007-271"; // multiple

const LOCAL_ROUTE_DATA = `../static/json/route/${route}`;

/**
 * API Endpoints
 *
 * Example API calls
 * TEST: https://kcm-api.ibi-test.com/developer/api/v2/alerts?api_key=gvMjFrABizrQwye9KBD3KB&format=json
 * PROD: https://kcm-api.ibi-transit.com/developer/api/v2/alerts?api_key=3QxRRLWBsUAZbfT62GEB2Q&format=json
 */

// All Routes
const REMOTE_ROUTES_API = `${BASE_URL}/routes?api_key=${API_KEY}`;

// All Alerts
const REMOTE_ALERTS_API = `${BASE_URL}/alerts?api_key=${API_KEY}`;

// Single Alert
const REMOTE_SINGLE_ALERT_API = `${BASE_URL}/alertsbyroute?api_key=${API_KEY}&route=`;

export {
  IS_REMOTE,
  BASE_URL,
  API_KEY,
  LOCAL_ALERTS_DATA,
  LOCAL_ROUTES_DATA,
  LOCAL_ROUTE_DATA,
  REMOTE_ROUTES_API,
  REMOTE_ALERTS_API,
  REMOTE_SINGLE_ALERT_API,
};
