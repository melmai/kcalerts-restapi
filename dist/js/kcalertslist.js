(()=>{"use strict";var t="https://kcm-api.ibi-transit.com/developer/api/v2",e="3QxRRLWBsUAZbfT62GEB2Q",n=("../static/json/route/".concat("007-271",".json"),"".concat(t,"/routes?api_key=").concat(e,"&format=json")),r="".concat(t,"/alerts?api_key=").concat(e,"&format=json");function o(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function c(t,e){var n=Math.round((new Date).getTime()/1e3),r=l(t),o=l(e);return r===o?r:e<n?"".concat(r," until further notice"):"".concat(r," to ").concat(o)}function i(t){var e;switch(t){case"Trip Cancelation":case"Suspension":e="error";break;case"Trip Restoration":e="task_alt";break;case"Stop Closure":e="dangerous";break;case"Multi-route Reroute":case"Single Route Reroute":e="alt_route";break;case"Delay of Service":e="timer";break;case"Emergency Snow Network":case"Snow Routes":case"Snow Route":e="ac_unit";break;default:e="warning"}return e}function s(t){return""===t?"":t.replaceAll(/NB/g,"Northbound").replaceAll(/SB/g,"Southbound").replaceAll(/EB/g,"Eastbound").replaceAll(/WB/g,"Westbound").replaceAll(/ Ave?\b/gm," Avenue").replaceAll(/ St\b/gm," Street").replaceAll(/ Pl\b/gm," Place").replaceAll(/ Rd\b/gm," Road").replaceAll(/ Pkwy\b/gm," Parkway").replaceAll(/ Blvd\b/gm," Boulevard").replaceAll(/ Lk\b/gm," Lake").replaceAll(/ Samm\b/gm," Sammamish")}function u(t){return"New"===t||t.includes("Ongoing")?"ongoing":"upcoming"}function l(t){return new Date(1e3*t).toLocaleDateString()}function d(t,e){var n=document.createElement("span");return n.setAttribute("class",t),n.textContent=e,n}function m(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,i=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){i=!0,a=t},f:function(){try{c||null==n.return||n.return()}finally{if(i)throw a}}}}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function g(){var t,e=m(document.getElementsByClassName("tab-btn"));try{for(e.s();!(t=e.n()).done;){var n=t.value;n.removeAttribute("class","selected"),n.setAttribute("class","tab-btn")}}catch(t){e.e(t)}finally{e.f()}}function p(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=document.getElementById("kcalert-accordion");""===t?n.removeAttribute("class","ongoing upcoming"):n.removeAttribute("class",e),n.setAttribute("class","accordion accordion-flush ".concat(t)),n.scrollIntoView(),g(),(""===t?document.getElementById("reset"):document.getElementById("".concat(t,"-filter"))).setAttribute("class","tab-btn selected")}function b(t){var e=t.target.nextSibling;"none"===e.style.display?e.style.display="block":e.style.display="none","Show details"===t.target.textContent?t.target.textContent="Hide details":t.target.textContent="Show details"}function v(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(t){var e=document.getElementById("clear-search");e.setAttribute("style","visibility: visible;")}var n,r=document.getElementById("route-search").value.toLowerCase(),o=document.getElementsByClassName("advisory-block"),a=m(o);try{for(a.s();!(n=a.n()).done;){var c=n.value,i=c.getAttribute("data-route").toLowerCase();i.includes(r)?c.setAttribute("style","display:block;"):c.setAttribute("style","display:none;")}}catch(t){a.e(t)}finally{a.f()}document.getElementById("alerts-container").scrollIntoView({behavior:"smooth",block:"start"})}function y(){document.getElementById("clear-search").setAttribute("style","visibility: hidden;"),document.getElementById("route-search").value="",v(!1)}function h(t){var e=document.createElement("p"),n=document.createElement("a");return n.setAttribute("href",t),n.setAttribute("target","_blank"),n.setAttribute("class","advisory-link"),t.includes("drive.google.com")?(n.textContent="View map",n.setAttribute("class","link-icon-picture_as_pdf")):t.includes("kingcountymetro.blog")?(n.textContent="View Blog Post",n.setAttribute("class","link-icon-outbound")):t.includes("tripplanner.kingcounty.gov")?n.textContent="View next departures":t.includes("/metro/routes-and-service/schedules-and-maps")?n.textContent="View route schedule":n.textContent="More info",e.append(n),e}function A(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function E(){console.log("create alerts fxn start");var t=document.getElementById("kcalert-accordion"),e=r,a=n;Promise.all([fetch(e).then((function(t){return t.json()})),fetch(a).then((function(t){return t.json()}))]).then((function(e){var n,r,a,l,m=function(t){var e=[];return t.forEach((function(t){var n=function(t,e){return o(new Set(t.map((function(t){return t.route_id}))))}(t.affected_services.services);e.push({route_ids:n,alert:t,status:t.alert_lifecycle})})),e}(e[0].alerts),f=function(t){return t.filter((function(t){return t.alerts}))}(function(t,e){var n=e;return t.forEach((function(t){t.route_ids.forEach((function(e){n.forEach((function(n){var r;e===n.route_id&&(n.alerts?n.alerts=[].concat(function(t){if(Array.isArray(t))return A(t)}(r=n.alerts)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(r)||function(t,e){if(t){if("string"==typeof t)return A(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?A(t,e):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[t.alert]):(n.alerts=[],n.alerts[0]=t.alert),n.status=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{ongoing:0,upcoming:0},n=e;return t.includes("Ongoing")||"New"===t?n.ongoing=n.ongoing+1:n.upcoming=n.upcoming+1,n}(t.status,n.status))}))}))})),e}(m,(r=e[1].mode[1].route,a=[],l=[],r.forEach((function(t){"102698"===t.route_id||"102699"===t.route_id||"Trailhead Direct Mt. Si"===t.route_name?a.push(t):l.push(t)})),[].concat(l,a)))),g=new DocumentFragment;f.forEach((function(t,e){g.append(function(t,e){var n=new DocumentFragment,r=function(t){return console.log(t),"Duvall-Monroe Shuttle"===t||"Trailhead Direct Mt. Si"===t?t:"629"===t?"SVT Shuttle":t.charAt(0).match(/[a-z]/i)?"RapidRide ".concat(t):function(t){var e=parseInt(t);return e>=500&&e<600}(t)?"ST ".concat(t):function(t){var e=parseInt(t);return 204===e||224===e||630===e||631===e||e>=901&&e<=930}(t)?"DART ".concat(t):"Route ".concat(t)}(t.route_name),o=document.createElement("div");o.id=t.route_id;var a=t.status.ongoing?"ongoing":"",l=t.status.upcoming?"upcoming":"";o.setAttribute("class","toggle advisory-block ".concat(a," ").concat(l)),o.setAttribute("data-route",r);var m=document.createElement("input");m.setAttribute("id","toggle-advisory-".concat(t.route_id)),m.setAttribute("type","checkbox"),m.setAttribute("name","toggle-advisory-".concat(t.route_id)),m.setAttribute("aria-hidden","true");var f=document.createElement("label");f.setAttribute("class","toggle-head advisory-block-title with-description"),f.setAttribute("for","toggle-advisory-".concat(t.route_id));var g=document.createElement("h2");g.setAttribute("class","accordion-title"),g.textContent=r;var p,v,y=document.createElement("div");y.setAttribute("class","route-status"),y.setAttribute("aria-hidden","true"),t.status.ongoing>0&&(p=d("ongoing",t.status.ongoing)),t.status.upcoming>0&&(v=d("upcoming",t.status.upcoming)),y.append(p||"",v||""),f.append(g,y),o.append(m,f);var A=document.createElement("div");return A.setAttribute("class","toggle-inner"),t.alerts.forEach((function(t,e){A.append(function(t){var e=document.createElement("div");e.setAttribute("class","advisory-panel");var n=document.createElement("span");n.setAttribute("class","advisory-icon ".concat(i(t.effect_name))),n.setAttribute("aria-hidden","true"),n.textContent=i(t.effect_name);var r=document.createElement("div");r.setAttribute("class","advisory-content");var o=document.createElement("div");o.setAttribute("class","advisory-title-container");var a=document.createElement("h3");a.setAttribute("class","advisory-type"),a.textContent=t.effect_name;var l=document.createElement("span");l.setAttribute("class","advisory-status ".concat(u(t.alert_lifecycle))),l.textContent=u(t.alert_lifecycle),o.append(a,l);var d=document.createElement("p");d.setAttribute("class","advisory-title"),d.textContent=s(t.header_text),console.log(t.url);var m="",f="";t.description_text?((m=document.createElement("p")).textContent=s(t.description_text),m.setAttribute("class","alert-description"),m.setAttribute("style","display:none;"),t.url&&m.append(h(t.url))):t.url&&(f=h(t.url));var g="";t.description_text&&((g=document.createElement("a")).setAttribute("class","expand-link"),g.addEventListener("click",b),g.textContent="Show details");var p="";t.cause_name&&((p=document.createElement("p")).textContent="Cause: ".concat(t.cause_name),p.setAttribute("class","cause"));var v=document.createElement("p");v.setAttribute("class","advisory-dates"),t.effect_periods.length>1?v.textContent=function(t){for(var e="Effective Dates: ",n=0;n<t.length;n++)n===t.length-1?e+="and ".concat(c(t[n].effect_start,t[n].effect_end)):e+="".concat(c(t[n].effect_start,t[n].effect_end),", ");return e}(t.effect_periods):1===t.effect_periods.length&&(v.textContent="Effective Dates: ".concat(c(t.effect_periods[0].effect_start,t.effect_periods[0].effect_end)));var y=document.createElement("p");return y.setAttribute("class","alert-footer"),y.textContent="Alert ID: ".concat(t.alert_id,", Last Updated: ").concat(c(t.last_modified_dt,t.last_modified_dt)),r.append(o,d,g,m,f,p,v,y),e.append(n,r),e}(t))})),o.append(A),n.append(o),n}(t))})),t.append(g),n=t,document.getElementById("reset").addEventListener("click",(function(){return p()})),document.getElementById("ongoing-filter").addEventListener("click",(function(){return p("ongoing","upcoming")})),document.getElementById("upcoming-filter").addEventListener("click",(function(){return p("upcoming","ongoing")})),document.getElementById("route-search").addEventListener("keyup",(function(){return v(!0)})),document.getElementById("clear-search").addEventListener("click",y),function(t){new ResizeObserver((function(e){var n=e[0].contentRect,r=document.getElementById("no-alerts-msg");0===n.height?(r.setAttribute("style","display: block;"),t.setAttribute("style","border-color: transparent;")):(r.setAttribute("style","display: none;"),t.setAttribute("style","border-color: #eee;"))})).observe(t)}(n)})).catch((function(t){console.log("error with create fxn")}))}"".concat(t,"/alertsbyroute?api_key=").concat(e,"&route="),"loading"!==document.readyState?E():window.addEventListener("DOMContentLoaded",E)})();