function W(){}function X(t,e){for(const n in e)t[n]=e[n];return t}function G(t){return t()}function D(){return Object.create(null)}function $(t){t.forEach(G)}function Y(t){return typeof t=="function"}function pt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Z(t){return Object.keys(t).length===0}function yt(t,e,n,i){if(t){const c=J(t,e,n,i);return t[0](c)}}function J(t,e,n,i){return t[1]&&i?X(n.ctx.slice(),t[1](i(e))):n.ctx}function gt(t,e,n,i){if(t[2]&&i){const c=t[2](i(n));if(e.dirty===void 0)return c;if(typeof c=="object"){const u=[],o=Math.max(e.dirty.length,c.length);for(let l=0;l<o;l+=1)u[l]=e.dirty[l]|c[l];return u}return e.dirty|c}return e.dirty}function xt(t,e,n,i,c,u){if(c){const o=J(e,n,i,u);t.p(o,c)}}function wt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function bt(t){return t==null?"":t}let j=!1;function tt(){j=!0}function et(){j=!1}function nt(t,e,n,i){for(;t<e;){const c=t+(e-t>>1);n(c)<=i?t=c+1:e=c}return t}function it(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let s=0;s<e.length;s++){const f=e[s];f.claim_order!==void 0&&r.push(f)}e=r}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let c=0;for(let r=0;r<e.length;r++){const s=e[r].claim_order,f=(c>0&&e[n[c]].claim_order<=s?c+1:nt(1,c,d=>e[n[d]].claim_order,s))-1;i[r]=n[f]+1;const _=f+1;n[_]=r,c=Math.max(_,c)}const u=[],o=[];let l=e.length-1;for(let r=n[c]+1;r!=0;r=i[r-1]){for(u.push(e[r-1]);l>=r;l--)o.push(e[l]);l--}for(;l>=0;l--)o.push(e[l]);u.reverse(),o.sort((r,s)=>r.claim_order-s.claim_order);for(let r=0,s=0;r<o.length;r++){for(;s<u.length&&o[r].claim_order>=u[s].claim_order;)s++;const f=s<u.length?u[s]:null;t.insertBefore(o[r],f)}}function rt(t,e){if(j){for(it(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function $t(t,e,n){j&&!n?rt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function ot(t){t.parentNode.removeChild(t)}function kt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function ct(t){return document.createElement(t)}function B(t){return document.createTextNode(t)}function vt(){return B(" ")}function Et(){return B("")}function St(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function At(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function jt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function lt(t){return Array.from(t.childNodes)}function st(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function K(t,e,n,i,c=!1){st(t);const u=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const l=t[o];if(e(l)){const r=n(l);return r===void 0?t.splice(o,1):t[o]=r,c||(t.claim_info.last_index=o),l}}for(let o=t.claim_info.last_index-1;o>=0;o--){const l=t[o];if(e(l)){const r=n(l);return r===void 0?t.splice(o,1):t[o]=r,c?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=o,l}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function ut(t,e,n,i){return K(t,c=>c.nodeName===e,c=>{const u=[];for(let o=0;o<c.attributes.length;o++){const l=c.attributes[o];n[l.name]||u.push(l.name)}u.forEach(o=>c.removeAttribute(o))},()=>i(e))}function Nt(t,e,n){return ut(t,e,n,ct)}function at(t,e){return K(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>B(e),!0)}function Mt(t){return at(t," ")}function Ct(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function qt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Lt(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}function Pt(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}function Tt(t,e,n){t.classList[n?"add":"remove"](e)}function Bt(t,e=document.body){return Array.from(e.querySelectorAll(t))}let b;function w(t){b=t}function O(){if(!b)throw new Error("Function called outside component initialization");return b}function Ot(t){O().$$.on_mount.push(t)}function It(t){O().$$.after_update.push(t)}function zt(t,e){return O().$$.context.set(t,e),e}const x=[],F=[],S=[],H=[],Q=Promise.resolve();let P=!1;function R(){P||(P=!0,Q.then(U))}function Dt(){return R(),Q}function T(t){S.push(t)}const L=new Set;let E=0;function U(){const t=b;do{for(;E<x.length;){const e=x[E];E++,w(e),ft(e.$$)}for(w(null),x.length=0,E=0;F.length;)F.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];L.has(n)||(L.add(n),n())}S.length=0}while(x.length);for(;H.length;)H.pop()();P=!1,L.clear(),w(t)}function ft(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(T)}}const A=new Set;let g;function Ft(){g={r:0,c:[],p:g}}function Ht(){g.r||$(g.c),g=g.p}function V(t,e){t&&t.i&&(A.delete(t),t.i(e))}function dt(t,e,n,i){if(t&&t.o){if(A.has(t))return;A.add(t),g.c.push(()=>{A.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Wt(t,e){t.d(1),e.delete(t.key)}function Gt(t,e){dt(t,1,1,()=>{e.delete(t.key)})}function Jt(t,e,n,i,c,u,o,l,r,s,f,_){let d=t.length,m=u.length,h=d;const N={};for(;h--;)N[t[h].key]=h;const k=[],M=new Map,C=new Map;for(h=m;h--;){const a=_(c,u,h),p=n(a);let y=o.get(p);y?i&&y.p(a,e):(y=s(p,a),y.c()),M.set(p,k[h]=y),p in N&&C.set(p,Math.abs(h-N[p]))}const I=new Set,z=new Set;function q(a){V(a,1),a.m(l,f),o.set(a.key,a),f=a.first,m--}for(;d&&m;){const a=k[m-1],p=t[d-1],y=a.key,v=p.key;a===p?(f=a.first,d--,m--):M.has(v)?!o.has(y)||I.has(y)?q(a):z.has(v)?d--:C.get(y)>C.get(v)?(z.add(y),q(a)):(I.add(v),d--):(r(p,o),d--)}for(;d--;){const a=t[d];M.has(a.key)||r(a,o)}for(;m;)q(k[m-1]);return k}function Kt(t,e){const n={},i={},c={$$scope:1};let u=t.length;for(;u--;){const o=t[u],l=e[u];if(l){for(const r in o)r in l||(i[r]=1);for(const r in l)c[r]||(n[r]=l[r],c[r]=1);t[u]=l}else for(const r in o)c[r]=1}for(const o in i)o in n||(n[o]=void 0);return n}function Qt(t){return typeof t=="object"&&t!==null?t:{}}function Rt(t){t&&t.c()}function Ut(t,e){t&&t.l(e)}function _t(t,e,n,i){const{fragment:c,on_mount:u,on_destroy:o,after_update:l}=t.$$;c&&c.m(e,n),i||T(()=>{const r=u.map(G).filter(Y);o?o.push(...r):$(r),t.$$.on_mount=[]}),l.forEach(T)}function ht(t,e){const n=t.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function mt(t,e){t.$$.dirty[0]===-1&&(x.push(t),R(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Vt(t,e,n,i,c,u,o,l=[-1]){const r=b;w(t);const s=t.$$={fragment:null,ctx:null,props:u,update:W,not_equal:c,bound:D(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(r?r.$$.context:[])),callbacks:D(),dirty:l,skip_bound:!1,root:e.target||r.$$.root};o&&o(s.root);let f=!1;if(s.ctx=n?n(t,e.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return s.ctx&&c(s.ctx[_],s.ctx[_]=h)&&(!s.skip_bound&&s.bound[_]&&s.bound[_](h),f&&mt(t,_)),d}):[],s.update(),f=!0,$(s.before_update),s.fragment=i?i(s.ctx):!1,e.target){if(e.hydrate){tt();const _=lt(e.target);s.fragment&&s.fragment.l(_),_.forEach(ot)}else s.fragment&&s.fragment.c();e.intro&&V(t.$$.fragment),_t(t,e.target,e.anchor,e.customElement),et(),U()}w(r)}class Xt{$destroy(){ht(this,1),this.$destroy=W}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const c=i.indexOf(n);c!==-1&&i.splice(c,1)}}$set(e){this.$$set&&!Z(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Kt as A,Qt as B,ht as C,X as D,Dt as E,yt as F,xt as G,wt as H,gt as I,rt as J,bt as K,kt as L,Jt as M,Wt as N,Tt as O,St as P,At as Q,Gt as R,Xt as S,Bt as T,T as U,Lt as V,$ as W,Pt as X,vt as a,$t as b,Mt as c,Ht as d,Et as e,V as f,Ft as g,ot as h,Vt as i,zt as j,It as k,ct as l,Nt as m,W as n,Ot as o,lt as p,jt as q,qt as r,pt as s,dt as t,B as u,at as v,Ct as w,Rt as x,Ut as y,_t as z};