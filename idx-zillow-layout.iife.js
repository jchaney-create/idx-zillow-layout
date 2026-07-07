var IdxZillowLayout=(function(h){"use strict";function j(){return!!(/\/idx\/details\//i.test(window.location.pathname)||/details\.php/i.test(window.location.pathname)||document.querySelector("#IDX-main.IDX-page-listing, #IDX-main.IDX-category-details")||document.querySelector('#IDX-detailsHeader, #IDX-detailsWrapper, [id^="IDX-detailsField-"]'))}function L(e){var n;return e?((n=(e.querySelector(".IDX-fieldData")||e.querySelector(".IDX-text")||e).textContent)==null?void 0:n.trim().replace(/\s+/g," "))??"":""}function s(e){const t=document.getElementById(`IDX-detailsField-${e}`);if(t)return L(t);const n=document.querySelector(`.IDX-field-${e} .IDX-text`)||document.querySelector(`#IDX-field-${e} .IDX-text`);return L(n)}function u(e){var n;const t=document.querySelector(`input[type="hidden"][name="${e}"]`);return((n=t==null?void 0:t.value)==null?void 0:n.trim())??""}function H(){const e=document.querySelectorAll("script:not([src])");for(const t of e){const r=(t.textContent??"").match(/\{"page"\s*:\s*"listing"[\s\S]*?\}/);if(r)try{return JSON.parse(r[0])}catch{}}return null}function R(){const e=document.querySelector("#IDX-saveProperty[data-listingid]");return e?{listingID:e.dataset.listingid||"",idxID:e.dataset.idxid||""}:null}function O(){const e=document.querySelector("#IDX-detailsAddressStreet"),t=document.querySelector("#IDX-detailsAddressRegion");if(e||t){const n=e?Array.from(e.querySelectorAll("span")).map(i=>{var a;return(a=i.textContent)==null?void 0:a.trim()}).filter(Boolean).join(" ").replace(/\s+/g," "):"";let r="",o="",l="";if(t){const i=Array.from(t.querySelectorAll(":scope > span")).map(a=>{var d;return(d=a.textContent)==null?void 0:d.trim()}).filter(Boolean);i.length>=1&&(r=i[0].replace(/,\s*$/,"")),i.length>=2&&(o=i[1]),i.length>=3&&(l=i[2])}return{street:n,city:r,state:o,zipcode:l}}return _()}function _(){var d,m,f,y,g,I,D,b,S,v,X,z,q,A;const e=((m=(d=document.querySelector(".IDX-detailsAddressNumber"))==null?void 0:d.textContent)==null?void 0:m.trim())??"",t=((y=(f=document.querySelector(".IDX-detailsAddressName"))==null?void 0:f.textContent)==null?void 0:y.trim())??"",n=((I=(g=document.querySelector(".IDX-detailsAddressUnitNumber"))==null?void 0:g.textContent)==null?void 0:I.trim())??"",r=((b=(D=document.querySelector(".IDX-detailsAddressCity"))==null?void 0:D.textContent)==null?void 0:b.trim().replace(/,\s*$/,""))??"",o=((v=(S=document.querySelector(".IDX-detailsAddressStateAbrv"))==null?void 0:S.textContent)==null?void 0:v.trim())??"",l=((z=(X=document.querySelector(".IDX-detailsAddressState"))==null?void 0:X.textContent)==null?void 0:z.trim())??"",i=((A=(q=document.querySelector(".IDX-detailsAddressZipcode"))==null?void 0:q.textContent)==null?void 0:A.trim())??"";let a=[e,t].filter(Boolean).join(" ").replace(/\s+/g," ");return n&&a&&!a.includes(n)&&(a=`${a} ${n}`.trim()),{street:a,city:r,state:o||l,zipcode:i}}function G(){var n;const e=(n=document.querySelector('meta[name="keywords"]'))==null?void 0:n.getAttribute("content");if(!e)return null;const t=e.split(",").map(r=>r.trim()).filter(Boolean);return t.length<6?null:{listingId:t[0]||"",address:t[1]||"",city:t[2]||"",stateName:t[3]||"",state:t[4]||"",zipcode:t[5]||"",county:t[6]||"",priceDisplay:t[7]||"",propertyType:t[8]||"",propertySubType:t[9]||""}}function U(){var n;const e=(n=window.mortgageCalc)==null?void 0:n.mortPrice;if(e==null||e==="")return null;const t=Number(String(e).replace(/[^0-9.]/g,""));return Number.isFinite(t)?t:null}function p(e){if(!e)return null;const t=e.replace(/[^0-9.]/g,""),n=Number(t);return Number.isFinite(n)?n:null}function W(){var r,o;const e=document.querySelector("[data-latitude][data-longitude]")||document.querySelector("#IDX-map")||document.querySelector(".IDX-map");if((r=e==null?void 0:e.dataset)!=null&&r.latitude&&((o=e==null?void 0:e.dataset)!=null&&o.longitude))return{lat:Number(e.dataset.latitude),lng:Number(e.dataset.longitude)};const t=document.querySelector('input[name="latitude"], input[name="lat"]'),n=document.querySelector('input[name="longitude"], input[name="lng"]');return t!=null&&t.value&&(n!=null&&n.value)?{lat:Number(t.value),lng:Number(n.value)}:null}function J(){var n,r;const e=["#IDX-detailsDescription .IDX-clamp__target","#IDX-detailsDescription","#IDX-description","#IDX-description .IDX-clamp__target","#IDX-detailsField-remarks","#IDX-detailsField-publicRemarks",".IDX-detailsDescription",".IDX-remarks"];for(const o of e){const l=document.querySelector(o),i=(n=l==null?void 0:l.textContent)==null?void 0:n.trim().replace(/\s+/g," ");if(i)return i}const t=(r=document.querySelector('meta[property="og:description"]'))==null?void 0:r.getAttribute("content");return(t==null?void 0:t.trim())??""}function E(...e){for(const t of e){const n=s(t);if(n)return n}return""}function Y(){const t=[{keys:["elementarySchool"],label:"Elementary"},{keys:["middleOrJuniorSchool","middleSchool"],label:"Middle School"},{keys:["highSchool"],label:"High School"}].map(({keys:r,label:o})=>{const l=E(...r);return l?{name:l,level:o,source:"mls"}:null}).filter(Boolean),n=E("schoolDistrictName","schoolDistrict");return{schools:t,district:n}}function Z(){const e=window.location.pathname.match(/\/idx\/details\/listing\/([^/]+)\/([^/?#]+)/i);return e?{idxId:e[1],listingId:e[2]}:{idxId:"",listingId:""}}function V(){var M,k;const e=H(),t=R(),n=O(),r=G(),o=Z(),l=Y(),i=u("address")||n.street||s("address")||s("fullAddress")||(r==null?void 0:r.address)||"",a=u("cityName")||n.city||s("cityName")||s("city")||(r==null?void 0:r.city)||"",d=u("stateAbrv")||n.state||u("state")||s("state")||s("stateAbrv")||(r==null?void 0:r.state)||"",m=u("zipcode")||n.zipcode||s("zipcode")||s("zip")||(r==null?void 0:r.zipcode)||"",f=u("listingPrice")||s("listingPrice")||s("price")||(r==null?void 0:r.priceDisplay)||((k=(M=document.querySelector(".IDX-detailsPrice, .IDX-price"))==null?void 0:M.textContent)==null?void 0:k.trim())||"",y=U(),g=p(s("bedrooms"))??p(s("beds"))??p(u("bedrooms")),I=p(s("totalBaths"))??p(s("bathrooms"))??p(u("totalBaths")),D=p(s("sqFt"))??p(s("squareFeet"))??p(u("sqFt")),b=p(s("acres")),S=p(s("yearBuilt")),v=s("countyName")||(r==null?void 0:r.county)||"",X=s("propType")||s("propertyType")||u("idxPropType")||(r==null?void 0:r.propertyType)||"",z=s("propSubType")||(r==null?void 0:r.propertySubType)||"",q=u("listingID")||(t==null?void 0:t.listingID)||s("listingID")||o.listingId||(e==null?void 0:e.listingID)||(r==null?void 0:r.listingId)||"",A=u("idxID")||(t==null?void 0:t.idxID)||o.idxId||(e==null?void 0:e.idxID)||"",ze=W(),qe=J(),Ae=[i,a,d,m].filter(Boolean).join(", ");return{listingId:q,idxId:A,origin:window.location.origin,pageUrl:window.location.href,address:i,city:a,state:d,zipcode:m,county:v,fullAddress:Ae,price:y??p(f),priceDisplay:f||(y!=null?`$${y.toLocaleString()}`:null),bedrooms:g,bathrooms:I,sqft:D,acres:b,yearBuilt:S,propertyType:X,propertySubType:z,description:qe,coordinates:ze,schools:l.schools,schoolDistrict:l.district}}function Q({timeoutMs:e=15e3,intervalMs:t=250}={}){return new Promise((n,r)=>{const o=Date.now(),l=()=>{const i=V();if(!!(i.fullAddress||i.listingId||i.price||i.description)){n(i);return}if(Date.now()-o>=e){r(new Error("Timed out waiting for IDX listing data"));return}setTimeout(l,t)};l()})}function K(e){return e?e.trim().replace(/\s+/g,""):""}function C(e,t){const n=K(t);!n||e.includes(n)||e.push(n)}function ee(){const e=[];return document.querySelectorAll("#IDX-primaryPhoto img, .swiper-slide img, .IDX-carouselThumb img").forEach(t=>{C(e,t.getAttribute("data-src")||t.getAttribute("src"))}),document.querySelectorAll("#IDX-detailsShowcaseSlides img, #IDX-detailsMedia img").forEach(t=>{C(e,t.getAttribute("data-src")||t.getAttribute("src"))}),document.querySelectorAll('meta[property="og:image"]').forEach(t=>{C(e,t.getAttribute("content"))}),e.filter(t=>t&&!t.includes("ajaxLoadLarge.gif"))}function te(){var e,t;return((e=document.querySelector("#IDX-detailsPhotoGalleryLink, #IDX-photoGalleryLink"))==null?void 0:e.href)||((t=document.querySelector('a[href*="/idx/photogallery/"]'))==null?void 0:t.href)||null}function ne(e){var r,o,l,i;const t=((o=(r=e.querySelector(".IDX-label"))==null?void 0:r.textContent)==null?void 0:o.trim())??"",n=((i=(l=e.querySelector(".IDX-text, .IDX-fieldData"))==null?void 0:l.textContent)==null?void 0:i.trim().replace(/\s+/g," "))??"";return!t||!n?null:{label:t,value:n}}function re(){const e=[];return document.querySelectorAll("#IDX-fieldsWrapper .IDX-panel, #IDX-detailsFields .IDX-panel, #IDX-detailsBasicInfo").forEach(n=>{var i,a,d,m;const r=((a=(i=n.querySelector(".IDX-panel-title"))==null?void 0:i.textContent)==null?void 0:a.trim().replace(/\s+/g," "))||((m=(d=n.querySelector(".IDX-panel-heading"))==null?void 0:d.textContent)==null?void 0:m.trim().replace(/\s+/g," "))||"Property details",o=Array.from(n.querySelectorAll(".IDX-field")).map(ne).filter(Boolean);if(!o.length)return;const l=e.find(f=>f.title===r);if(l){l.fields.push(...o);return}e.push({title:r,fields:o})}),e}function oe(e){const t=[];return e.propertyType&&t.push({label:"Type",value:e.propertyType}),e.propertySubType&&t.push({label:"Sub type",value:e.propertySubType}),e.yearBuilt!=null&&t.push({label:"Year built",value:String(e.yearBuilt)}),e.sqft!=null&&t.push({label:"Square feet",value:e.sqft.toLocaleString()}),e.acres!=null&&t.push({label:"Lot size",value:`${e.acres} acres`}),e.county&&t.push({label:"County",value:e.county}),e.schoolDistrict&&t.push({label:"School district",value:e.schoolDistrict}),e.listingId&&t.push({label:"Listing ID",value:e.listingId}),t}function ie(){var o,l,i;const e=document.querySelector('#IDX-moreinfo, #IDX-detailsDescriptionActionsMoreInfo, a[href*="/idx/moreinfo/"]'),t=document.querySelector('#IDX-scheduleShowing, a[href*="/idx/scheduleshowing/"]'),n=document.querySelector("#IDX-saveProperty"),r=document.querySelector("#IDX-detailsContactForm, #IDX-detailscontactContactForm");return{moreInfo:(e==null?void 0:e.href)||null,moreInfoLabel:((o=e==null?void 0:e.textContent)==null?void 0:o.trim())||"Request info",schedule:(t==null?void 0:t.href)||null,scheduleLabel:((l=t==null?void 0:t.textContent)==null?void 0:l.trim())||"Schedule a tour",saveSelector:n?"#IDX-saveProperty":null,saveLabel:((i=n==null?void 0:n.textContent)==null?void 0:i.trim())||"Save listing",contactTarget:(r==null?void 0:r.id)||"IDX-detailsContactForm"}}function le(e,t){e.querySelectorAll("[data-izl-action]").forEach(n=>{n.addEventListener("click",r=>{var l;const o=n.getAttribute("data-izl-action");if(o==="more-info"&&t.moreInfo){r.preventDefault(),window.location.href=t.moreInfo;return}if(o==="schedule"&&t.schedule){r.preventDefault(),window.location.href=t.schedule;return}if(o==="save"&&t.saveSelector){r.preventDefault(),(l=document.querySelector(t.saveSelector))==null||l.click();return}if(o==="contact"){r.preventDefault();const i=document.getElementById(t.contactTarget);i&&i.scrollIntoView({behavior:"smooth",block:"start"})}})})}function c(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ae(e,t){if(!e.length)return'<div class="izl-gallery-empty">Photos unavailable</div>';const n=e[0],r=e.slice(1,7),o=Math.max(e.length-7,0);return`
    <div class="izl-gallery">
      <div class="izl-gallery-hero">
        <img src="${c(n)}" alt="Primary listing photo" />
        ${t?`<a class="izl-gallery-all" href="${c(t)}">See all ${e.length} photos</a>`:`<span class="izl-gallery-all">${e.length} photos</span>`}
      </div>
      <div class="izl-gallery-thumbs">
        ${r.map((l,i)=>`
              <button type="button" class="izl-gallery-thumb" data-izl-photo-index="${i+1}">
                <img src="${c(l)}" alt="" />
              </button>
            `).join("")}
        ${o>0?`<div class="izl-gallery-more">+${o} more</div>`:""}
      </div>
    </div>
  `}function F(e){const t=[e.bedrooms!=null?`<span><strong>${e.bedrooms}</strong> bd</span>`:"",e.bathrooms!=null?`<span><strong>${e.bathrooms}</strong> ba</span>`:"",e.sqft!=null?`<span><strong>${e.sqft.toLocaleString()}</strong> sqft</span>`:"",e.acres!=null?`<span><strong>${e.acres}</strong> ac</span>`:""].filter(Boolean);return t.length?`<div class="izl-stats">${t.join("")}</div>`:""}function se(e){return e.length?`
    <div class="izl-facts-grid">
      ${e.map(t=>`
            <div class="izl-fact">
              <span>${c(t.label)}</span>
              <strong>${c(t.value)}</strong>
            </div>
          `).join("")}
    </div>
  `:""}function ce(e){return e.length?e.map(t=>`
        <details class="izl-accordion" open>
          <summary>${c(t.title)}</summary>
          <dl class="izl-field-list">
            ${t.fields.map(n=>`
                  <div>
                    <dt>${c(n.label)}</dt>
                    <dd>${c(n.value)}</dd>
                  </div>
                `).join("")}
          </dl>
        </details>
      `).join(""):'<p class="izl-muted">No additional property details found.</p>'}function de(e,t){return`
    <aside class="izl-sidebar">
      <div class="izl-sidebar-card">
        <div class="izl-price">${c(e.priceDisplay||"Price unavailable")}</div>
        <div class="izl-address-block">
          <strong>${c(e.address||e.fullAddress)}</strong>
          <span>${c([e.city,e.state,e.zipcode].filter(Boolean).join(", "))}</span>
        </div>
        ${F(e)}
        <div class="izl-sidebar-actions">
          ${t.schedule?`<button type="button" class="izl-btn izl-btn-primary" data-izl-action="schedule">${c(t.scheduleLabel)}</button>`:""}
          <button type="button" class="izl-btn izl-btn-secondary" data-izl-action="contact">Contact agent</button>
          ${t.moreInfo?`<button type="button" class="izl-btn izl-btn-ghost" data-izl-action="more-info">${c(t.moreInfoLabel)}</button>`:""}
          ${t.saveSelector?`<button type="button" class="izl-btn izl-btn-ghost" data-izl-action="save">${c(t.saveLabel)}</button>`:""}
        </div>
      </div>
    </aside>
  `}function ue({listing:e,photos:t,galleryUrl:n,fieldGroups:r,highlightFacts:o,actions:l}){var i;return`
    <div class="izl-page">
      ${ae(t,n)}

      <div class="izl-body">
        <div class="izl-main">
          <header class="izl-header">
            <div class="izl-price-mobile">${c(e.priceDisplay||"")}</div>
            <h1 class="izl-title">${c(e.fullAddress||e.address||"Listing details")}</h1>
            ${F(e)}
            <p class="izl-meta">${c([e.propertyType,e.propertySubType,e.county?`${e.county} County`:""].filter(Boolean).join(" · "))}</p>
          </header>

          <section class="izl-section">
            <h2>What's special</h2>
            ${se(o)}
          </section>

          ${e.description?`<section class="izl-section">
                  <h2>About this home</h2>
                  <p class="izl-description">${c(e.description)}</p>
                </section>`:""}

          ${(i=e.schools)!=null&&i.length?`<section class="izl-section">
                  <h2>Schools</h2>
                  <ul class="izl-schools">
                    ${e.schools.map(a=>`<li><strong>${c(a.name)}</strong><span>${c(a.level||"")}</span></li>`).join("")}
                  </ul>
                </section>`:""}

          <section class="izl-section">
            <h2>Facts &amp; features</h2>
            ${ce(r)}
          </section>
        </div>

        ${de(e,l)}
      </div>
    </div>
  `}function pe(e,t){const n=e.querySelector(".izl-gallery-hero img");e.querySelectorAll("[data-izl-photo-index]").forEach(r=>{r.addEventListener("click",()=>{const o=Number(r.getAttribute("data-izl-photo-index"));!n||!t[o]||(n.src=t[o],e.querySelectorAll(".izl-gallery-thumb").forEach(l=>l.classList.remove("is-active")),r.classList.add("is-active"))})})}function me(e,t){e.innerHTML=t}const $="idx-zillow-layout-replace-css",fe=`
  html[data-izl-active='true'] ${["#IDX-Subheader","#IDX-detailsTopNav","#IDX-detailsTopActions","#IDX-detailsHeader","#IDX-detailsHead","#IDX-detailsMedia","#IDX-detailsAddress","#IDX-detailsMainInfo","#IDX-description","#IDX-detailsDescription","#IDX-detailsFields","#IDX-fieldsWrapper","#IDX-detailsHotActions","#IDX-details-row-content","#IDX-detailsPageContainer","#IDX-detailsMain","#IDX-similar-listings-title","#IDX-similar-listings-result","#IDX-sharethis","#IDX-detailsShareThis","#IDX-detailsSlidesActions","ai-redesign-widget","#idx-listing-insights"].join(`,
  `)} {
    display: none !important;
  }

  html[data-izl-active='true'] #IDX-detailsWrapper > :not(#idx-zillow-layout):not(script):not(style):not(link) {
    display: none !important;
  }

  html[data-izl-active='true'] #IDX-main.IDX-page-listing,
  html[data-izl-active='true'] #IDX-main.IDX-category-details {
    background: #eef2f7;
  }

  html[data-izl-active='true'] #idx-zillow-layout {
    display: block !important;
  }

  html[data-izl-active='true'] .izl-native-contact {
    display: block !important;
  }
`;function ye(){if(document.documentElement.dataset.izlActive="true",!document.getElementById($)){const e=document.createElement("style");e.id=$,e.textContent=fe,document.head.appendChild(e)}}function he(){var e;delete document.documentElement.dataset.izlActive,(e=document.getElementById($))==null||e.remove()}const ge=["#IDX-detailsContactForm","#IDX-scheduleshowingContainer","#IDX-detailscontactContainer"];function Ie(e){const t=e.querySelector(".izl-page");if(t)for(const n of ge){const r=document.querySelector(n);if(!r)continue;let o=t.querySelector(".izl-native-contact");o||(o=document.createElement("section"),o.className="izl-section izl-native-contact",o.innerHTML="<h2>Contact agent</h2>",t.appendChild(o)),o.appendChild(r);return}}function T(){return document.querySelector("#IDX-detailsWrapper")||document.querySelector("#IDX-main")}function De({timeoutMs:e=2e4,intervalMs:t=100}={}){return new Promise((n,r)=>{const o=Date.now(),l=()=>{const d=T();return d?(n(d),!0):!1};if(l())return;const i=new MutationObserver(()=>{l()&&i.disconnect()});i.observe(document.documentElement,{childList:!0,subtree:!0});const a=()=>{if(l()){i.disconnect();return}if(Date.now()-o>=e){i.disconnect(),r(new Error("IDX details container not found"));return}setTimeout(a,t)};a()})}function be(e,t=T()){if(!t)return null;let n=document.getElementById(e.containerId);return n&&n.parentElement!==t&&t.insertBefore(n,t.firstChild),n||(n=document.createElement("div"),n.id=e.containerId,t.insertBefore(n,t.firstChild)),n}function Se(e){var t;(t=document.getElementById(e.containerId))==null||t.remove()}const w="[idx-zillow-layout]";function ve(){var t,n;if((n=(t=document.currentScript)==null?void 0:t.src)!=null&&n.includes("idx-zillow-layout"))return document.currentScript;const e=document.querySelectorAll('script[src*="idx-zillow-layout"]');return e[e.length-1]||null}function B(){var t,n,r;const e=ve();return{containerId:((t=e==null?void 0:e.dataset)==null?void 0:t.containerId)||"idx-zillow-layout",replaceContent:((n=e==null?void 0:e.dataset)==null?void 0:n.replaceContent)!=="false",autoMount:((r=e==null?void 0:e.dataset)==null?void 0:r.autoMount)!=="false"}}function P(...e){console.info(w,...e)}function x(...e){console.warn(w,...e)}async function N(e){if(!j()){P("Not a listing details page — skipping.");return}let t;try{t=await De()}catch(r){x(r.message||"IDX details container not found");return}const n=e.autoMount?be(e,t):document.getElementById(e.containerId);if(!n){x(`Container #${e.containerId} not found`);return}n.classList.add("izl-loading"),n.innerHTML='<div class="izl-page"><p class="izl-muted">Loading listing layout…</p></div>';try{const r=await Q({timeoutMs:2e4}),o=ee(),l=te(),i=re(),a=oe(r),d=ie();me(n,ue({listing:r,photos:o,galleryUrl:l,fieldGroups:i,highlightFacts:a,actions:d})),pe(n,o),le(n,d),e.replaceContent&&(Ie(n),ye()),n.classList.remove("izl-loading"),n.classList.add("izl-ready"),P("Layout ready for",r.fullAddress||r.listingId||window.location.pathname)}catch(r){he(),Se(e),x(r.message||"Unable to render listing layout.")}}function Xe(){const e=B(),t=()=>N(e);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}return Xe(),h.initLayout=N,h.readConfig=B,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"}),h})({});
