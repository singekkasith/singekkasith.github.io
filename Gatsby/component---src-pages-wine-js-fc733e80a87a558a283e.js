"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[435],{6173:function(e,t,r){r.r(t),r.d(t,{default:function(){return i}});var a=r(7294);const l={borderRadius:"5%",width:"5rem"},n={borderRadius:"25px",width:"40rem",overflow:"hidden",background:"#774360",marginBottom:"2rem",padding:"1rem"},s={marginLeft:"9rem",background:"#774360",color:"#E7AB79"};function i(){let e=[],[t,r]=a.useState([]);return a.useEffect((async()=>{let t=await fetch("https://api.sampleapis.com/wines/reds"),i=await t.json();for(let r=0;r<i.length;r++)console.log(i[r].title),e.push(a.createElement("div",{style:n},a.createElement("div",{style:{width:"8rem",float:"left"}},a.createElement("img",{style:l,src:i[r].image})),a.createElement("div",{style:s},a.createElement("h3",null," ",i[r].winery)," - ",i[r].wine)));r(e)}),[]),a.createElement("body",{style:{backgroundColor:"#4C3A51"}},a.createElement("div",{style:{marginLeft:"4rem"}},a.createElement("h1",{style:{color:"#B25068"}},"Red Wines"),a.createElement("main",null,t)))}}}]);
//# sourceMappingURL=component---src-pages-wine-js-fc733e80a87a558a283e.js.map