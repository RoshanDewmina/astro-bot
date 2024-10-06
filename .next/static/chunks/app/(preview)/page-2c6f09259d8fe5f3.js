(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[481],{1017:function(e,t,r){Promise.resolve().then(r.bind(r,4983))},4983:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return b}});var i=r(7437),a=r(2265),l=r(1116),n=r(4839),s=r(6164);function o(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.m6)((0,n.W)(t))}(0,l.kP)("abcdefghijklmnopqrstuvwxyz0123456789");let d=a.forwardRef((e,t)=>{let{className:r,type:a,...l}=e;return(0,i.jsx)("input",{type:a,className:o("flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...l})});d.displayName="Input";var c=r(3201),u=r(5729),x=r(4446),m=r(8904),h=r(2974);let f=(0,r(2218).j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),p=a.forwardRef((e,t)=>{let{className:r,variant:a,size:l,asChild:n=!1,...s}=e,d=n?h.g7:"button";return(0,i.jsx)(d,{className:o(f({variant:a,size:l,className:r})),ref:t,...s})});p.displayName="Button";var g=r(7776),v=()=>{let[e,t]=(0,a.useState)(null),r=async()=>{if(!e){g.Am.error("Please select a file to upload");return}let r=new FormData;r.append("file",e);try{let e=await fetch("/api/upload",{method:"POST",body:r});if(!e.ok)throw Error("Upload failed");let i=await e.json();g.Am.success(i.message),t(null)}catch(e){g.Am.error("Error uploading file"),console.error(e)}};return(0,i.jsxs)("div",{className:"flex flex-col items-center space-y-4",children:[(0,i.jsx)(d,{type:"file",onChange:e=>{e.target.files&&t(e.target.files[0])},accept:".txt,.md,.json"}),(0,i.jsx)(p,{onClick:r,disabled:!e,children:"Upload File"})]})},j=()=>(0,i.jsx)(u.E.div,{className:"w-full max-w-[600px] my-4",initial:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:5},children:(0,i.jsx)("div",{className:"border rounded-lg p-6 flex flex-col gap-4 text-neutral-500 text-sm dark:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900",children:(0,i.jsx)(v,{})})});let y=()=>(0,i.jsxs)("svg",{height:"16",strokeLinejoin:"round",viewBox:"0 0 16 16",width:"16",style:{color:"currentcolor"},children:[(0,i.jsxs)("g",{clipPath:"url(#clip0_2393_1490)",children:[(0,i.jsx)("path",{d:"M8 0V4",stroke:"currentColor",strokeWidth:"1.5"}),(0,i.jsx)("path",{opacity:"0.5",d:"M8 16V12",stroke:"currentColor",strokeWidth:"1.5"}),(0,i.jsx)("path",{opacity:"0.9",d:"M3.29773 1.52783L5.64887 4.7639",stroke:"currentColor",strokeWidth:"1.5"}),(0,i.jsx)("path",{opacity:"0.1",d:"M12.7023 1.52783L10.3511 4.7639",stroke:"currentColor",strokeWidth:"1.5"}),(0,i.jsx)("path",{opacity:"0.4",d:"M12.7023 14.472L10.3511 11.236",stroke:"currentColor",strokeWidth:"1.5"}),(0,i.jsx)("path",{opacity:"0.6",d:"M3.29773 14.472L5.64887 11.236",stroke:"currentColor",strokeWidth:"1.5"}),(0,i.jsx)("path",{opacity:"0.2",d:"M15.6085 5.52783L11.8043 6.7639",stroke:"currentColor",strokeWidth:"1.5"}),(0,i.jsx)("path",{opacity:"0.7",d:"M0.391602 10.472L4.19583 9.23598",stroke:"currentColor",strokeWidth:"1.5"}),(0,i.jsx)("path",{opacity:"0.3",d:"M15.6085 10.4722L11.8043 9.2361",stroke:"currentColor",strokeWidth:"1.5"}),(0,i.jsx)("path",{opacity:"0.8",d:"M0.391602 5.52783L4.19583 6.7639",stroke:"currentColor",strokeWidth:"1.5"})]}),(0,i.jsx)("defs",{children:(0,i.jsx)("clipPath",{id:"clip0_2393_1490",children:(0,i.jsx)("rect",{width:"16",height:"16",fill:"white"})})})]});function b(){let[e,t]=(0,a.useState)(),{messages:r,input:l,handleInputChange:n,handleSubmit:s,isLoading:m}=(0,c.RJ)({maxToolRoundtrips:4,onToolCall(e){let{toolCall:r}=e;t(r.toolName)},onError:e=>{g.Am.error("You've been rate limited, please try again later!")}}),[h,f]=(0,a.useState)(!1);(0,a.useEffect)(()=>{r.length>0&&f(!0)},[r]);let p=(0,a.useMemo)(()=>{var t;let i=null==r?void 0:null===(t=r.slice(-1)[0])||void 0===t?void 0:t.toolInvocations;return i&&e===i[0].toolName?i[0].toolName:void 0},[e,r]),v=(0,a.useMemo)(()=>!!m&&void 0===p&&"user"===r.slice(-1)[0].role,[m,p,r]),y=r.filter(e=>"user"===e.role).slice(-1)[0],b=r.filter(e=>"user"!==e.role).slice(-1)[0];return(0,i.jsx)("div",{className:"flex justify-center items-start sm:pt-16 min-h-screen w-full dark:bg-neutral-900 px-4 md:px-0 py-4",children:(0,i.jsxs)("div",{className:"flex flex-col items-center w-full max-w-[500px]",children:[(0,i.jsx)(j,{}),(0,i.jsx)(u.E.div,{animate:{minHeight:h?200:0,padding:h?12:0},transition:{type:"spring",bounce:.5},className:o("rounded-lg w-full ",h?"bg-neutral-200 dark:bg-neutral-800":"bg-transparent"),children:(0,i.jsxs)("div",{className:"flex flex-col w-full justify-between gap-2",children:[(0,i.jsx)("form",{onSubmit:s,className:"flex space-x-2",children:(0,i.jsx)(d,{className:"bg-neutral-100 text-base w-full text-neutral-700 dark:bg-neutral-700 dark:placeholder:text-neutral-400 dark:text-neutral-300",minLength:3,required:!0,value:l,placeholder:"Ask me anything...",onChange:n})}),(0,i.jsx)(u.E.div,{transition:{type:"spring"},className:"min-h-fit flex flex-col gap-2",children:(0,i.jsx)(x.M,{children:v||p?(0,i.jsxs)("div",{className:"px-2 min-h-12",children:[(0,i.jsx)("div",{className:"dark:text-neutral-400 text-neutral-500 text-sm w-fit mb-1",children:y.content}),(0,i.jsx)(w,{tool:p})]}):b?(0,i.jsxs)("div",{className:"px-2 min-h-12",children:[(0,i.jsx)("div",{className:"dark:text-neutral-400 text-neutral-500 text-sm w-fit mb-1",children:y.content}),(0,i.jsx)(k,{message:b})]}):null})})]})})]})})}let k=e=>{let{message:t}=e;return void 0===t?"HELLO":(0,i.jsx)(x.M,{mode:"wait",children:(0,i.jsx)(u.E.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"whitespace-pre-wrap font-mono anti text-sm text-neutral-800 dark:text-neutral-200 overflow-hidden",id:"markdown",children:(0,i.jsx)(N,{className:"max-h-72 overflow-y-scroll no-scrollbar-gutter",children:t.content})},t.id)})},w=e=>{let{tool:t}=e;return(0,i.jsx)(x.M,{mode:"wait",children:(0,i.jsx)(u.E.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{type:"spring"},className:"overflow-hidden flex justify-start items-center",children:(0,i.jsxs)("div",{className:"flex flex-row gap-2 items-center",children:[(0,i.jsx)("div",{className:"animate-spin dark:text-neutral-400 text-neutral-500",children:(0,i.jsx)(y,{})}),(0,i.jsxs)("div",{className:"text-neutral-500 dark:text-neutral-400 text-sm",children:["getInformation"===t?"Getting information":"addResource"===t?"Adding information":"Thinking","..."]})]})})})},N=a.memo(m.U,(e,t)=>e.children===t.children&&e.className===t.className)}},function(e){e.O(0,[874,971,23,744],function(){return e(e.s=1017)}),_N_E=e.O()}]);