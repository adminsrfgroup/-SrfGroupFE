import{N as re,O as j,Q as ne,U as le,R as t,k as ce,u as de,V as ue,a as l,W as me,X as he,Y as ge,Z as xe,_ as pe,$ as fe,a0 as je,r as we,h as R,a1 as be,j as e,a2 as Ce,G as i,L as D,d as w,o as F,P as Pe,B as c,v as _e,I,a3 as Se,a4 as ye,z as ve,a5 as U,a6 as ke,a7 as B,a8 as E,a9 as G,aa as Oe,ab as q,ac as b,ad as Re,ae as De,af as Fe,ag as Ie,ah as Ue,ai as Be}from"./index-cc58a329.js";import{d as Ee}from"./LockOutlined-ccfe3ff0.js";import{F as d,I as C,O as P,a as u}from"./OutlinedInput-400299d2.js";import{I as T}from"./InputAdornment-cc5e3223.js";import{B as Ge}from"./Breadcrumbs-27f8f572.js";import{C as qe}from"./Container-c6f384ce.js";import{d as Te}from"./Facebook-3f5bc5ed.js";import{d as Le}from"./Google-1d9a9d5d.js";import{V as L,a as A}from"./VisibilityOff-4c19f2bc.js";import{C as Ae}from"./Checkbox-f866ef39.js";const We={email:"",firstPassword:"",secondPassword:"",accept:!1},Me=re({email:j().email().required("Email is required"),firstPassword:j().required("Password is required").min(5,"Min 5 digits").max(200,"Max 200 digits"),secondPassword:j().required("Password is required").oneOf([ne("firstPassword"),null],"Passwords must match").min(5,"Muin 5 digits").max(200,"Max 5 digits"),accept:le().oneOf([!0],"Field must be checked")});const Ne=We;function es(){const[W,M]=t.useState(!1),[m,N]=t.useState({showPassword:!1}),[h,V]=t.useState({showPassword:!1}),[$,_]=t.useState(!1),[g,S]=t.useState(!1),[y,H]=t.useState("paper"),{t:o}=ce(),J=de(),n=ue(),z=l(me)??!1,v=l(he)??!1,K=l(ge)??!1,Q=l(xe)??{},{oneSignalId:x}=l(pe);t.useEffect(()=>{M(!0)},[]);const a=fe({initialValues:Ne,validationSchema:Me,onSubmit:s=>{n(je({email:s.email,password:s.firstPassword,oneSignalId:x}))}}),X=()=>{N({showPassword:!m.showPassword})},Y=()=>{V({showPassword:!h.showPassword})},k=s=>{s.preventDefault()};t.useEffect(()=>{v&&_(!0)},[v]);const O=()=>{_(!1),n(Ue({})),a.resetForm(),J(w.LOGIN)},Z=s=>{S(!0),H(s),n(Be({}))},p=s=>{S(!1),s||a.setFieldValue("accept",!1)},ee=t.useRef(null);t.useEffect(()=>{if(g){const{current:s}=ee;s!==null&&s.focus()}},[g]);const se=()=>e.jsx(c,{children:e.jsxs(B,{open:g,onClose:p,scroll:y,"aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description",children:[e.jsx(E,{id:"scroll-dialog-title",children:o("signup.title_dialog_cgu")}),e.jsxs(G,{dividers:y==="paper",children:[K?e.jsx(c,{sx:{pt:5,textAlign:"center"},children:e.jsx(Oe,{color:"inherit"})}):null,e.jsx("div",{dangerouslySetInnerHTML:{__html:Q.contentFr||""}})]}),e.jsxs(q,{children:[e.jsx(b,{color:"neutral",onClick:()=>p(!1),children:o("common.label_cancel")}),e.jsx(b,{color:"secondary",onClick:()=>p(!0),children:o("signup.label_accept_cgu")})]})]})}),ae=()=>e.jsxs(B,{open:$,TransitionComponent:Re,onClose:O,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(E,{id:"alert-dialog-title",children:o("signup.title-dialog-register")}),e.jsx(G,{children:e.jsx(De,{id:"alert-dialog-description",children:o("signup.inbox-dialog-register")})}),e.jsx(q,{children:e.jsx(b,{onClick:O,autoFocus:!0,color:"success",children:o("signup.label-activation-dialog-register")})})]}),oe=we.useCallback(()=>{FB.login(s=>{s.status==="connected"&&FB.api("/me",{fields:"id,name,email,picture"},r=>{const f={accessToken:s.authResponse.accessToken,data_access_expiration_time:s.authResponse.data_access_expiration_time,graphDomain:s.authResponse.graphDomain,signedRequest:s.authResponse.signedRequest,email:r.email,id:r.id,name:r.name,picture:r.picture,userID:s.authResponse.userID,sourceConnectedDevice:R.FACEBOOK,idOneSignal:x};n(be({...f}))})},{scope:"public_profile, email"})},[]),ie=s=>{if(s!=null&&s.credential){const r=JSON.parse(Fe(s.credential)),f={Ba:"",tokenId:s.credential,googleId:s.clientId,profileObj:{email:r.email,familyName:r.family_name,givenName:r.given_name,imageUrl:r.picture,name:r.name},idOneSignal:x,sourceConnectedDevice:R.GOOGLE_PLUS};n(Ie({...f}))}},te=s=>{a.handleChange(s),s.target.checked&&Z("paper")};return e.jsx(Ce,{direction:"up",in:W,mountOnEnter:!0,unmountOnExit:!0,children:e.jsxs(qe,{maxWidth:"xl",children:[e.jsxs(i,{container:!0,style:{paddingTop:10},children:[e.jsx(i,{item:!0,sm:3}),e.jsx(i,{item:!0,xs:12,sm:6,children:e.jsxs(Ge,{"aria-label":"breadcrumb",children:[e.jsx(D,{color:"inherit",to:w.HOME,children:"SRF"}),e.jsx(F,{color:"text.primary",children:o("signup.title-page-register")})]})})]}),e.jsxs(i,{container:!0,sx:{pt:5,pb:5},children:[e.jsx(i,{item:!0,xs:3}),e.jsx(i,{item:!0,xs:12,sm:8,md:6,component:Pe,elevation:6,square:!0,children:e.jsxs(c,{sx:{my:8,mx:4,display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx(_e,{sx:{m:1,bgcolor:"secondary.main"},children:e.jsx(Ee,{})}),e.jsx(F,{component:"h1",variant:"h5",children:o("signup.title-page-register")}),e.jsx(c,{sx:{mt:3},children:e.jsxs("form",{onSubmit:a.handleSubmit,children:[e.jsxs(i,{container:!0,spacing:2,children:[e.jsx(i,{item:!0,xs:12,children:e.jsxs(d,{fullWidth:!0,error:a.touched.email&&!!a.errors.email,children:[e.jsx(C,{htmlFor:"outlined-adornment-title",children:o("common.label_email")}),e.jsx(P,{id:"email",name:"email",color:"secondary",type:"email",label:o("common.label_email"),value:a.values.email,onChange:a.handleChange}),a.touched.email&&a.errors.email?e.jsx(u,{id:"component-helper-text",children:o("signup.label_email_required")}):null]})}),e.jsx(i,{item:!0,xs:12,md:6,children:e.jsxs(d,{fullWidth:!0,error:a.touched.firstPassword&&!!a.errors.firstPassword,children:[e.jsx(C,{htmlFor:"outlined-adornment-title",children:o("common.label_new_password")}),e.jsx(P,{id:"firstPassword",name:"firstPassword",color:"secondary",type:m.showPassword?"text":"password",label:o("common.label_new_password"),value:a.values.firstPassword,onChange:a.handleChange,endAdornment:e.jsx(T,{position:"end",children:e.jsx(I,{"aria-label":"toggle password visibility",onClick:X,onMouseDown:k,edge:"end",children:m.showPassword?e.jsx(L,{}):e.jsx(A,{})})})}),a.touched.firstPassword&&a.errors.firstPassword?e.jsx(u,{id:"component-helper-text",children:o("signup.label_new_password")}):null]})}),e.jsx(i,{item:!0,xs:12,md:6,children:e.jsxs(d,{fullWidth:!0,error:a.touched.secondPassword&&!!a.errors.secondPassword,children:[e.jsx(C,{htmlFor:"outlined-adornment-title",children:o("common.label_confirm_password")}),e.jsx(P,{id:"secondPassword",name:"secondPassword",color:"secondary",type:h.showPassword?"text":"password",label:o("common.label_confirm_password"),value:a.values.secondPassword,onChange:a.handleChange,endAdornment:e.jsx(T,{position:"end",children:e.jsx(I,{"aria-label":"toggle password visibility",onClick:Y,onMouseDown:k,edge:"end",children:h.showPassword?e.jsx(L,{}):e.jsx(A,{})})})}),a.touched.secondPassword&&a.errors.secondPassword?e.jsx(u,{id:"component-helper-text",children:o("signup.label_second_password")}):null]})}),e.jsx(i,{item:!0,xs:12,children:e.jsxs(d,{fullWidth:!0,error:!!a.errors.accept,children:[e.jsx(Se,{control:e.jsx(Ae,{id:"accept",name:"accept",color:"secondary",checked:a.values.accept,onChange:te}),label:e.jsx(t.Fragment,{children:o("signup.accept-cgu")})}),a.touched.accept&&a.errors.accept?e.jsx(u,{id:"component-helper-text",children:o("signup.label_required_accept_cgu")}):null]})})]}),e.jsx(ye,{loading:z,fullWidth:!0,variant:"contained",color:"secondary",type:"submit","data-testid":"submit",sx:{mt:3,mb:2},children:o("common.label_register")}),e.jsx(i,{container:!0,justifyContent:"flex-end",children:e.jsx(i,{item:!0,children:e.jsx(D,{to:w.LOGIN,children:o("signup.label-already-have-account")})})}),e.jsxs(ve,{spacing:2,direction:"row",sx:{justifyContent:"center",my:4},children:[e.jsx(U,{color:"primary","aria-label":"add",onClick:oe,children:e.jsx(Te,{})}),e.jsxs(U,{color:"secondary","aria-label":"google",sx:{m:1,backgroundColor:"#E93F2E"},children:[e.jsx(ke,{isOneTap:!1,handleCredentialResponse:ie}),e.jsx(Le,{})]})]})]})})]})}),e.jsx(i,{item:!0,xs:4})]}),ae(),se()]})})}export{es as default};
