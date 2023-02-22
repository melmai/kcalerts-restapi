(()=>{"use strict";var t="https://kcm-api.ibi-transit.com/developer/api/v2",e="3QxRRLWBsUAZbfT62GEB2Q",n=("../static/json/route/".concat("007-271",".json"),"".concat(t,"/routes?api_key=").concat(e,"&format=json")),r="".concat(t,"/alerts?api_key=").concat(e,"&format=json");function o(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function c(t,e){var n=Math.round((new Date).getTime()/1e3),r=s(t),o=s(e);return r===o?r:e<n?"".concat(r," until further notice"):"".concat(r," to ").concat(o)}function i(t){return""===t?"":t.replaceAll(/NB/g,"Northbound").replaceAll(/SB/g,"Southbound").replaceAll(/EB/g,"Eastbound").replaceAll(/WB/g,"Westbound").replaceAll(/ Ave?\b/gm," Avenue").replaceAll(/ St\b/gm," Street").replaceAll(/ Pl\b/gm," Place").replaceAll(/ Rd\b/gm," Road").replaceAll(/ Pkwy\b/gm," Parkway").replaceAll(/ Blvd\b/gm," Boulevard").replaceAll(/ Lk\b/gm," Lake").replaceAll(/ Samm\b/gm," Sammamish")}function u(t){return"New"===t||t.includes("Ongoing")?"ongoing":"upcoming"}function s(t){return new Date(1e3*t).toLocaleDateString()}function l(t,e){var n=document.createElement("span");return n.setAttribute("class",t),n.textContent=e,n}function d(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,i=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){i=!0,a=t},f:function(){try{c||null==n.return||n.return()}finally{if(i)throw a}}}}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function m(){var t,e=d(document.getElementsByClassName("tab-btn"));try{for(e.s();!(t=e.n()).done;){var n=t.value;n.removeAttribute("class","selected"),n.setAttribute("class","tab-btn")}}catch(t){e.e(t)}finally{e.f()}}function g(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=document.getElementById("kcalert-accordion");""===t?n.removeAttribute("class","ongoing upcoming"):n.removeAttribute("class",e),n.setAttribute("class","accordion accordion-flush ".concat(t)),m(),(""===t?document.getElementById("reset"):document.getElementById("".concat(t,"-filter"))).setAttribute("class","tab-btn selected")}function p(t){var e=t.target.nextSibling;"none"===e.style.display?e.style.display="block":e.style.display="none","View details"===t.target.textContent?t.target.textContent="Hide details":t.target.textContent="View details"}function y(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(t){var e=document.getElementById("clear-search");e.setAttribute("style","visibility: visible;")}var n,r=document.getElementById("route-search").value.toLowerCase(),o=document.getElementsByClassName("advisory-block"),a=d(o);try{for(a.s();!(n=a.n()).done;){var c=n.value,i=c.getAttribute("data-route").toLowerCase();i.includes(r)?c.setAttribute("style","display:block;"):c.setAttribute("style","display:none;")}}catch(t){a.e(t)}finally{a.f()}}function v(){document.getElementById("clear-search").setAttribute("style","visibility: hidden;"),document.getElementById("route-search").value="",y(!1)}function b(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function A(){console.log("create alerts fxn start");var t=document.getElementById("kcalert-accordion"),e=r,a=n;Promise.all([fetch(e).then((function(t){return t.json()})),fetch(a).then((function(t){return t.json()}))]).then((function(e){var n,r,a,s,d=function(t){var e=[];return t.forEach((function(t){var n=function(t,e){return o(new Set(t.map((function(t){return t.route_id}))))}(t.affected_services.services);e.push({route_ids:n,alert:t,status:t.alert_lifecycle})})),e}(e[0].alerts),f=function(t){return t.filter((function(t){return t.alerts}))}(function(t,e){var n=e;return t.forEach((function(t){t.route_ids.forEach((function(e){n.forEach((function(n){var r;e===n.route_id&&(n.alerts?n.alerts=[].concat(function(t){if(Array.isArray(t))return b(t)}(r=n.alerts)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(r)||function(t,e){if(t){if("string"==typeof t)return b(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(t,e):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[t.alert]):(n.alerts=[],n.alerts[0]=t.alert),n.status=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{ongoing:0,upcoming:0},n=e;return t.includes("Ongoing")||"New"===t?n.ongoing=n.ongoing+1:n.upcoming=n.upcoming+1,n}(t.status,n.status))}))}))})),e}(d,(r=e[1].mode[1].route,a="",s=[],r.forEach((function(t){"102698"===t.route_id?a=t:s.push(t)})),[].concat(s,[a])))),m=new DocumentFragment;f.forEach((function(t,e){m.append(function(t,e){var n=new DocumentFragment,r=function(t){return"Duvall-Monroe Shuttle"===t?t:t.charAt(0).match(/[a-z]/i)?"RapidRide ".concat(t):function(t){var e=parseInt(t);return e>=500&&e<600}(t)?"ST ".concat(t):function(t){var e=parseInt(t);return 204===e||224===e||630===e||631===e||e>=901&&e<=930}(t)?"DART ".concat(t):"Route ".concat(t)}(t.route_name),o=document.createElement("div");o.id=t.route_id;var a=t.status.ongoing?"ongoing":"",s=t.status.upcoming?"upcoming":"";o.setAttribute("class","toggle advisory-block ".concat(a," ").concat(s)),o.setAttribute("data-route",r);var d=document.createElement("input");d.setAttribute("id","toggle-advisory-".concat(t.route_id)),d.setAttribute("type","checkbox"),d.setAttribute("name","toggle-advisory-".concat(t.route_id)),d.setAttribute("aria-hidden","true");var f=document.createElement("label");f.setAttribute("class","toggle-head advisory-block-title with-description"),f.setAttribute("for","toggle-advisory-".concat(t.route_id));var m=document.createElement("h2");m.setAttribute("class","accordion-title"),m.textContent=r;var g,y,v=document.createElement("div");v.setAttribute("class","route-status"),v.setAttribute("aria-hidden","true"),t.status.ongoing>0&&(g=l("ongoing",t.status.ongoing)),t.status.upcoming>0&&(y=l("upcoming",t.status.upcoming)),v.append(g||"",y||""),f.append(m,v),o.append(d,f);var b=document.createElement("div");return b.setAttribute("class","toggle-inner"),t.alerts.forEach((function(t,e){b.append(function(t){var e=document.createElement("div");e.setAttribute("class","advisory-content ".concat(function(t){var e;switch(t){case"Trip Cancelation":case"Suspension":e="error";break;case"Trip Restoration":e="task_alt";break;case"Stop Closure":e="dangerous";break;case"Multi-route Reroute":case"Single Route Reroute":e="alt_route";break;case"Delay of Service":e="timer";break;case"Emergency Snow Network":case"Snow Routes":case"Snow Route":e="ac_unit";break;default:e="warning"}return e}(t.effect_name)));var n=document.createElement("div");n.setAttribute("class","advisory-title-container");var r=document.createElement("h4");r.setAttribute("class","advisory-type"),r.textContent=t.effect_name;var o=document.createElement("span");o.setAttribute("class","advisory-status ".concat(u(t.alert_lifecycle))),o.textContent=u(t.alert_lifecycle),n.append(r,o);var a=document.createElement("p");a.setAttribute("class","advisory-title"),a.textContent=i(t.header_text);var s="";t.description_text&&((s=document.createElement("p")).textContent=i(t.description_text),s.setAttribute("class","alert-description"),s.setAttribute("style","display:none;"));var l="";t.description_text&&((l=document.createElement("a")).setAttribute("class","expand-link"),l.addEventListener("click",p),l.textContent="View details");var d="";t.cause_name&&((d=document.createElement("p")).textContent="Cause: ".concat(t.cause_name),d.setAttribute("class","cause"));var f=document.createElement("p");f.setAttribute("class","advisory-dates"),t.effect_periods.length>1?f.textContent=function(t){for(var e="Effective Dates: ",n=0;n<t.length;n++)n===t.length-1?e+="and ".concat(c(t[n].effect_start,t[n].effect_end)):e+="".concat(c(t[n].effect_start,t[n].effect_end),", ");return e}(t.effect_periods):1===t.effect_periods.length&&(f.textContent="Effective Dates: ".concat(c(t.effect_periods[0].effect_start,t.effect_periods[0].effect_end)));var m=document.createElement("p");return m.setAttribute("class","alert-footer"),m.textContent="Alert ID: ".concat(t.alert_id,", Last Updated: ").concat(c(t.last_modified_dt,t.last_modified_dt)),e.append(n,a,l,s,d,f,m),e}(t))})),o.append(b),n.append(o),n}(t))})),t.append(m),n=t,document.getElementById("reset").addEventListener("click",(function(){return g()})),document.getElementById("ongoing-filter").addEventListener("click",(function(){return g("ongoing","upcoming")})),document.getElementById("upcoming-filter").addEventListener("click",(function(){return g("upcoming","ongoing")})),document.getElementById("route-search").addEventListener("keyup",(function(){return y(!0)})),document.getElementById("clear-search").addEventListener("click",v),function(t){new ResizeObserver((function(e){var n=e[0].contentRect,r=document.getElementById("no-alerts-msg");0===n.height?(r.setAttribute("style","display: block;"),t.setAttribute("style","border-color: transparent;")):(r.setAttribute("style","display: none;"),t.setAttribute("style","border-color: #eee;"))})).observe(t)}(n)})).catch((function(t){console.log("error with create fxn")}))}"".concat(t,"/alertsbyroute?api_key=").concat(e,"&route="),"loading"!==document.readyState?A():window.addEventListener("DOMContentLoaded",A)})();