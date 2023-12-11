/**
 * General Settings for API and data fetching
 */

const IS_REMOTE = false;

// Specific Route Alerts - use only one and comment out the rest
// const ROUTE = "002"; // single
const ROUTE = "007"; // single
// const ROUTE = '271';     // single
// const ROUTE = "007-271"; // multiple
const LOCAL_ROUTE_DATA = `../static/json/route/${ROUTE}.json`;

/**
 * API Endpoints - these will be used if IS_REMOTE is set to false
 *
 * Example API calls
 * TEST: https://kcm-api.ibi-test.com/developer/api/v2/alerts?api_key=gvMjFrABizrQwye9KBD3KB&format=json
 * PROD: https://kcm-api.ibi-transit.com/developer/api/v2/alerts?api_key=3QxRRLWBsUAZbfT62GEB2Q&format=json
 */

// if (IS_REMOTE) {
//   const REMOTE_ROUTES_API = process.env.ROUTES_URL;
//   // const REMOTE_ALERTS_API = `${process.env.BASE_URL}/alerts?api_key=${process.env.API_KEY}&format=json`;
//   const REMOTE_ALERTS_API = process.env.ALERTS_URL;
//   console.log(REMOTE_ROUTES_API);
//   console.log(REMOTE_ALERTS_API);
//   const REMOTE_SINGLE_ALERT_API = process.env.ALERT_URL;
// }

// const ALERTS_URL = IS_REMOTE ? REMOTE_ALERTS_API : process.env.ALERTS_URL;
// const ROUTES_URL = IS_REMOTE ? REMOTE_ROUTES_API : process.env.ROUTES_URL;
// const SINGLE_ALERT_URL = IS_REMOTE ? REMOTE_SINGLE_ALERT_API : LOCAL_ROUTE_DATA;
const ALERTS_URL = process.env.ALERTS_URL;
const ROUTES_URL = process.env.ROUTES_URL;
const SINGLE_ALERT_URL = IS_REMOTE ? REMOTE_SINGLE_ALERT_API : LOCAL_ROUTE_DATA;

export { IS_REMOTE, ALERTS_URL, ROUTES_URL, ROUTE, SINGLE_ALERT_URL };
