/*! Built with http://stenciljs.com */
(function(window,document,Context,namespace,hydratedCssClass,components,resourcesUrl){"use strict";
(function(s){s&&(resourcesUrl=s.getAttribute('data-resources-url'))})(document.querySelector("script[data-namespace='mycomponent']"));
function t(t,e){return"sc-"+t.t+(e&&e!==C?"-"+e:"")}function e(t,e){return t+(e?"-h":"-s")}function n(e,n,o,i){let r=o.t+i.mode,c=o[r];if((2===o.e||1===o.e&&!e.o.n)&&(i["s-sc"]=c?t(o,i.mode):t(o)),c||(c=o[r=o.t+C]),c){let t=n.i.head;if(n.n)if(1===o.e)t=i.shadowRoot;else{let e=i;for(;e=n.r(e);)if(e.host&&e.host.shadowRoot){t=e.host.shadowRoot;break}}let f=e.c.get(t);if(f||e.c.set(t,f={}),!f[r]){let e;{e=c.content.cloneNode(!0),f[r]=!0;const o=t.querySelectorAll("[data-styles]");n.f(t,e,o.length&&o[o.length-1].nextSibling||t.firstChild)}}}}function o(t,e,n,o,c,f,s){if("class"!==n||f)if("style"===n){for(const t in o)c&&null!=c[t]||(/-/.test(t)?e.style.s(t):e.style[t]="");for(const t in c)o&&c[t]===o[t]||(/-/.test(t)?e.style.setProperty(t,c[t]):e.style[t]=c[t])}else if("o"!==n[0]||"n"!==n[1]||!/[A-Z]/.test(n[2])||n in e)if("list"!==n&&"type"!==n&&!f&&(n in e||-1!==["object","function"].indexOf(typeof c)&&null!==c)){const o=t.l(e);o&&o.u&&o.u[n]?r(e,n,c):"ref"!==n&&(r(e,n,null==c?"":c),null!=c&&!1!==c||t.o.a(e,n))}else null!=c&&"key"!==n?function l(t,e,n,o="boolean"==typeof n){const i=e!==(e=e.replace(/^xlink\:?/,""));null==n||o&&(!n||"false"===n)?i?t.removeAttributeNS(N,O(e)):t.removeAttribute(e):"function"!=typeof n&&(n=o?"":n.toString(),i?t.setAttributeNS(N,O(e),n):t.setAttribute(e,n))}(e,n,c):(f||t.o.p(e,n)&&(null==c||!1===c))&&t.o.a(e,n);else n=O(n)in e?O(n.substring(2)):O(n[2])+n.substring(3),c?c!==o&&t.o.d(e,n,c):t.o.v(e,n);else if(o!==c){const t=i(o),n=i(c),r=t.filter(t=>!n.includes(t)),f=i(e.className).filter(t=>!r.includes(t)),s=n.filter(e=>!t.includes(e)&&!f.includes(e));f.push(...s),e.className=f.join(" ")}}function i(t){return null==t||""===t?[]:t.trim().split(/\s+/)}function r(t,e,n){try{t[e]=n}catch(t){}}function c(t,e,n,i,r){const c=11===n.m.nodeType&&n.m.host?n.m.host:n.m,f=e&&e.vattrs||j,s=n.vattrs||j;for(r in f)s&&null!=s[r]||null==f[r]||o(t,c,r,f[r],void 0,i,n.b);for(r in s)r in f&&s[r]===("value"===r||"checked"===r?c[r]:f[r])||o(t,c,r,f[r],s[r],i,n.b)}function f(t,e){function n(i,r,f,s,l,p,y,h,w){if(h=r.vchildren[f],u||(d=!0,"slot"===h.vtag&&(a&&e.y(s,a+"-s"),h.vchildren?h.w=!0:h.g=!0)),W(h.vtext))h.m=e.M(h.vtext);else if(h.g)h.m=e.M("");else{if(p=h.m=S||"svg"===h.vtag?e.k("http://www.w3.org/2000/svg",h.vtag):e.C(h.w?"slot-fb":h.vtag),t.j(p)&&t.x.delete(b),S="svg"===h.vtag||"foreignObject"!==h.vtag&&S,c(t,null,h,S),W(a)&&p["s-si"]!==a&&e.y(p,p["s-si"]=a),h.vchildren)for(l=0;l<h.vchildren.length;++l)(y=n(i,h,l,p))&&e.W(p,y);"svg"===h.vtag&&(S=!1)}return h.m["s-hn"]=m,(h.w||h.g)&&(h.m["s-sr"]=!0,h.m["s-cr"]=v,h.m["s-sn"]=h.vname||"",(w=i&&i.vchildren&&i.vchildren[f])&&w.vtag===h.vtag&&i.m&&o(i.m)),h.m}function o(n,i,r,c){t.O=!0;const f=e.N(n);for(r=f.length-1;r>=0;r--)(c=f[r])["s-hn"]!==m&&c["s-ol"]&&(e.S(c),e.f(l(c),c,s(c)),e.S(c["s-ol"]),c["s-ol"]=null,d=!0),i&&o(c,i);t.O=!1}function i(t,o,i,r,c,f,l,u){const a=t["s-cr"];for((l=a&&e.r(a)||t).shadowRoot&&e.A(l)===m&&(l=l.shadowRoot);c<=f;++c)r[c]&&(u=W(r[c].vtext)?e.M(r[c].vtext):n(null,i,c,t))&&(r[c].m=u,e.f(l,u,s(o)))}function r(t,n,i,r){for(;n<=i;++n)W(t[n])&&(r=t[n].m,p=!0,r["s-ol"]?e.S(r["s-ol"]):o(r,!0),e.S(r))}function f(t,e){return t.vtag===e.vtag&&t.vkey===e.vkey&&("slot"!==t.vtag||t.vname===e.vname)}function s(t){return t&&t["s-ol"]?t["s-ol"]:t}function l(t){return e.r(t["s-ol"]?t["s-ol"]:t)}let u,a,p,d,v,m,b;const y=[];return function h(w,$,g,M,k,C,j,x,O,E,N,A){if(b=w,m=e.A(b),v=b["s-cr"],u=M,a=b["s-sc"],d=p=!1,function u(a,p,d){const v=p.m=a.m,m=a.vchildren,b=p.vchildren;S=p.m&&W(e.R(p.m))&&void 0!==p.m.ownerSVGElement,S="svg"===p.vtag||"foreignObject"!==p.vtag&&S,W(p.vtext)?(d=v["s-cr"])?e.T(e.r(d),p.vtext):a.vtext!==p.vtext&&e.T(v,p.vtext):("slot"!==p.vtag&&c(t,a,p,S),W(m)&&W(b)?function y(t,c,a,p,d,v,m,b){let y=0,h=0,w=c.length-1,$=c[0],g=c[w],M=p.length-1,k=p[0],C=p[M];for(;y<=w&&h<=M;)if(null==$)$=c[++y];else if(null==g)g=c[--w];else if(null==k)k=p[++h];else if(null==C)C=p[--M];else if(f($,k))u($,k),$=c[++y],k=p[++h];else if(f(g,C))u(g,C),g=c[--w],C=p[--M];else if(f($,C))"slot"!==$.vtag&&"slot"!==C.vtag||o(e.r($.m)),u($,C),e.f(t,$.m,e.L(g.m)),$=c[++y],C=p[--M];else if(f(g,k))"slot"!==$.vtag&&"slot"!==C.vtag||o(e.r(g.m)),u(g,k),e.f(t,g.m,$.m),g=c[--w],k=p[++h];else{for(d=null,v=y;v<=w;++v)if(c[v]&&W(c[v].vkey)&&c[v].vkey===k.vkey){d=v;break}W(d)?((b=c[d]).vtag!==k.vtag?m=n(c&&c[h],a,d,t):(u(b,k),c[d]=void 0,m=b.m),k=p[++h]):(m=n(c&&c[h],a,h,t),k=p[++h]),m&&e.f(l($.m),m,s($.m))}y>w?i(t,null==p[M+1]?null:p[M+1].m,a,p,h,M):h>M&&r(c,y,w)}(v,m,p,b):W(b)?(W(a.vtext)&&e.T(v,""),i(v,null,p,b,0,b.length-1)):W(m)&&r(m,0,m.length-1)),S&&"svg"===p.vtag&&(S=!1)}($,g),d){for(function t(n,o,i,r,c,f,s,l,u,a){for(c=0,f=(o=e.N(n)).length;c<f;c++){if((i=o[c])["s-sr"]&&(r=i["s-cr"]))for(l=e.N(e.r(r)),u=i["s-sn"],s=l.length-1;s>=0;s--)(r=l[s])["s-cn"]||r["s-nr"]||r["s-hn"]===i["s-hn"]||((3===(a=e.D(r))||8===a)&&""===u||1===a&&null===e.P(r,"slot")&&""===u||1===a&&e.P(r,"slot")===u)&&(y.some(t=>t.q===r)||(p=!0,r["s-sn"]=u,y.push({B:i,q:r})));1===e.D(i)&&t(i)}}(g.m),j=0;j<y.length;j++)(x=y[j]).q["s-ol"]||((O=e.M(""))["s-nr"]=x.q,e.f(e.r(x.q),x.q["s-ol"]=O,x.q));for(t.O=!0,j=0;j<y.length;j++){for(x=y[j],N=e.r(x.B),A=e.L(x.B),O=x.q["s-ol"];O=e.I(O);)if((E=O["s-nr"])&&E&&E["s-sn"]===x.q["s-sn"]&&N===e.r(E)&&(E=e.L(E))&&E&&!E["s-nr"]){A=E;break}(!A&&N!==e.r(x.q)||e.L(x.q)!==A)&&x.q!==A&&(e.S(x.q),e.f(N,x.q,A))}t.O=!1}return p&&function t(n,o,i,r,c,f,s,l){for(r=0,c=(i=e.N(n)).length;r<c;r++)if(o=i[r],1===e.D(o)){if(o["s-sr"])for(s=o["s-sn"],o.hidden=!1,f=0;f<c;f++)if(i[f]["s-hn"]!==o["s-hn"])if(l=e.D(i[f]),""!==s){if(1===l&&s===e.P(i[f],"slot")){o.hidden=!0;break}}else if(1===l||3===l&&""!==e.F(i[f]).trim()){o.hidden=!0;break}t(o)}}(g.m),y.length=0,g}}function s(t,e){t&&(t.vattrs&&t.vattrs.ref&&t.vattrs.ref(e?null:t.m),t.vchildren&&t.vchildren.forEach(t=>{s(t,e)}))}function l(t,e,n,o,i){const r=t.D(e);let c,f,s,u;if(i&&1===r){(f=t.P(e,k))&&(s=f.split("."))[0]===o&&((u={}).vtag=t.A(u.m=e),n.vchildren||(n.vchildren=[]),n.vchildren[s[1]]=u,n=u,i=""!==s[2]);for(let r=0;r<e.childNodes.length;r++)l(t,e.childNodes[r],n,o,i)}else 3===r&&(c=e.previousSibling)&&8===t.D(c)&&"s"===(s=t.F(c).split("."))[0]&&s[1]===o&&((u={vtext:t.F(e)}).m=e,n.vchildren||(n.vchildren=[]),n.vchildren[s[2]]=u)}function u(t,e){let n,o,i=null,r=!1,c=!1;for(var f=arguments.length;f-- >2;)A.push(arguments[f]);for(;A.length>0;){let e=A.pop();if(e&&void 0!==e.pop)for(f=e.length;f--;)A.push(e[f]);else"boolean"==typeof e&&(e=null),(c="function"!=typeof t)&&(null==e?e="":"number"==typeof e?e=String(e):"string"!=typeof e&&(c=!1)),c&&r?i[i.length-1].vtext+=e:null===i?i=[c?{vtext:e}:e]:i.push(c?{vtext:e}:e),r=c}if(null!=e){if(e.className&&(e.class=e.className),"object"==typeof e.class){for(f in e.class)e.class[f]&&A.push(f);e.class=A.join(" "),A.length=0}null!=e.key&&(n=e.key),null!=e.name&&(o=e.name)}return"function"==typeof t?t(e,i||[],R):{vtag:t,vchildren:i,vtext:void 0,vattrs:e,vkey:n,vname:o,m:void 0,b:!1}}function a(t){return{vtag:t.vtag,vchildren:t.vchildren,vtext:t.vtext,vattrs:t.vattrs,vkey:t.vkey,vname:t.vname}}function p(t){const[e,n,,o,i,r]=t,c={color:{H:"color"}};if(o)for(let t=0;t<o.length;t++){const e=o[t];c[e[0]]={U:e[1],Q:!!e[2],H:"string"==typeof e[3]?e[3]:e[3]?e[0]:0,Z:e[4]}}return{t:e,z:n,u:Object.assign({},c),e:i,G:r?r.map(d):void 0}}function d(t){return{J:t[0],K:t[1],V:!!t[2],X:!!t[3],Y:!!t[4]}}function v(t,e){if(W(e)&&"object"!=typeof e&&"function"!=typeof e){if(t===Boolean||4===t)return"false"!==e&&(""===e||!!e);if(t===Number||8===t)return parseFloat(e);if(t===String||2===t)return e.toString()}return e}function m(t,e){t._.add(e),t.tt.has(e)||(t.tt.set(e,!0),t.et?t.queue.write(()=>b(t,e)):t.queue.tick(()=>b(t,e)))}async function b(t,n,o,i,r){if(t.tt.delete(n),!t.nt.has(n)){if(!(i=t.ot.get(n))){if((r=t.it.get(n))&&!r["s-rn"])return void(r["s-rc"]=r["s-rc"]||[]).push(()=>{b(t,n)});i=function c(t,e,n,o,i,r,f){try{o=new(i=t.l(e).rt),function s(t,e,n,o,i){t.ct.set(o,n),t.ft.has(n)||t.ft.set(n,{}),Object.entries(Object.assign({color:{type:String}},e.properties,{mode:{type:String}})).forEach(([e,r])=>{(function c(t,e,n,o,i,r,f,s){if(e.type||e.state){const c=t.ft.get(n);e.state||(!e.attr||void 0!==c[i]&&""!==c[i]||(f=r&&r.st)&&W(s=f[e.attr])&&(c[i]=v(e.type,s)),n.hasOwnProperty(i)&&(void 0===c[i]&&(c[i]=v(e.type,n[i])),"mode"!==i&&delete n[i])),o.hasOwnProperty(i)&&void 0===c[i]&&(c[i]=o[i]),e.watchCallbacks&&(c[T+i]=e.watchCallbacks.slice()),h(o,i,function l(e){return(e=t.ft.get(t.ct.get(this)))&&e[i]},function u(n,o){(o=t.ct.get(this))&&(e.state||e.mutable)&&y(t,o,i,n)})}})(t,r,n,o,e,i)})}(t,i,e,o,n)}catch(n){o={},t.lt(n,7,e,!0)}return t.ot.set(e,o),o}(t,n,t.ut.get(n))}(function f(t,n,o,i){try{const r=n.rt.host,c=n.rt.encapsulation,f="shadow"===c&&t.o.n;let s,l=o;if(f&&(l=o.shadowRoot),!o["s-rn"]){t.at(t,t.o,n,o);const i=o["s-sc"];i&&(t.o.y(o,e(i,!0)),"scoped"===c&&t.o.y(o,e(i)))}if(i.render||i.hostData||r||s){t.pt=!0;const e=i.render&&i.render();let n;t.pt=!1;const r=t.dt.get(o)||{};r.m=l;const s=u(null,n,e);t.dt.set(o,t.render(o,r,s,f,c))}o["s-rn"]=!0,o["s-rc"]&&(o["s-rc"].forEach(t=>t()),o["s-rc"]=null)}catch(e){t.pt=!1,t.lt(e,8,o,!0)}})(t,t.l(n),n,i),n["s-init"]()}}function y(t,e,n,o,i){let r=t.ft.get(e);r||t.ft.set(e,r={}),o!==r[n]&&(r[n]=o,t.ot.get(e)&&!t.pt&&e["s-rn"]&&m(t,e))}function h(t,e,n,o){Object.defineProperty(t,e,{configurable:!0,get:n,set:o})}function w(t,e,n,o,i,r){if(t._.delete(e),(i=t.it.get(e))&&((o=i["s-ld"])&&((n=o.indexOf(e))>-1&&o.splice(n,1),o.length||i["s-init"]&&i["s-init"]()),t.it.delete(e)),t.vt.length&&!t._.size)for(;r=t.vt.shift();)r()}function $(t,e,n,o){if(n.connectedCallback=function(){(function n(t,e,o){t.nt.delete(o),t.mt.has(o)||(t.bt=!0,t._.add(o),t.mt.set(o,!0),o["s-id"]||(o["s-id"]=t.yt()),function i(t,e,n){for(n=e;n=t.o.R(n);)if(t.j(n)){t.x.has(e)||(t.it.set(e,n),(n["s-ld"]=n["s-ld"]||[]).push(e));break}}(t,o),t.queue.tick(()=>{t.ut.set(o,function n(t,e,o,i,r){return o.mode||(o.mode=t.ht(o)),o["s-cr"]||t.P(o,M)||t.n&&1===e.e||(o["s-cr"]=t.M(""),o["s-cr"]["s-cn"]=!0,t.f(o,o["s-cr"],t.N(o)[0])),t.n||1!==e.e||(o.shadowRoot=o),1===e.e&&t.n&&!o.shadowRoot&&t.wt(o,{mode:"open"}),i={$t:o["s-id"],st:{}},e.u&&Object.keys(e.u).forEach(n=>{(r=e.u[n].H)&&(i.st[r]=t.P(o,r))}),i}(t.o,e,o)),t.gt(e,o)}))})(t,e,this)},n.disconnectedCallback=function(){(function e(t,n){!t.O&&function o(t,e){for(;e;){if(!t.r(e))return 9!==t.D(e);e=t.r(e)}}(t.o,n)&&(t.nt.set(n,!0),w(t,n),s(t.dt.get(n),!0),t.o.v(n),t.Mt.delete(n),[t.it,t.kt,t.ut].forEach(t=>t.delete(n)))})(t,this)},n["s-init"]=function(){(function e(t,n,o,i,r,c){if(t.ot.get(n)&&!t.nt.has(n)&&(!n["s-ld"]||!n["s-ld"].length)){t.x.set(n,!0),t.Ct.has(n)||(t.Ct.set(n,!0),n["s-ld"]=void 0,t.o.y(n,o));try{s(t.dt.get(n)),(r=t.kt.get(n))&&(r.forEach(t=>t(n)),t.kt.delete(n))}catch(e){t.lt(e,4,n)}w(t,n)}})(t,this,o)},n.forceUpdate=function(){m(t,this)},e.u){const o=Object.entries(e.u);{let t={};o.forEach(([e,{H:n}])=>{n&&(t[n]=e)}),t=Object.assign({},t),n.attributeChangedCallback=function(e,n,o){(function i(t,e,n,o){const i=t[O(n)];i&&(e[i]=o)})(t,this,e,o)}}(function i(t,e,n){e.forEach(([e,o])=>{const i=o.U;3&i?h(n,e,function n(){return(t.ft.get(this)||{})[e]},function n(i){y(t,this,e,v(o.Z,i))}):32===i&&function r(t,e,n){Object.defineProperty(t,e,{configurable:!0,value:n})}(n,e,E)})})(t,o,n)}}function g(t,e,n,o){return function(){const i=arguments;return function r(t,e,n){let o=e[n];const i=t.i.body;return i?(o||(o=i.querySelector(n)),o||(o=e[n]=t.C(n),t.W(i,o)),o.componentOnReady()):Promise.resolve()}(t,e,n).then(t=>t[o].apply(t,i))}}const M="ssrv",k="ssrc",C="$",j={},x={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},W=t=>null!=t,O=t=>t.toLowerCase(),E=()=>{},N="http://www.w3.org/1999/xlink";let S=!1;const A=[],R={forEach:(t,e)=>{t.forEach((t,n,o)=>e(a(t),n,o))},map:(t,e)=>{return t.map((t,n,o)=>(function i(t){return{vtag:t.vtag,vchildren:t.vchildren,vtext:t.vtext,vattrs:t.vattrs,vkey:t.vkey,vname:t.vname}})(e(a(t),n,o)))}},T="wc-";(function L(t,e,o,i,r,c,s){function a(t,e){const n=t.t;o.customElements.get(n)||($(j,d[n]=t,e.prototype,c),e.observedAttributes=Object.values(t.u).map(t=>t.H).filter(t=>!!t),o.customElements.define(t.t,e))}const d={html:{}},v={},b=o[t]=o[t]||{},y=function h(t,e,n){t.ael||(t.ael=((t,e,n,o)=>t.addEventListener(e,n,o)),t.rel=((t,e,n,o)=>t.removeEventListener(e,n,o)));const o=new WeakMap,i={i:n,n:!!n.documentElement.attachShadow,jt:!1,D:t=>t.nodeType,C:t=>n.createElement(t),k:(t,e)=>n.createElementNS(t,e),M:t=>n.createTextNode(t),xt:t=>n.createComment(t),f:(t,e,n)=>t.insertBefore(e,n),S:t=>t.remove(),W:(t,e)=>t.appendChild(e),y:(t,e)=>{t.classList.add(e)},N:t=>t.childNodes,r:t=>t.parentNode,L:t=>t.nextSibling,I:t=>t.previousSibling,A:t=>O(t.nodeName),F:t=>t.textContent,T:(t,e)=>t.textContent=e,P:(t,e)=>t.getAttribute(e),Wt:(t,e,n)=>t.setAttribute(e,n),Ot:(t,e,n,o)=>t.setAttributeNS(e,n,o),a:(t,e)=>t.removeAttribute(e),p:(t,e)=>t.hasAttribute(e),ht:e=>e.getAttribute("mode")||(t.Context||{}).mode,Et:(t,o)=>{return"child"===o?t.firstElementChild:"parent"===o?i.R(t):"body"===o?n.body:"document"===o?n:"window"===o?e:t},d:(e,n,r,c,f,s,l,u)=>{const a=n;let p=e,d=o.get(e);if(d&&d[a]&&d[a](),"string"==typeof s?p=i.Et(e,s):"object"==typeof s?p=s:(u=n.split(":")).length>1&&(p=i.Et(e,u[0]),n=u[1]),!p)return;let v=r;(u=n.split(".")).length>1&&(n=u[0],v=(t=>{t.keyCode===x[u[1]]&&r(t)})),l=i.jt?{capture:!!c,passive:!!f}:!!c,t.ael(p,n,v,l),d||o.set(e,d={}),d[a]=(()=>{p&&t.rel(p,n,v,l),d[a]=null})},v:(t,e)=>{const n=o.get(t);n&&(e?n[e]&&n[e]():Object.keys(n).forEach(t=>{n[t]&&n[t]()}))},Nt:(t,n,o)=>{const i=new e.CustomEvent(n,o);return t&&t.dispatchEvent(i),i},R:(t,e)=>(e=i.r(t))&&11===i.D(e)?e.host:e,wt:(t,e)=>t.attachShadow(e)};return i}(b,o,i);e.isServer=e.isPrerender=!(e.isClient=!0),e.window=o,e.location=o.location,e.document=i,e.resourcesUrl=e.publicPath=r,b.h=u,b.Context=e;const w=o["s-defined"]=o["s-defined"]||{};let k=0;const j={o:y,St:a,At:e.emit,l:t=>d[y.A(t)],Rt:t=>e[t],isClient:!0,j:t=>!(!w[y.A(t)]&&!j.l(t)),yt:()=>t+k++,lt:(t,e,n)=>void 0,Tt:t=>(function e(t,n,o){return{create:g(t,n,o,"create"),componentOnReady:g(t,n,o,"componentOnReady")}})(y,v,t),queue:e.queue=function W(t,e){function n(e){return n=>{e.push(n),d||(d=!0,t.raf(r))}}function o(t){for(let e=0;e<t.length;e++)try{t[e](c())}catch(t){}t.length=0}function i(t,e){let n,o=0;for(;o<t.length&&(n=c())<e;)try{t[o++](n)}catch(t){}o===t.length?t.length=0:0!==o&&t.splice(0,o)}function r(){p++,o(l);const e=c()+7*Math.ceil(p*(1/22));i(u,e),i(a,e),u.length>0&&(a.push(...u),u.length=0),(d=l.length+u.length+a.length>0)?t.raf(r):p=0}const c=()=>e.performance.now(),f=Promise.resolve(),s=[],l=[],u=[],a=[];let p=0,d=!1;return t.raf||(t.raf=e.requestAnimationFrame.bind(e)),{tick(t){s.push(t),1===s.length&&f.then(()=>o(s))},read:n(l),write:n(u)}}(b,o),gt:function E(t,e,n){if(t.rt)m(j,e);else{const n="string"==typeof t.z?t.z:t.z[e.mode],o=!y.n;import(r+n+(o?".sc":"")+".entry.js").then(n=>{try{t.rt=n[(t=>O(t).split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(""))(t.t)],function o(t,e,n,i,r){if(i){const n=e.t+(r||C);if(!e[n]){const o=t.C("template");e[n]=o,o.innerHTML=`<style>${i}</style>`,t.W(t.i.head,o)}}}(y,t,t.e,t.rt.style,t.rt.styleMode),m(j,e)}catch(e){t.rt=class{}}},t=>void 0)}},pt:!1,et:!1,O:!1,at:n,it:new WeakMap,c:new WeakMap,mt:new WeakMap,Mt:new WeakMap,Ct:new WeakMap,x:new WeakMap,ct:new WeakMap,ut:new WeakMap,ot:new WeakMap,nt:new WeakMap,tt:new WeakMap,kt:new WeakMap,Lt:new WeakMap,dt:new WeakMap,ft:new WeakMap,_:new Set,vt:[]};b.onReady=(()=>new Promise(t=>j.queue.write(()=>j._.size?j.vt.push(t):t()))),j.render=f(j,y);const N=y.i.documentElement;return N["s-ld"]=[],N["s-rn"]=!0,N["s-init"]=(()=>{j.x.set(N,b.loaded=j.et=!0),y.Nt(o,"appload",{detail:{namespace:t}})}),function S(t,e,n){const o=n.querySelectorAll(`[${M}]`),i=o.length;let r,c,f,s,u,a;if(i>0)for(t.x.set(n,!0),s=0;s<i;s++)for(r=o[s],c=e.P(r,M),(f={}).vtag=e.A(f.m=r),t.dt.set(r,f),u=0,a=r.childNodes.length;u<a;u++)l(e,r.childNodes[u],f,c,!0)}(j,y,N),s.map(p).forEach(t=>a(t,class extends HTMLElement{})),j.bt||N["s-init"](),function A(t,e,n,o,i,r){if(e.componentOnReady=((e,n)=>{if(!e.nodeName.includes("-"))return n(null),!1;const o=t.l(e);if(o)if(t.x.has(e))n(e);else{const o=t.kt.get(e)||[];o.push(n),t.kt.set(e,o)}return!!o}),i){for(r=i.length-1;r>=0;r--)e.componentOnReady(i[r][0],i[r][1])&&i.splice(r,1);for(r=0;r<o.length;r++)if(!n[o[r]].componentOnReady)return;for(r=0;r<i.length;r++)i[r][1](null);i.length=0}}(j,b,o,o["s-apps"],o["s-cr"]),b.initialized=!0,j})(namespace,Context,window,document,resourcesUrl,hydratedCssClass,components);
})(window,document,{},"mycomponent","hydrated",[["symbol-label","mc3ts9c2",1,[["base",1,0,1,2]],1],["symbol-signal","q54r6wtl",1,[["first",1,0,1,2],["last",1,0,1,2],["middle",1,0,1,2]],1]]);