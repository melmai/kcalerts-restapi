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
const LOCAL_ALERT_DATA = "../static/json/alerts20221207.json";

// All Routes
const LOCAL_ROUTE_DATA = "../static/json/routes.json";

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
const REMOTE_ALERT_API = `${BASE_URL}/alerts?api_key=${API_KEY}`;

export {
  IS_REMOTE,
  BASE_URL,
  API_KEY,
  LOCAL_ALERT_DATA,
  LOCAL_ROUTE_DATA,
  REMOTE_ROUTES_API,
  REMOTE_ALERT_API,
};
