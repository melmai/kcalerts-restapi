# Service Advisories

This project displays service advisories for King County Metro. The data is generated by CITRS and is pulled in through the IBI Transit API. There are three main components that display the alert data.

## Components

### 1. Alerts list

The list data shows all alerts, hidden within an accordion and organized by route. The list is searchable by route number, and filterable by ongoing and upcoming alerts.

### 2. Route specific alerts

These alerts rendered within single collapsible panel and store all alerts for a single/multi-route schedule page. For multi-route pages, the alerts are organized under a route header.

### 3. System alert banner

This component renders on the home page, and displays only the most recent system alert.

# Local Development

Development files are stored in the `/src` directory and the project files are processed and output to the `/dist` directory.

The editable files are SCSS and JS only. The HTML and image/json assets are stored within the `/dist` and `/dist/static` directories respectively.

Requirements:

1. node.js
2. npm

### 1. Clone project

To make changes to the project, clone it locally to your computer.

```
git clone https://github.com/melmai/kcalerts-restapi.git
```

### 2. Install project dependencies

From the root directory, use the following command:

```
npm init
```

### 3. Start the build process

From the root directory, use the following command:

```
npm run build
```

### 4. Start the local server

Open a new terminal window and use the following command:

```
npm run start:dev
```

You can now make changes to the JS and SCSS files!

# Configuration

Changes related to the data source can be made in `/src/js/settings.js`. Change the data source by changing the value of `IS_REMOTE`.

```
const IS_REMOTE = false;
const BASE_URL = [URL];
const API_KEY = [API KEY];
```

When `IS_REMOTE` is `true`, the components will render the data from the API. If `IS_REMOTE` is set to `false`, the components will use the local JSON data. This is useful when you cannot connect to the VPN.

To update the local JSON data, add the file to `/dist/static/json`. Single route data should be stored under the `/route` subdirectory. Once the local files are added, you will need to adjust the files referenced in `settings.js`.

```
const LOCAL_ALERTS_DATA = "../static/json/alerts20221207.json";
const LOCAL_ROUTES_DATA = "../static/json/routes.json";

// Specific Route Alerts - use only one and comment out the rest
// const ROUTE = '007';    // single
// const ROUTE = '271';     // single
const ROUTE = "007-271"; // multiple
const LOCAL_ROUTE_DATA = `../static/json/route/${ROUTE}.json`;
```
