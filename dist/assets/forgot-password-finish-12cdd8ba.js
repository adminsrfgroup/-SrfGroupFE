import{R as a,k as O,V as R,fy as D,u as T,a as m,fz as M,fA as W,d as u,$ as G,fB as V,j as s,a2 as $,G as e,L as q,o as h,P as H,B as w,v as N,I as p,a4 as z}from"./index-cc58a329.js";import{C as K}from"./Container-c6f384ce.js";import{B as Q}from"./Breadcrumbs-27f8f572.js";import{d as U}from"./LockOutlined-ccfe3ff0.js";import{F as x,I as f,O as j,a as P}from"./OutlinedInput-400299d2.js";import{I as g}from"./InputAdornment-cc5e3223.js";import{d as b,a as S}from"./Visibility-191e6c26.js";import{c as J,d as X}from"./validation-signin-b85af5e9.js";const Y=X;function is(){const[y,_]=a.useState(!1),[n,F]=a.useState({showPassword:!1}),[i,v]=a.useState({showPassword:!1}),[C,k]=a.useState(""),{t}=O(),I=R(),d=D(),A=T(),B=m(M)??!1,l=m(W)??!1;a.useEffect(()=>{setTimeout(()=>{_(!0)},100)},[]),a.useEffect(()=>{l&&A(u.LOGIN)},[l]),a.useEffect(()=>{const r=d.get("key");r&&k(r)},[d]);const E=()=>{F({showPassword:!n.showPassword})},L=()=>{v({showPassword:!i.showPassword})},c=r=>{r.preventDefault()},o=G({initialValues:Y,validationSchema:J,onSubmit:r=>{I(V({password:r.password.toString(),key:C}))}});return s.jsx($,{direction:"up",in:y,mountOnEnter:!0,unmountOnExit:!0,children:s.jsxs(K,{maxWidth:"xl",children:[s.jsxs(e,{container:!0,style:{paddingTop:10},children:[s.jsx(e,{item:!0,sm:4}),s.jsx(e,{item:!0,xs:12,sm:6,children:s.jsxs(Q,{"aria-label":"breadcrumb",children:[s.jsx(q,{color:"inherit",to:u.HOME,children:"SRF"}),s.jsx(h,{color:"text.primary",children:t("signin.title_page_signin")})]})})]}),s.jsxs(e,{container:!0,sx:{pt:5,pb:5},children:[s.jsx(e,{item:!0,xs:4}),s.jsx(e,{item:!0,xs:12,sm:8,md:4,component:H,"md-offset":3,elevation:6,square:!0,children:s.jsxs(w,{sx:{my:4,mx:4,display:"flex",flexDirection:"column",alignItems:"center"},children:[s.jsx(N,{sx:{m:1,bgcolor:"secondary.main"},children:s.jsx(U,{})}),s.jsx(h,{component:"h1",variant:"h5",children:t("forgot_password_finish.title_forgot_password_finish")}),s.jsx(w,{sx:{mt:1,pb:2},children:s.jsxs("form",{onSubmit:o.handleSubmit,"data-testid":"login-form",children:[s.jsxs(e,{container:!0,spacing:2,children:[s.jsx(e,{item:!0,xs:12,children:s.jsxs(x,{fullWidth:!0,error:o.touched.password&&!!o.errors.password,children:[s.jsx(f,{htmlFor:"outlined-adornment-title",children:t("common.label_password")}),s.jsx(j,{id:"password",name:"password",type:n.showPassword?"text":"password",label:t("common.label_password"),value:o.values.password,onChange:o.handleChange,inputProps:{"data-testid":"password"},endAdornment:s.jsx(g,{position:"end",children:s.jsx(p,{"aria-label":"toggle password visibility",onClick:E,onMouseDown:c,edge:"end",children:n.showPassword?s.jsx(b,{}):s.jsx(S,{})})})}),s.jsx(P,{id:"component-helper-text",children:o.touched.password&&o.errors.password})]})}),s.jsx(e,{item:!0,xs:12,children:s.jsxs(x,{fullWidth:!0,error:o.touched.confPassword&&!!o.errors.confPassword,children:[s.jsx(f,{htmlFor:"outlined-adornment-title",children:t("common.label_confirm_password")}),s.jsx(j,{id:"confPassword",name:"confPassword",type:i.showPassword?"text":"password",label:t("common.label_confirm_password"),value:o.values.confPassword,onChange:o.handleChange,inputProps:{"data-testid":"password"},endAdornment:s.jsx(g,{position:"end",children:s.jsx(p,{"aria-label":"toggle password visibility",onClick:L,onMouseDown:c,edge:"end",children:i.showPassword?s.jsx(b,{}):s.jsx(S,{})})})}),s.jsx(P,{id:"component-helper-text",children:o.touched.confPassword&&o.errors.confPassword})]})})]}),s.jsx(z,{loading:B,fullWidth:!0,variant:"contained",color:"neutral",type:"submit","data-testid":"submit",sx:{mt:3,mb:2},children:t("common.label_update")})]})})]})}),s.jsx(e,{item:!0,xs:4})]})]})})}export{is as default};