/**
 * General Settings for API and data fetching
 */

const IS_REMOTE = true;
const BASE_URL = "https://kcm-api.ibi-transit.com/developer/api/v2";
const API_KEY = "3QxRRLWBsUAZbfT62GEB2Q";

/**
 * Local Files - these will be used if IS_REMOTE is set to true
 *
 */

const LOCAL_ALERTS_DATA = "/dist/static/json/alerts20230420.json";
const LOCAL_ROUTES_DATA = "/dist/static/json/routes.json";

// Specific Route Alerts - use only one and comment out the rest
// const ROUTE = '007';    // single
// const ROUTE = '271';     // single
const ROUTE = "007-271"; // multiple
const LOCAL_ROUTE_DATA = `../static/json/route/${ROUTE}.json`;

/**
 * API Endpoints - these will be used if IS_REMOTE is set to false
 *
 * Example API calls
 * TEST: https://kcm-api.ibi-test.com/developer/api/v2/alerts?api_key=gvMjFrABizrQwye9KBD3KB&format=json
 * PROD: https://kcm-api.ibi-transit.com/developer/api/v2/alerts?api_key=3QxRRLWBsUAZbfT62GEB2Q&format=json
 */

const REMOTE_ROUTES_API = `${BASE_URL}/routes?api_key=${API_KEY}&format=json`;
const REMOTE_ALERTS_API = `${BASE_URL}/alerts?api_key=${API_KEY}&format=json`;
const REMOTE_SINGLE_ALERT_API = `${BASE_URL}/alertsbyroute?api_key=${API_KEY}&route=`;

export {
  IS_REMOTE,
  BASE_URL,
  API_KEY,
  LOCAL_ALERTS_DATA,
  LOCAL_ROUTES_DATA,
  LOCAL_ROUTE_DATA,
  ROUTE,
  REMOTE_ROUTES_API,
  REMOTE_ALERTS_API,
  REMOTE_SINGLE_ALERT_API,
};
