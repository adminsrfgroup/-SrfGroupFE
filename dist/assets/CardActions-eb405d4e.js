import{aP as d,aQ as p,y as u,aR as e,r as C,aS as g,aT as m,j as f,aU as x,aV as A}from"./index-cc58a329.js";function S(s){return d("MuiCardActions",s)}p("MuiCardActions",["root","spacing"]);const y=["disableSpacing","className"],b=s=>{const{classes:t,disableSpacing:a}=s;return A({root:["root",!a&&"spacing"]},S,t)},R=u("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(s,t)=>{const{ownerState:a}=s;return[t.root,!a.disableSpacing&&t.spacing]}})(({ownerState:s})=>e({display:"flex",alignItems:"center",padding:8},!s.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})),U=C.forwardRef(function(t,a){const o=g({props:t,name:"MuiCardActions"}),{disableSpacing:r=!1,className:i}=o,c=m(o,y),n=e({},o,{disableSpacing:r}),l=b(n);return f.jsx(R,e({className:x(l.root,i),ownerState:n,ref:a},c))}),w=U;export{w as C};
