/*! For license information please see watertaxi.js.LICENSE.txt */
(()=>{"use strict";var t="https://kcm-api.ibi-transit.com/developer/api/v2",e="3QxRRLWBsUAZbfT62GEB2Q",n="007",r="../static/json/route/".concat(n,".json"),o=("".concat(t,"/routes?api_key=").concat(e,"&format=json"),"".concat(t,"/alerts?api_key=").concat(e,"&format=json"),"".concat(t,"/alertsbyroute?api_key=").concat(e,"&route="));function a(t,e){var n=Math.round((new Date).getTime()/1e3),r=s(t),o=s(e);return r===o?r:e<n?"".concat(r," until further notice"):"".concat(r," to ").concat(o)}function i(t){var e;switch(t){case"Trip Cancelation":case"Suspension":e="error";break;case"Trip Restoration":e="task_alt";break;case"Stop Closure":e="dangerous";break;case"Multi-route Reroute":case"Single Route Reroute":e="alt_route";break;case"Delay of Service":e="timer";break;case"Emergency Snow Network":case"Snow Routes":case"Snow Route":e="ac_unit";break;default:e="warning"}return e}function c(t){return""===t?"":t.replaceAll(/NB/g,"Northbound").replaceAll(/SB/g,"Southbound").replaceAll(/EB/g,"Eastbound").replaceAll(/WB/g,"Westbound").replaceAll(/ Ave?\b/gm," Avenue").replaceAll(/ St\b/gm," Street").replaceAll(/ Pl\b/gm," Place").replaceAll(/ Rd\b/gm," Road").replaceAll(/ Pkwy\b/gm," Parkway").replaceAll(/ Blvd\b/gm," Boulevard").replaceAll(/ Lk\b/gm," Lake").replaceAll(/ Samm\b/gm," Sammamish")}function u(t){return"New"===t||t.includes("Ongoing")?"ongoing":"upcoming"}function s(t){return new Date(1e3*t).toLocaleDateString()}function l(t,e){var n=document.createElement("span");return"snow"!==t?(n.setAttribute("class",t),n.textContent=e):(n.setAttribute("class","snow-icon material-symbols-outlined"),n.setAttribute("translate","no"),n.textContent="ac_unit"),n}function f(t){var e=t.target.nextSibling;"none"===e.style.display?e.style.display="block":e.style.display="none","Show details"===t.target.textContent?t.target.textContent="Hide details":t.target.textContent="Show details"}function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function d(){d=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,n){return t[e]=n}}function s(t,e,n,o){var a=e&&e.prototype instanceof h?e:h,i=Object.create(a.prototype),c=new S(o||[]);return r(i,"_invoke",{value:_(t,n,c)}),i}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f={};function h(){}function v(){}function m(){}var y={};u(y,a,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(C([])));b&&b!==e&&n.call(b,a)&&(y=b);var w=m.prototype=h.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function o(r,a,i,c){var u=l(t[r],t,a);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==p(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,i,c)}),(function(t){o("throw",t,i,c)})):e.resolve(f).then((function(t){s.value=t,i(s)}),(function(t){return o("throw",t,i,c)}))}c(u.arg)}var a;r(this,"_invoke",{value:function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return a=a?a.then(r,r):r()}})}function _(t,e,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return{value:void 0,done:!0}}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=A(i,n);if(c){if(c===f)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=l(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}function A(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,A(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),f;var o=l(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function C(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:j}}function j(){return{value:void 0,done:!0}}return v.prototype=m,r(w,"constructor",{value:m,configurable:!0}),r(m,"constructor",{value:v,configurable:!0}),v.displayName=u(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(E.prototype),u(E.prototype,i,(function(){return this})),t.AsyncIterator=E,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new E(s(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(w),u(w,c,"Generator"),u(w,a,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=C,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),L(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;L(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:C(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},t}function h(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function v(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){h(a,r,o,i,c,"next",t)}function c(t){h(a,r,o,i,c,"throw",t)}i(void 0)}))}}function m(){return(m=v(d().mark((function t(){var e,o,a,i;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=document.getElementById("alert-accordion"),t.next=4,y();case 4:o=t.sent,t.next=11;break;case 7:return t.next=9,fetch(r).then((function(t){return t.json()}));case 9:o=t.sent,n.includes("-")||(o=[o]);case 11:if(o=E(o),a=!1,o.forEach((function(t){t.alerts.length>0&&(a=!0)})),a){t.next=16;break}return t.abrupt("return");case 16:(i=new DocumentFragment).append(b(o)),e.append(i);case 19:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function y(){return g.apply(this,arguments)}function g(){return g=v(d().mark((function t(){var e,n,r,o;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=window.location.pathname,n=e.split("/").pop(),r=[],r="vashon"===n?["100337"]:"west-seattle"===n?["100336"]:["100337","100336"],t.next=6,Promise.all(r.map(function(){var t=v(d().mark((function t(e){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w(e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 6:return o=t.sent,t.abrupt("return",o);case 8:case"end":return t.stop()}}),t)}))),g.apply(this,arguments)}function b(t){var e=document.createElement("div");e.setAttribute("class","toggle advisory-block");var n=document.createElement("input");n.id="toggle-advisory",n.setAttribute("type","checkbox"),n.setAttribute("name","advisory"),n.setAttribute("aria-hidden","true");var r=document.createElement("label");r.setAttribute("for","toggle-advisory"),r.setAttribute("class","toggle-head advisory-block-title with-description"),r.textContent="Service Advisory";var o=document.createElement("span");o.setAttribute("class","route-status");var s=function(t){var e=0,n=0,r=0;return t.forEach((function(t){t.alerts.forEach((function(t){"Upcoming"===t.alert_lifecycle?n++:e++,t.effect_name.toLowerCase().includes("snow")&&r++}))})),{ongoing:e,upcoming:n,snow:r}}(t);if(console.log(s),s.snow>0){var p=l("snow");o.append(p)}if(s.ongoing>0){var d=l("ongoing",s.ongoing);o.append(d)}if(s.upcoming>0){var h=l("upcoming",s.upcoming);o.append(h)}return r.append(o),e.append(n,r,function(t){var e=document.createElement("div");e.setAttribute("class","toggle-inner");var n=t.length>1;return t.forEach((function(t){e.append(function(t,e){var n=new DocumentFragment;if(e&&t.alerts.length>0){var r=document.createElement("h3");r.setAttribute("class","route-header"),r.textContent={973:"West Seattle - Downtown",975:"Vashon - Downtown"}[t.route_name],n.append(r)}return t.alerts.forEach((function(t){n.append(function(t){var e=document.createElement("div");e.setAttribute("class","advisory-panel");var n=document.createElement("span");n.setAttribute("class","advisory-icon ".concat(i(t.effect_name))),n.setAttribute("aria-hidden","true"),n.setAttribute("translate","no"),n.textContent=i(t.effect_name);var r=document.createElement("div");r.setAttribute("class","advisory-content");var o=document.createElement("div");o.setAttribute("class","advisory-title-container");var s=document.createElement("h3");s.setAttribute("class","advisory-type"),s.textContent=t.effect_name;var l=document.createElement("span");l.setAttribute("class","advisory-status ".concat(u(t.alert_lifecycle))),l.textContent=u(t.alert_lifecycle),o.append(s,l);var p=document.createElement("p");p.setAttribute("class","advisory-title"),p.textContent=c(t.header_text);var d,h,v,m="",y=t.url,g="";y&&(d=y,h=document.createElement("p"),(v=document.createElement("a")).setAttribute("href",d),v.setAttribute("target","_blank"),v.setAttribute("class","advisory-link"),d.includes("drive.google.com")?(v.textContent="View map",v.setAttribute("class","advisory-link link-icon-picture_as_pdf")):d.includes("live.goswift.ly/seattle-streetcar/route")?(v.textContent="View route map",v.setAttribute("class","advisory-link link-icon-outbound")):d.includes("wsdot.com/ferries/vesselwatch/watertaxiwatch")?(v.textContent="Check status on Water Taxi Watch",v.setAttribute("class","advisory-link link-icon-outbound")):d.includes("kingcountymetro.blog")?(v.textContent="View Blog Post",v.setAttribute("class","advisory-link link-icon-outbound")):d.includes("tripplanner.kingcounty.gov")?v.textContent="View next departures":d.includes("#route-map")?v.textContent="View route map":d.includes("/metro/routes-and-service/schedules-and-maps")?v.textContent="View route schedule":v.textContent="More info",h.append(v),g=h),t.description_text&&((m=document.createElement("p")).textContent=c(t.description_text),m.setAttribute("class","alert-description"),m.setAttribute("style","display:none;"));var b="";t.description_text&&((b=document.createElement("a")).setAttribute("class","expand-link"),b.addEventListener("click",f),b.textContent="Show details");var w="";t.cause_name&&((w=document.createElement("p")).textContent="Cause: ".concat(t.cause_name),w.setAttribute("class","cause"));var x=document.createElement("p");x.setAttribute("class","advisory-dates"),t.effect_periods.length>1?x.textContent=function(t){for(var e="Effective Dates: ",n=0;n<t.length;n++)n===t.length-1?e+="and ".concat(a(t[n].effect_start,t[n].effect_end)):e+="".concat(a(t[n].effect_start,t[n].effect_end),", ");return e}(t.effect_periods):1===t.effect_periods.length&&(x.textContent="Effective Dates: ".concat(a(t.effect_periods[0].effect_start,t.effect_periods[0].effect_end)));var E=document.createElement("p");return E.setAttribute("class","alert-footer"),E.textContent="Alert ID: ".concat(t.alert_id,", Last Updated: ").concat(a(t.last_modified_dt,t.last_modified_dt)),r.append(o,p,g,b,m,w,x,E),e.append(n,r),e}(t))})),n}(t,n))})),e}(t)),e}function w(t){return x.apply(this,arguments)}function x(){return(x=v(d().mark((function t(e){var n,r;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=o+e,t.next=3,fetch(n).then((function(t){return t.json()}));case 3:return r=t.sent,t.abrupt("return",r);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function E(t){var e=t;return e.forEach((function(t){var e=[];t.alerts.forEach((function(t){for(var n=t.affected_services.services,r=0;r<n.length;r++)if(n[r].hasOwnProperty("route_name")){e.push(t);break}})),t.alerts=e})),e}window.addEventListener("load",(function(){return m.apply(this,arguments)}))})();