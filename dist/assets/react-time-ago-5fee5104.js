import{eC as le,ee as xe,b_ as Se,r as m,R as S,j as P}from"./index-cc58a329.js";import{P as i,p as f}from"./index-a79bf066.js";var te=Number.isNaN||function(t){return typeof t=="number"&&t!==t};function Oe(e,t){return!!(e===t||te(e)&&te(t))}function Ae(e,t){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(!Oe(e[r],t[r]))return!1;return!0}function Re(e,t){t===void 0&&(t=Ae);var r=null;function n(){for(var o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];if(r&&r.lastThis===this&&t(o,r.lastArgs))return r.lastResult;var l=e.apply(this,o);return r={lastResult:l,lastArgs:o,lastThis:this},l}return n.clear=function(){r=null},n}var Fe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function Ee(e){if(se())return Intl.DateTimeFormat.supportedLocalesOf(e)[0]}function se(){var e=(typeof Intl>"u"?"undefined":Fe(Intl))==="object";return e&&typeof Intl.DateTimeFormat=="function"}var re=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ie=function(){function e(t,r){for(var n=0;n<r.length;n++){var o=r[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();function Ne(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Ce=function(){function e(){Ne(this,e),this.cache={}}return Ie(e,[{key:"get",value:function(){for(var r=this.cache,n=arguments.length,o=Array(n),a=0;a<n;a++)o[a]=arguments[a];for(var s=o,l=Array.isArray(s),u=0,s=l?s:s[Symbol.iterator]();;){var c;if(l){if(u>=s.length)break;c=s[u++]}else{if(u=s.next(),u.done)break;c=u.value}var p=c;if((typeof r>"u"?"undefined":re(r))!=="object")return;r=r[p]}return r}},{key:"put",value:function(){for(var r=arguments.length,n=Array(r),o=0;o<r;o++)n[o]=arguments[o];for(var a=n.pop(),l=n.pop(),u=this.cache,p=n,s=Array.isArray(p),c=0,p=s?p:p[Symbol.iterator]();;){var y;if(s){if(c>=p.length)break;y=p[c++]}else{if(c=p.next(),c.done)break;y=c.value}var h=y;re(u[h])!=="object"&&(u[h]={}),u=u[h]}return u[l]=a}}]),e}();const ce=Ce;var ne=new ce,Me=se(),Ue=function(t){return t.toString()};function ke(e,t){if(!Me)return Ue;var r=Pe(e),n=JSON.stringify(t),o=ne.get(String(r),n)||ne.put(String(r),n,new Intl.DateTimeFormat(r,t));return function(a){return o.format(a)}}const Le=Re(ke);var V={};function Pe(e){var t=e.toString();return V[t]?V[t]:V[t]=Ee(e)}var Ve=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function qe(e){return $e(e)?e:new Date(e)}function $e(e){return e instanceof Date||je(e)}function je(e){return(typeof e>"u"?"undefined":Ve(e))==="object"&&typeof e.getTime=="function"}var oe=new ce;function Be(e,t){var r=t.polyfill,n=String(e)+":"+String(r);return oe.get(n)||oe.put(n,new le(e,{polyfill:r}))}var k={exports:{}},x={exports:{}};(function(){var e,t,r,n,o,a;typeof performance<"u"&&performance!==null&&performance.now?x.exports=function(){return performance.now()}:typeof process<"u"&&process!==null&&process.hrtime?(x.exports=function(){return(e()-o)/1e6},t=process.hrtime,e=function(){var l;return l=t(),l[0]*1e9+l[1]},n=e(),a=process.uptime()*1e9,o=n-a):Date.now?(x.exports=function(){return Date.now()-r},r=Date.now()):(x.exports=function(){return new Date().getTime()-r},r=new Date().getTime())}).call(xe);var ze=x.exports,Ke=ze,v=typeof window>"u"?{}:window,C=["moz","webkit"],b="AnimationFrame",T=v["request"+b],O=v["cancel"+b]||v["cancelRequest"+b];for(var D=0;!T&&D<C.length;D++)T=v[C[D]+"Request"+b],O=v[C[D]+"Cancel"+b]||v[C[D]+"CancelRequest"+b];if(!T||!O){var q=0,ae=0,g=[],We=1e3/60;T=function(e){if(g.length===0){var t=Ke(),r=Math.max(0,We-(t-q));q=r+t,setTimeout(function(){var n=g.slice(0);g.length=0;for(var o=0;o<n.length;o++)if(!n[o].cancelled)try{n[o].callback(q)}catch(a){setTimeout(function(){throw a},0)}},Math.round(r))}return g.push({handle:++ae,callback:e,cancelled:!1}),ae},O=function(e){for(var t=0;t<g.length;t++)g[t].handle===e&&(g[t].cancelled=!0)}}k.exports=function(e){return T.call(v,e)};k.exports.cancel=function(){O.apply(v,arguments)};k.exports.polyfill=function(e){e||(e=v),e.requestAnimationFrame=T,e.cancelAnimationFrame=O};var Ye=k.exports;const ie=Se(Ye);function Ge(e,t){if(e.length===0)return 0;for(var r=0,n=e.length-1,o=void 0;r<=n;){o=Math.floor((n+r)/2);var a=t(e[o]);if(a===0)return o;if(a<0){if(r=o+1,r>n)return r}else if(n=o-1,n<r)return r}}var Je=function(){function e(t,r){var n=[],o=!0,a=!1,l=void 0;try{for(var u=t[Symbol.iterator](),s;!(o=(s=u.next()).done)&&(n.push(s.value),!(r&&n.length===r));o=!0);}catch(c){a=!0,l=c}finally{try{!o&&u.return&&u.return()}finally{if(a)throw l}}return n}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();const He={instances:[],add:function(t){var r=this,n=this.instances.length===0;return me(this.instances,t),n&&this.start(),{stop:function(){pe(r.instances,t),r.instances.length===0&&r.stop()},forceUpdate:function(){ue(t,r.instances)}}},tick:function(){for(var t=Date.now();;){var r=this.instances[0];if(t>=r.nextUpdateTime)ue(r,this.instances);else break}},scheduleNextTick:function(){var t=this;this.scheduledTick=ie(function(){t.tick(),t.scheduleNextTick()})},start:function(){this.scheduleNextTick()},stop:function(){ie.cancel(this.scheduledTick)}};function Qe(e){var t=e.getNextValue(),r=Je(t,2),n=r[0],o=r[1];e.setValue(n),e.nextUpdateTime=o}function ue(e,t){Qe(e),pe(t,e),me(t,e)}function me(e,t){var r=Xe(e,t);e.splice(r,0,t)}function pe(e,t){var r=e.indexOf(t);e.splice(r,1)}function Xe(e,t){var r=t.nextUpdateTime;return Ge(e,function(n){return n.nextUpdateTime===r?0:n.nextUpdateTime>r?1:-1})}var Ze=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};function _e(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function U(e,t){var r=e.date,n=e.verboseDate,o=e.tooltip,a=e.children,l=_e(e,["date","verboseDate","tooltip","children"]),u=m.useMemo(function(){return r.toISOString()},[r]);return S.createElement("time",Ze({ref:t},l,{dateTime:u,title:o?n:void 0}),a)}U=S.forwardRef(U);U.propTypes={date:i.instanceOf(Date).isRequired,verboseDate:i.string,tooltip:i.bool.isRequired,children:i.string.isRequired};var et=f.oneOfType([f.shape({minTime:f.number,formatAs:f.string.isRequired}),f.shape({test:f.func,formatAs:f.string.isRequired}),f.shape({minTime:f.number,format:f.func.isRequired}),f.shape({test:f.func,format:f.func.isRequired})]),tt=f.oneOfType([f.string,f.shape({steps:f.arrayOf(et).isRequired,labels:f.oneOfType([f.string,f.arrayOf(f.string)]).isRequired,round:f.string})]),fe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},M=function(){function e(t,r){var n=[],o=!0,a=!1,l=void 0;try{for(var u=t[Symbol.iterator](),s;!(o=(s=u.next()).done)&&(n.push(s.value),!(r&&n.length===r));o=!0);}catch(c){a=!0,l=c}finally{try{!o&&u.return&&u.return()}finally{if(a)throw l}}return n}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();function rt(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function A(e){var t=e.date,r=e.future,n=e.timeStyle,o=e.round,a=e.minTimeLeft,l=e.tooltip,u=e.component,s=e.container,c=e.wrapperComponent,p=e.wrapperProps,y=e.locale,h=e.locales,L=e.formatVerboseDate,$=e.verboseDateFormat,j=e.updateInterval,B=e.tick,z=e.now,de=e.timeOffset,K=e.polyfill,ve=rt(e,["date","future","timeStyle","round","minTimeLeft","tooltip","component","container","wrapperComponent","wrapperProps","locale","locales","formatVerboseDate","verboseDateFormat","updateInterval","tick","now","timeOffset","polyfill"]),R=m.useMemo(function(){return y&&(h=[y]),h.concat(le.getDefaultLocale())},[y,h]),W=m.useMemo(function(){return Be(R,{polyfill:K})},[R,K]);t=m.useMemo(function(){return qe(t)},[t]);var F=m.useCallback(function(){var d=(z||Date.now())-de,w=void 0;if(r&&d>=t.getTime()&&(d=t.getTime(),w=!0),a!==void 0){var I=t.getTime()-a*1e3;d>I&&(d=I,w=!0)}var we=W.format(t,n,{getTimeToNextUpdate:!0,now:d,future:r,round:o}),ee=M(we,2),De=ee[0],N=ee[1];return w?N=at:N=j||N||60*1e3,[De,d+N]},[t,r,n,j,o,a,W,z]),Y=m.useRef();Y.current=F;var ye=m.useMemo(F,[]),G=M(ye,2),he=G[0],ge=G[1],be=m.useState(he),J=M(be,2),Te=J[0],H=J[1],E=m.useRef();m.useEffect(function(){if(B)return E.current=He.add({getNextValue:function(){return Y.current()},setValue:H,nextUpdateTime:ge}),function(){return E.current.stop()}},[B]),m.useEffect(function(){if(E.current)E.current.forceUpdate();else{var d=F(),w=M(d,1),I=w[0];H(I)}},[F]);var Q=m.useMemo(function(){return Le(R,$)},[R,$]),X=m.useMemo(function(){return L?L(t):Q(t)},[t,L,Q]),Z=S.createElement(u,fe({date:t,verboseDate:X,tooltip:l},ve),Te),_=c||s;return _?S.createElement(_,fe({},p,{verboseDate:X}),Z):Z}A.propTypes={date:i.oneOfType([i.instanceOf(Date),i.number]).isRequired,locale:i.string,locales:i.arrayOf(i.string),future:i.bool,timeStyle:tt,round:i.string,minTimeLeft:i.number,component:i.elementType.isRequired,tooltip:i.bool.isRequired,formatVerboseDate:i.func,verboseDateFormat:i.object,updateInterval:i.oneOfType([i.number,i.arrayOf(i.shape({threshold:i.number,interval:i.number.isRequired}))]),tick:i.bool,now:i.number,timeOffset:i.number,polyfill:i.bool,wrapperComponent:i.elementType,wrapperProps:i.object};A.defaultProps={locales:[],component:U,tooltip:!0,verboseDateFormat:{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit"},tick:!0,timeOffset:0};A=S.memo(A);const nt=A;var ot=365*24*60*60*1e3,at=1e3*ot;const ft=(e,t)=>e&&e.convertDate?P.jsx(nt,{date:new Date(e.convertDate),locale:"fr-FR"}):P.jsx(P.Fragment,{});export{ft as C};
