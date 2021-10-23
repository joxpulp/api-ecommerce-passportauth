var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,o=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,s=(e,t)=>{for(var a in t||(t={}))l.call(t,a)&&o(e,a,t[a]);if(r)for(var a of r(t))n.call(t,a)&&o(e,a,t[a]);return e},c=(e,r)=>t(e,a(r)),m=(e,t)=>{var a={};for(var o in e)l.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&r)for(var o of r(e))t.indexOf(o)<0&&n.call(e,o)&&(a[o]=e[o]);return a};import{a as i,c as u,b as d,R as p,d as g,e as E,r as f,u as h,f as b,g as y,A as x,m as v,l as N,i as w,h as C,j as S,S as k,k as j,n as M,P,B as O}from"./vendor.b9f731e7.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const F="http://localhost:8080",q=i.create({withCredentials:!0}),A=u("auth/login",(async(e,{rejectWithValue:t})=>{try{const{data:t}=await q.post(`${F}/api/auth/login`,e);return t}catch({response:{data:a}}){return t(a)}})),L=u("auth/logout",(async()=>{await q.get(`${F}/api/auth/logout`)})),I=u("auth/signup",(async(e,{rejectWithValue:t})=>{try{const{data:t}=await q.post(`${F}/api/auth/signup`,e);return t}catch({response:{data:a}}){return t(a)}})),R=u("auth/isLogged",(async(e,{rejectWithValue:t})=>{try{const{data:e}=await q.get(`${F}/api/auth/islogged`);return e}catch({response:{data:a}}){return t(a)}}));var z=d({name:"auth",initialState:{username:JSON.parse(localStorage.getItem("username"))||{}},reducers:{},extraReducers:e=>{e.addCase(R.fulfilled,((e,t)=>c(s({},e),{logged:t.payload.logged}))).addCase(R.rejected,((e,t)=>({logged:t.payload.logged}))).addCase(A.fulfilled,((e,t)=>({username:t.payload.user,logged:t.payload.logged}))).addCase(L.fulfilled,((e,t)=>({})))}}).reducer;const D=e=>{var t=e,{isAuth:a,component:r}=t,l=m(t,["isAuth","component"]);return p.createElement(g,s({},l),a?p.createElement(r,null):p.createElement(E,{to:"/login"}))},B=e=>{var t=e,{isAuth:a,component:r}=t,l=m(t,["isAuth","component"]);return p.createElement(g,s({},l),a?p.createElement(E,{to:"/"}):p.createElement(r,null))},$=(e={})=>{const[t,a]=f.exports.useState(e);return[t,({target:e})=>{a(c(s({},t),{[e.name]:e.value}))}]},U=d({name:"ui",initialState:{loading:!1,logoutMessage:!1,msgError:null,msgSuccess:null},reducers:{setLogoutMessage:(e,t)=>c(s({},e),{logoutMessage:!0}),removeLogoutMessage:(e,t)=>c(s({},e),{logoutMessage:!1}),removeError:(e,t)=>c(s({},e),{msgError:null}),removeSuccess:(e,t)=>c(s({},e),{msgSuccess:null})},extraReducers:e=>{e.addCase(A.pending,((e,t)=>c(s({},e),{loading:!0}))).addCase(A.fulfilled,((e,t)=>c(s({},e),{loading:!1}))).addCase(A.rejected,((e,t)=>c(s({},e),{msgError:t.payload.error,loading:!1}))).addCase(I.fulfilled,((e,t)=>c(s({},e),{msgSuccess:t.payload.msg}))).addCase(I.rejected,((e,t)=>c(s({},e),{msgError:t.payload.error})))}}),{setLogoutMessage:V,removeLogoutMessage:Y,removeError:H,removeSuccess:T}=U.actions;var W=U.reducer;function G(){const[{username:e,password:t},a]=$({username:"",password:""}),r=h(),l=b(),{loading:n,msgError:o,logoutMessage:s}=y((e=>e.ui));return f.exports.useEffect((()=>{setTimeout((()=>{l(Y())}),2e3)}),[l]),f.exports.useEffect((()=>{setTimeout((()=>{l(H())}),3e3)}),[l,o]),s?p.createElement(x,{exitBeforeEnter:!0},p.createElement(v.div,{initial:{opacity:0},animate:{opacity:1},className:"container alert alert-info text-center",role:"alert"},"Hasta luego")):p.createElement(v.div,{initial:{opacity:0,x:-100},animate:{opacity:1,x:0},exit:{opacity:0,x:100}},p.createElement(x,null,o&&p.createElement(v.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"alert alert-danger text-center",role:"alert"},o)),p.createElement("form",{id:"form",onSubmit:a=>{a.preventDefault(),l(A({username:e,password:t})),localStorage.setItem("username",JSON.stringify(e))}},p.createElement("h2",{className:"text-center mb-4 text-light"},"Login de usuario"),p.createElement("div",{className:"form-floating mb-3"},p.createElement("input",{type:"text",className:"form-control",name:"username",placeholder:"username",value:e,onChange:a,required:!0}),p.createElement("label",{htmlFor:"username"},"Username")),p.createElement("div",{className:"form-floating mb-3"},p.createElement("input",{type:"password",className:"form-control",name:"password",placeholder:"password",value:t,onChange:a,required:!0}),p.createElement("label",{htmlFor:"password"},"Contrasena")),p.createElement("button",{type:"submit",className:"btn btn-success me-3",disabled:n},n?p.createElement(N.GooSpinner,{size:25}):"Ingresar"),p.createElement("button",{type:"button",className:"btn btn-secondary",onClick:()=>{r.push("/signup"),l(H())},disabled:n},"Registrarse")))}const J=w("http://localhost:8080",{transports:["websocket"]});function K(){const[e,t]=f.exports.useState(""),[a,r]=f.exports.useState(""),[l,n]=f.exports.useState("");return p.createElement("form",{id:"form",onSubmit:o=>{o.preventDefault(),J.emit("addProduct",{title:e,price:a,thumbnail:l}),t(""),r(""),n("")}},p.createElement("h2",{className:"text-center mb-4 text-light"},"Ingrese producto"),p.createElement("div",{className:"form-floating mb-3"},p.createElement("input",{type:"text",className:"form-control",id:"title",name:"title",placeholder:"title",value:e,onChange:e=>t(e.target.value),required:!0}),p.createElement("label",{htmlFor:"title"},"Username")),p.createElement("div",{className:"form-floating mb-3"},p.createElement("input",{type:"number",min:"100",max:"5000",className:"form-control",id:"price",name:"price",placeholder:"price",value:a,onChange:e=>r(e.target.value),required:!0}),p.createElement("label",{htmlFor:"price"},"Precio")),p.createElement("div",{className:"form-floating mb-3"},p.createElement("input",{type:"text",className:"form-control",id:"thumbnail",name:"thumbnail",placeholder:"thumbnail",value:l,onChange:e=>n(e.target.value),required:!0}),p.createElement("label",{htmlFor:"thumbnail"},"URL de la imagen")),p.createElement("button",{className:"btn btn-success",type:"submit"},"Ingresar producto"))}const _=f.exports.createContext();function X({children:e}){const[t,a]=f.exports.useState([]),[r,l]=f.exports.useState([]);return f.exports.useEffect((()=>(J.on("products",(e=>{a(e)})),()=>{J.off("products")})),[t,a]),f.exports.useEffect((()=>(J.on("messages",(e=>{l(e)})),()=>{J.off("messages")})),[r,l]),p.createElement(_.Provider,{value:{products:t,setProducts:a,messages:r,setMessages:l}},e)}function Q(){const{products:e}=f.exports.useContext(_);return p.createElement("div",{className:"container"},0!==e.length?p.createElement(v.div,{initial:{opacity:0},animate:{opacity:1}},p.createElement("h2",{className:"text-center mb-4 text-light"},"Vista de productos"),p.createElement("table",{className:"table table-dark"},p.createElement("thead",null,p.createElement("tr",null,p.createElement("th",{scope:"col"},"Producto"),p.createElement("th",{scope:"col"},"Precio"),p.createElement("th",{scope:"col"},"Foto"))),e.map(((e,t)=>p.createElement(v.tbody,{initial:{opacity:0,x:"-100%"},animate:{opacity:1,x:0},key:t},p.createElement("tr",null,p.createElement("td",null,e.title),p.createElement("td",null,e.price),p.createElement("td",null,p.createElement("img",{style:{width:"50px",height:"auto"},src:e.thumbnail,alt:"products"})))))))):p.createElement("div",{className:"alert alert-info text-center",role:"alert"},"No hay productos disponibles, agrega uno en el formulario de arriba"))}function Z(){const[e,t]=f.exports.useState(""),[a,r]=f.exports.useState(""),{messages:l}=f.exports.useContext(_),n=f.exports.useRef(null),o=t=>{t.preventDefault(),J.emit("sendMessage",{email:e,message:a,date:C().format("DD/MM/YYYY"),time:C().format("HH:mm:ss")}),r(""),n.current.scrollTop=n.current.scrollHeight};return p.createElement("div",{className:"container"},p.createElement("h2",{className:"text-center mb-4 text-light"},"Centro de Mensajes"),p.createElement("form",{onSubmit:o},p.createElement("div",{className:"container d-flex justify-content-center"},p.createElement("div",{className:"form-floating"},p.createElement("input",{type:"email",className:"form-control",id:"email",name:"email",placeholder:"email",value:e,onChange:e=>t(e.target.value),required:!0}),p.createElement("label",{htmlFor:"email"},"Correo Electronico"))),p.createElement("hr",{style:{backgroundColor:"white"}}),p.createElement("div",{style:{width:"80%",height:"400px",borderRadius:"5px",overflowY:"scroll",overflowX:"hidden"},className:"container bg-light p-3",ref:n},l.map(((e,t)=>p.createElement(v.div,{initial:{opacity:0,x:"-100%"},animate:{opacity:1,x:0},className:"container d-flex flex-column flex-lg-row",key:t},p.createElement("p",{className:"me-2 text-primary"},e.email),p.createElement("p",{className:"me-2 text-danger"},"[",e.date," ",e.time,"]:"),p.createElement("p",{className:"me-2 text-success"},e.message),p.createElement("hr",{style:{backgroundColor:"black"}}))))),p.createElement("div",{style:{width:"80%"},className:"form-floating mx-auto my-2 d-flex"},p.createElement("input",{type:"text",className:"form-control",id:"message",name:"message",placeholder:"message",value:a,disabled:!/^[a-z0-9._-]+@{1}[\\a-z0-9.]+\.[a-z]{2,3}$/.test(e),onChange:e=>r(e.target.value),onKeyUp:e=>"Enter"===e.key&&o(),required:!0}),p.createElement("label",{htmlFor:"message"},"Mensaje"),p.createElement("button",{className:"btn btn-success ms-2",disabled:!/^[a-z0-9._-]+@{1}[\\a-z0-9.]+\.[a-z]{2,3}$/.test(e),type:"submit"},"Enviar"))))}const ee=({socket:e})=>{const t=b(),{username:a}=y((e=>e.auth));return p.createElement(p.Fragment,null,p.createElement("div",{className:"container alert alert-success text-center",role:"alert"},"Bienvenido ",a,p.createElement("button",{className:"btn btn-warning ms-2",onClick:()=>{t(V()),t(L())}},"Salir")),p.createElement(K,null),p.createElement("hr",{style:{backgroundColor:"white",width:"80%"}}),p.createElement(Q,null),p.createElement("hr",{style:{backgroundColor:"white",width:"80%"}}),p.createElement(Z,null))},te=()=>{const[{username:e,password:t,name:a,lastname:r,email:l},n]=$({username:"",password:"",name:"",lastname:"",email:""}),o=b(),{loading:s,msgSuccess:c,msgError:m}=y((e=>e.ui)),i=h(),u=()=>{i.push("/login"),o(T()),o(H())};return f.exports.useEffect((()=>{setTimeout((()=>{o(H())}),3e3)}),[o,m]),p.createElement(v.form,{id:"form",onSubmit:n=>{n.preventDefault(),o(I({username:e,password:t,name:a,lastname:r,email:l})),o(H()),o(T())},initial:{opacity:0,x:100},animate:{opacity:1,x:0},exit:{opacity:0,x:-100}},p.createElement("h2",{className:"text-center mb-4 text-light"},"Registrate"),p.createElement(x,null,m&&p.createElement(v.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"container alert alert-danger text-center",role:"alert"},m),c&&p.createElement(v.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"container alert alert-success text-center",role:"alert"},c,p.createElement("button",{className:"btn btn-success ms-2",onClick:u},"Iniciar sesion"))),p.createElement("div",{className:"form-floating mb-3"},p.createElement("input",{type:"text",className:"form-control",name:"username",placeholder:"username",value:e,onChange:n,required:!0}),p.createElement("label",{htmlFor:"username"},"Username")),p.createElement("div",{className:"form-floating mb-3"},p.createElement("input",{type:"password",className:"form-control",name:"password",placeholder:"password",value:t,onChange:n,required:!0}),p.createElement("label",{htmlFor:"password"},"Contrasena")),p.createElement("div",{className:"form-floating mb-3"},p.createElement("input",{type:"text",className:"form-control",name:"name",placeholder:"name",value:a,onChange:n,required:!0}),p.createElement("label",{htmlFor:"name"},"Nombre")),p.createElement("div",{className:"form-floating mb-3"},p.createElement("input",{type:"text",className:"form-control",name:"lastname",placeholder:"lastname",value:r,onChange:n,required:!0}),p.createElement("label",{htmlFor:"lastname"},"Apellido")),p.createElement("div",{className:"form-floating mb-3"},p.createElement("input",{type:"text",className:"form-control",name:"email",placeholder:"email",value:l,onChange:n,required:!0}),p.createElement("label",{htmlFor:"email"},"Email")),p.createElement("button",{className:"btn btn-success me-2",type:"submit"},s?p.createElement(N.GooSpinner,{size:25}):"Registrarse"),p.createElement("button",{className:"btn btn-secondary",onClick:u,type:"button"},"Volver al login"))};function ae(){const e=b(),{logged:t}=y((e=>e.auth)),a=S();return f.exports.useEffect((()=>{e(R())}),[e]),p.createElement(v.div,{style:{height:"100%"},className:"container d-flex flex-column\n\t\t\tjustify-content-center align-items-center",initial:{opacity:0},animate:{opacity:1}},p.createElement(v.h1,{initial:{opacity:0,y:"-100%"},animate:{opacity:1,y:0,transition:{delay:.2}},className:"text-center my-4 text-light"},"Bienvenido a la API de Productos PIOLAS"),p.createElement("hr",{style:{backgroundColor:"white",width:"80%"}}),p.createElement(x,{exitBeforeEnter:!0,initial:!1},p.createElement(k,{location:a,key:a.pathname},p.createElement(B,{isAuth:t,path:"/login",component:G}),p.createElement(B,{isAuth:t,path:"/signup",component:te}),p.createElement(D,{exact:!0,isAuth:t,path:"/",component:ee}))))}const re=j({reducer:{auth:z,ui:W}});M.render(p.createElement(p.StrictMode,null,p.createElement(X,null,p.createElement(P,{store:re},p.createElement(O,null,p.createElement(ae,null))))),document.getElementById("root"));
