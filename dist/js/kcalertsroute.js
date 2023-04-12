/*! For license information please see kcalertsroute.js.LICENSE.txt */
(()=>{"use strict";var t="https://kcm-api.ibi-transit.com/developer/api/v2",e="3QxRRLWBsUAZbfT62GEB2Q",r="007-271",n="../static/json/route/".concat(r,".json"),o="".concat(t,"/routes?api_key=").concat(e,"&format=json"),a=("".concat(t,"/alerts?api_key=").concat(e,"&format=json"),"".concat(t,"/alertsbyroute?api_key=").concat(e,"&route="));function i(t,e){var r=Math.round((new Date).getTime()/1e3),n=l(t),o=l(e);return n===o?n:e<r?"".concat(n," until further notice"):"".concat(n," to ").concat(o)}function c(t){var e;switch(t){case"Trip Cancelation":case"Suspension":e="error";break;case"Trip Restoration":e="task_alt";break;case"Stop Closure":e="dangerous";break;case"Multi-route Reroute":case"Single Route Reroute":e="alt_route";break;case"Delay of Service":e="timer";break;case"Emergency Snow Network":case"Snow Routes":case"Snow Route":e="ac_unit";break;default:e="warning"}return e}function u(t){return""===t?"":t.replaceAll(/NB/g,"Northbound").replaceAll(/SB/g,"Southbound").replaceAll(/EB/g,"Eastbound").replaceAll(/WB/g,"Westbound").replaceAll(/ Ave?\b/gm," Avenue").replaceAll(/ St\b/gm," Street").replaceAll(/ Pl\b/gm," Place").replaceAll(/ Rd\b/gm," Road").replaceAll(/ Pkwy\b/gm," Parkway").replaceAll(/ Blvd\b/gm," Boulevard").replaceAll(/ Lk\b/gm," Lake").replaceAll(/ Samm\b/gm," Sammamish")}function s(t){return"New"===t||t.includes("Ongoing")?"ongoing":"upcoming"}function l(t){return new Date(1e3*t).toLocaleDateString()}function f(t,e){var r=document.createElement("span");return r.setAttribute("class",t),r.textContent=e,r}function p(t){var e=t.target.nextSibling;"none"===e.style.display?e.style.display="block":e.style.display="none","View details"===t.target.textContent?t.target.textContent="Hide details":t.target.textContent="View details"}function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function h(){h=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,o){var a=e&&e.prototype instanceof p?e:p,i=Object.create(a.prototype),c=new S(o||[]);return n(i,"_invoke",{value:_(t,r,c)}),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f={};function p(){}function v(){}function m(){}var y={};u(y,a,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(C([])));b&&b!==e&&r.call(b,a)&&(y=b);var w=m.prototype=p.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function o(n,a,i,c){var u=l(t[n],t,a);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==d(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,i,c)}),(function(t){o("throw",t,i,c)})):e.resolve(f).then((function(t){s.value=t,i(s)}),(function(t){return o("throw",t,i,c)}))}c(u.arg)}var a;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return a=a?a.then(n,n):n()}})}function _(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return{value:void 0,done:!0}}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=A(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=l(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function A(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,A(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=l(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function C(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:j}}function j(){return{value:void 0,done:!0}}return v.prototype=m,n(w,"constructor",{value:m,configurable:!0}),n(m,"constructor",{value:v,configurable:!0}),v.displayName=u(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(E.prototype),u(E.prototype,i,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new E(s(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(w),u(w,c,"Generator"),u(w,a,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=C,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:C(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function v(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function m(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){v(a,n,o,i,c,"next",t)}function c(t){v(a,n,o,i,c,"throw",t)}i(void 0)}))}}function y(){return(y=m(h().mark((function t(){var e,o,a,i;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=document.getElementById("kcalert-accordion"),t.next=4,g();case 4:o=t.sent,t.next=11;break;case 7:return t.next=9,fetch(n).then((function(t){return t.json()}));case 9:o=t.sent,r.includes("-")||(o=[o]);case 11:if(o=L(o),a=!1,o.forEach((function(t){t.alerts.length>0&&(a=!0)})),a){t.next=16;break}return t.abrupt("return");case 16:(i=new DocumentFragment).append(w(o)),e.append(i);case 19:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function g(){return b.apply(this,arguments)}function b(){return b=m(h().mark((function t(){var e,r,n,o;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=window.location.pathname,r=x(e.split("/").pop()),t.next=4,Promise.all(r.map(function(){var t=m(h().mark((function t(e){return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E(e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 4:return n=t.sent,t.next=7,Promise.all(n.map(function(){var t=m(h().mark((function t(e){return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,A(e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 7:return o=t.sent,t.abrupt("return",o);case 9:case"end":return t.stop()}}),t)}))),b.apply(this,arguments)}function w(t){var e=document.createElement("div");e.setAttribute("class","toggle advisory-block");var r=document.createElement("input");r.id="toggle-advisory",r.setAttribute("type","checkbox"),r.setAttribute("name","advisory"),r.setAttribute("aria-hidden","true");var n=document.createElement("label");n.setAttribute("for","toggle-advisory"),n.setAttribute("class","toggle-head advisory-block-title with-description"),n.textContent="Service Advisory";var o=document.createElement("span");o.setAttribute("class","route-status");var a=function(t){var e=0,r=0;return t.forEach((function(t){t.alerts.forEach((function(t){"Upcoming"===t.alert_lifecycle?r++:e++}))})),{ongoing:e,upcoming:r}}(t);if(a.ongoing>0){var l=f("ongoing",a.ongoing);o.append(l)}if(a.upcoming>0){var d=f("upcoming",a.upcoming);o.append(d)}return n.append(o),e.append(r,n,function(t){var e=document.createElement("div");e.setAttribute("class","toggle-inner");var r=t.length>1;return t.forEach((function(t){e.append(function(t,e){var r=new DocumentFragment;if(e&&t.alerts.length>0){var n=document.createElement("h3");n.setAttribute("class","route-header"),n.textContent=t.route_name,r.append(n)}return t.alerts.forEach((function(t){r.append(function(t){var e=document.createElement("div");e.setAttribute("class","advisory-panel");var r=document.createElement("span");r.setAttribute("class","advisory-icon ".concat(c(t.effect_name))),r.setAttribute("aria-hidden","true"),r.textContent=c(t.effect_name);var n=document.createElement("div");n.setAttribute("class","advisory-content");var o=document.createElement("div");o.setAttribute("class","advisory-title-container");var a=document.createElement("h4");a.setAttribute("class","advisory-type"),a.textContent=t.effect_name;var l=document.createElement("span");l.setAttribute("class","advisory-status ".concat(s(t.alert_lifecycle))),l.textContent=s(t.alert_lifecycle),o.append(a,l);var f=document.createElement("p");f.setAttribute("class","advisory-title"),f.textContent=u(t.header_text);var d="";t.description_text&&((d=document.createElement("p")).textContent=u(t.description_text),d.setAttribute("class","alert-description"),d.setAttribute("style","display:none;"));var h="";t.description_text&&((h=document.createElement("a")).setAttribute("class","expand-link"),h.addEventListener("click",p),h.textContent="View details");var v="";t.cause_name&&((v=document.createElement("p")).textContent="Cause: ".concat(t.cause_name),v.setAttribute("class","cause"));var m=document.createElement("p");m.setAttribute("class","advisory-dates"),t.effect_periods.length>1?m.textContent=function(t){for(var e="Effective Dates: ",r=0;r<t.length;r++)r===t.length-1?e+="and ".concat(i(t[r].effect_start,t[r].effect_end)):e+="".concat(i(t[r].effect_start,t[r].effect_end),", ");return e}(t.effect_periods):1===t.effect_periods.length&&(m.textContent="Effective Dates: ".concat(i(t.effect_periods[0].effect_start,t.effect_periods[0].effect_end)));var y=document.createElement("p");return y.setAttribute("class","alert-footer"),y.textContent="Alert ID: ".concat(t.alert_id,", Last Updated: ").concat(i(t.last_modified_dt,t.last_modified_dt)),n.append(o,f,h,d,v,m,y),e.append(r,n),e}(t))})),r}(t,r))})),e}(t)),e}function x(t){var e=[];return t[0].charAt(0).match(/[a-z]/i)?(t.includes(".html")&&(t=t.replace(".html","")),e[0]=t.replaceAll("-"," ")):e=(e=t.match(/(\d+)/g)).map((function(t){return t.replaceAll(/^0+/g,"")})),e}function E(t){return _.apply(this,arguments)}function _(){return(_=m(h().mark((function t(e){var r,n;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(o).then((function(t){return t.json()}));case 2:return r=t.sent,n=r.mode[1].route.find((function(t){return t.route_name.toLowerCase()===e})),t.abrupt("return",n.route_id);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function A(t){return k.apply(this,arguments)}function k(){return(k=m(h().mark((function t(e){var r,n;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a+e,t.next=3,fetch(r).then((function(t){return t.json()}));case 3:return n=t.sent,t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function L(t){var e=t;return e.forEach((function(t){var e=[];t.alerts.forEach((function(t){for(var r=t.affected_services.services,n=0;n<r.length;n++)if(r[n].hasOwnProperty("route_name")){e.push(t);break}})),t.alerts=e})),e}window.addEventListener("DOMContentLoaded",(function(){return y.apply(this,arguments)}))})();