/*! For license information please see kcalertsroute.js.LICENSE.txt */
(()=>{"use strict";var t="https://kcm-api-test.ibi-transit.com/developer/api/v2",e="gvMjFrABizrQwye9KBD3KB",n="007",r="../static/json/route/".concat(n,".json"),o="".concat(t,"/routes?api_key=").concat(e,"&format=json"),a=("".concat(t,"/alerts?api_key=").concat(e,"&format=json"),"".concat(t,"/alertsbyroute?api_key=").concat(e,"&route="));function i(t){for(var e="Effective Dates: ",n=0;n<t.length;n++)n===t.length-1?e+="and ".concat(c(t[n].effect_start,t[n].effect_end)):e+="".concat(c(t[n].effect_start,t[n].effect_end),", ");return e}function c(t,e){var n=Math.round((new Date).getTime()/1e3),r=f(t),o=f(e);return r===o?r:e<n?"".concat(r," until further notice"):"".concat(r," to ").concat(o)}function u(t){var e;switch(t){case"Trip Cancelation":case"Suspension":e="error";break;case"Trip Restoration":e="task_alt";break;case"Stop Closure":e="dangerous";break;case"Multi-route Reroute":case"Single Route Reroute":e="alt_route";break;case"Delay of Service":e="timer";break;case"Emergency Snow Network":case"Snow Routes":case"Snow Route":e="ac_unit";break;default:e="warning"}return e}function s(t){return""===t?"":t.replaceAll(/NB/g,"Northbound").replaceAll(/SB/g,"Southbound").replaceAll(/EB/g,"Eastbound").replaceAll(/WB/g,"Westbound").replaceAll(/ Ave?\b/gm," Avenue").replaceAll(/ St\b/gm," Street").replaceAll(/ Pl\b/gm," Place").replaceAll(/ Rd\b/gm," Road").replaceAll(/ Pkwy\b/gm," Parkway").replaceAll(/ Blvd\b/gm," Boulevard").replaceAll(/ Lk\b/gm," Lake").replaceAll(/ Samm\b/gm," Sammamish")}function l(t){return"New"===t||t.includes("Ongoing")?"ongoing":"upcoming"}function f(t){return new Date(1e3*t).toLocaleDateString()}function p(t,e){var n=document.createElement("span");return"snow"!==t?(n.setAttribute("class",t),n.textContent=e):(n.setAttribute("class","snow-icon material-symbols-outlined"),n.setAttribute("translate","no"),n.textContent="ac_unit"),n}function d(t){var e=t.target.nextSibling;"none"===e.style.display?e.style.display="block":e.style.display="none","Show details"===t.target.textContent?t.target.textContent="Hide details":t.target.textContent="Show details"}function h(t){var e=document.createElement("p"),n=document.createElement("a");return n.setAttribute("href",t),n.setAttribute("target","_blank"),n.setAttribute("class","advisory-link"),t.includes("drive.google.com")?(n.textContent="View map",n.setAttribute("class","advisory-link link-icon-picture_as_pdf")):t.includes("kingcountymetro.blog")?(n.textContent="View Blog Post",n.setAttribute("class","advisory-link link-icon-outbound")):t.includes("tripplanner.kingcounty.gov")?n.textContent="View next departures":t.includes("#route-map")?n.textContent="View route map":t.includes("/metro/routes-and-service/schedules-and-maps")?n.textContent="View route schedule":n.textContent="More info",e.append(n),e}function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function m(){m=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,n){return t[e]=n}}function s(t,e,n,o){var a=e&&e.prototype instanceof p?e:p,i=Object.create(a.prototype),c=new S(o||[]);return r(i,"_invoke",{value:E(t,n,c)}),i}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f={};function p(){}function d(){}function h(){}var y={};u(y,a,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(C([])));b&&b!==e&&n.call(b,a)&&(y=b);var w=h.prototype=p.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function o(r,a,i,c){var u=l(t[r],t,a);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==v(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,i,c)}),(function(t){o("throw",t,i,c)})):e.resolve(f).then((function(t){s.value=t,i(s)}),(function(t){return o("throw",t,i,c)}))}c(u.arg)}var a;r(this,"_invoke",{value:function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return a=a?a.then(r,r):r()}})}function E(t,e,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return{value:void 0,done:!0}}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=A(i,n);if(c){if(c===f)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=l(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}function A(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,A(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),f;var o=l(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function C(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:j}}function j(){return{value:void 0,done:!0}}return d.prototype=h,r(w,"constructor",{value:h,configurable:!0}),r(h,"constructor",{value:d,configurable:!0}),d.displayName=u(h,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(_.prototype),u(_.prototype,i,(function(){return this})),t.AsyncIterator=_,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new _(s(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(w),u(w,c,"Generator"),u(w,a,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=C,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),L(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;L(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:C(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},t}function y(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function g(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){y(a,r,o,i,c,"next",t)}function c(t){y(a,r,o,i,c,"throw",t)}i(void 0)}))}}function b(){return(b=g(m().mark((function t(){var e,o,a,i;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=document.getElementById("alert-accordion"),t.next=4,w();case 4:o=t.sent,t.next=11;break;case 7:return t.next=9,fetch(r).then((function(t){return t.json()}));case 9:o=t.sent,n.includes("-")||(o=[o]);case 11:if(o=C(o),a=!1,o.forEach((function(t){t.alerts.length>0&&(a=!0)})),a){t.next=16;break}return t.abrupt("return");case 16:(i=new DocumentFragment).append(_(o)),e.append(i);case 19:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function w(){return x.apply(this,arguments)}function x(){return x=g(m().mark((function t(){var e,n,r,o;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=window.location.pathname,n=E(e.split("/").pop()),t.next=4,Promise.all(n.map(function(){var t=g(m().mark((function t(e){return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,A(e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 4:return r=t.sent,t.next=7,Promise.all(r.map(function(){var t=g(m().mark((function t(e){return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,L(e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 7:return o=t.sent,t.abrupt("return",o);case 9:case"end":return t.stop()}}),t)}))),x.apply(this,arguments)}function _(t){var e=document.createElement("div");e.setAttribute("class","toggle advisory-block");var n=document.createElement("input");n.id="toggle-advisory",n.setAttribute("type","checkbox"),n.setAttribute("name","advisory"),n.setAttribute("aria-hidden","true");var r=document.createElement("label");r.setAttribute("for","toggle-advisory"),r.setAttribute("class","toggle-head advisory-block-title with-description"),r.textContent="Service Advisory";var o=document.createElement("span");o.setAttribute("class","route-status");var a=function(t){var e=0,n=0,r=0;return t.forEach((function(t){t.alerts.forEach((function(t){"Upcoming"===t.alert_lifecycle?n++:e++,t.effect_name.toLowerCase().includes("snow")&&r++}))})),{ongoing:e,upcoming:n,snow:r}}(t);if(console.log(a),a.snow>0){var f=p("snow");o.append(f)}if(a.ongoing>0){var v=p("ongoing",a.ongoing);o.append(v)}if(a.upcoming>0){var m=p("upcoming",a.upcoming);o.append(m)}return r.append(o),e.append(n,r,function(t){var e=document.createElement("div");e.setAttribute("class","toggle-inner");var n=t.length>1;return t.forEach((function(t){e.append(function(t,e){var n=new DocumentFragment;if(e&&t.alerts.length>0){var r=document.createElement("h3");r.setAttribute("class","route-header"),r.textContent=t.route_name,n.append(r)}return t.alerts.forEach((function(t){n.append(function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=document.createElement("div");n.setAttribute("class","advisory-panel");var r=document.createElement("span");r.setAttribute("class","advisory-icon ".concat(u(t.effect_name))),r.setAttribute("aria-hidden","true"),r.setAttribute("translate","no"),r.textContent=u(t.effect_name);var o=document.createElement("div");o.setAttribute("class","advisory-content");var a=document.createElement("div");a.setAttribute("class","advisory-title-container");var f=document.createElement("h3");f.setAttribute("class","advisory-type"),f.textContent=t.effect_name;var p=document.createElement("span");p.setAttribute("class","advisory-status ".concat(l(t.alert_lifecycle))),p.textContent=l(t.alert_lifecycle),a.append(f,p);var v=document.createElement("p");v.setAttribute("class","advisory-title"),v.textContent=s(t.header_text);var m="",y=t.url;!e&&y&&y.includes("schedules-and-maps")&&(y="");var g="";t.description_text?((m=document.createElement("p")).textContent=s(t.description_text),m.setAttribute("class","alert-description"),m.setAttribute("style","display:none;"),y&&m.append(h(y))):y&&(g=h(y));var b="";t.description_text&&((b=document.createElement("a")).setAttribute("class","expand-link"),b.addEventListener("click",d),b.textContent="Show details");var w="";t.cause_name&&((w=document.createElement("p")).textContent="Cause: ".concat(t.cause_name),w.setAttribute("class","cause"));var x=document.createElement("p");x.setAttribute("class","advisory-dates"),t.effect_periods.length>1?x.textContent=i(t.effect_periods):1===t.effect_periods.length&&(x.textContent="Effective Dates: ".concat(c(t.effect_periods[0].effect_start,t.effect_periods[0].effect_end)));var _=document.createElement("p");return _.setAttribute("class","alert-footer"),_.textContent="Alert ID: ".concat(t.alert_id,", Last Updated: ").concat(c(t.last_modified_dt,t.last_modified_dt)),o.append(a,v,b,m,g,w,x,_),n.append(r,o),n}(t,!1))})),n}(t,n))})),e}(t)),e}function E(t){var e=[];return t[0].charAt(0).match(/[a-z]/i)?(t.includes(".html")&&(t=t.replace(".html","")),e[0]=t.replaceAll("-"," ")):e=(e=t.match(/(\d+)/g)).map((function(t){return t.replaceAll(/^0+/g,"")})),e}function A(t){return k.apply(this,arguments)}function k(){return(k=g(m().mark((function t(e){var n,r;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(o).then((function(t){return t.json()}));case 2:return n=t.sent,r=n.mode[1].route.find((function(t){return t.route_name.toLowerCase()===e})),t.abrupt("return",r.route_id);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function L(t){return S.apply(this,arguments)}function S(){return(S=g(m().mark((function t(e){var n,r;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a+e,t.next=3,fetch(n).then((function(t){return t.json()}));case 3:return r=t.sent,t.abrupt("return",r);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function C(t){var e=t;return e.forEach((function(t){var e=[];t.alerts.forEach((function(t){for(var n=t.affected_services.services,r=0;r<n.length;r++)if(n[r].hasOwnProperty("route_name")){e.push(t);break}})),t.alerts=e})),e}window.addEventListener("load",(function(){return b.apply(this,arguments)}))})();