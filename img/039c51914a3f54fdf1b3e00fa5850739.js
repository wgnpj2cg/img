(this.webpackJsonpfront1=this.webpackJsonpfront1||[]).push([[0],{149:function(e,t){},176:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(21),i=r.n(a),c=r(26),s=r(100),o={back:{url:""}},p=Object(s.a)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,t=arguments.length>1?arguments[1]:void 0;if("updateFromBack"===t.type){var r=JSON.parse(JSON.stringify(e));return r.data=t.value,r}if("delete_detail"===t.type){var n=JSON.parse(JSON.stringify(e));return delete n.data[parseInt(t.l1)].SecondaryDirectoryer[parseInt(t.l2)],n}if("add_zhang_hu"===t.type){var a=JSON.parse(JSON.stringify(e));return a.data[parseInt(t.value)].SecondaryDirectoryer.push({Name:"",Number:""}),a}if("change_zhang_hu_ming"===t.type){var i=JSON.parse(JSON.stringify(e));return i.data[parseInt(t.index)].Name=t.value,i}if("change_ming_xi_name"===t.type){var c=JSON.parse(JSON.stringify(e));return c.data[parseInt(t.l1)].SecondaryDirectoryer[parseInt(t.l2)].Name=t.value,c}if("change_ming_xi_number"===t.type){var s=JSON.parse(JSON.stringify(e));return s.data[parseInt(t.l1)].SecondaryDirectoryer[parseInt(t.l2)].Number=t.value,s}if("add_lv1_zhang_hu"===t.type){var p=JSON.parse(JSON.stringify(e));return p.data.push({Name:"",SecondaryDirectoryer:[{}]}),p}if("delete_zhang_hu"===t.type){var u=JSON.parse(JSON.stringify(e));return delete u.data[parseInt(t.index)],u}if("mark_cheched"===t.type){var l=JSON.parse(JSON.stringify(e));return l.data[parseInt(t.l1)].SecondaryDirectoryer[parseInt(t.l2)].CanUse=1,l}if("del_mark_cheched"===t.type){var d=JSON.parse(JSON.stringify(e));return d.data[parseInt(t.l1)].SecondaryDirectoryer[parseInt(t.l2)].CanUse=0,d}return e}),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),u=r(68),l=r(28),d=r(29),h=r(59),j=r(32),b=r(31),O=r(81),y=r.n(O),f=r(101),g=r.n(f),v=r(179),x=r(181),m=r(185),_=r(186),N=r(183),k=r(6);var C=function(e){Object(j.a)(r,e);var t=Object(b.a)(r);function r(){return Object(l.a)(this,r),t.apply(this,arguments)}return Object(d.a)(r,[{key:"render",value:function(){var e=this;return 1===this.props.marked?Object(k.jsxs)("div",{children:[Object(k.jsx)(N.a,{defaultChecked:!0,onChange:function(t){return e.MarkCheched(e.props.l1,e.props.l2,t)}}),","]}):Object(k.jsxs)("div",{children:[Object(k.jsx)(N.a,{onChange:function(t){return e.MarkCheched(e.props.l1,e.props.l2,t)}}),","]})}},{key:"MarkCheched",value:function(e,t,r){!0===r&&this.props.addMarkCheched(e,t),!1===r&&this.props.delMarkCheched(e,t)}}]),r}(n.Component),S=Object(c.b)((function(e){return{}}),(function(e){return{addMarkCheched:function(t,r){e({type:"mark_cheched",l1:t,l2:r})},delMarkCheched:function(t,r){e({type:"del_mark_cheched",l1:t,l2:r})}}}))(C);var D=function(e){Object(j.a)(r,e);var t=Object(b.a)(r);function r(){return Object(l.a)(this,r),t.apply(this,arguments)}return Object(d.a)(r,[{key:"render",value:function(){var e=this;return null==this.props.Name?null:Object(k.jsx)("div",{children:Object(k.jsxs)(v.a,{actions:[Object(k.jsx)(m.a,{onClick:function(){e.props.deleteDetail(e.props.l1,e.props.l2)}}),Object(k.jsx)(S,{l1:this.props.l1,l2:this.props.l2,marked:this.props.CanUse}),Object(k.jsx)(_.a,{})],children:[Object(k.jsx)(x.a,{addonBefore:"\u660e\u7ec6",type:"text",value:this.props.Name,onChange:function(t){return e.props.changeMingxiName(e.props.l1,e.props.l2,t.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)(x.a,{style:{marginTop:"5px"},addonBefore:"\u91d1\u989d",type:"text",value:this.props.Number,onChange:function(t){return e.props.changeMingxiNumber(e.props.l1,e.props.l2,t.target.value)}})]})})}}]),r}(n.Component),J=Object(c.b)((function(e){return{}}),(function(e){return{deleteDetail:function(t,r){e({type:"delete_detail",l1:t,l2:r})},changeMingxiName:function(t,r,n){e({type:"change_ming_xi_name",l1:t,l2:r,value:n})},changeMingxiNumber:function(t,r,n){e({type:"change_ming_xi_number",l1:t,l2:r,value:n})}}}))(D),I=r(52),M=r(184),T=r(35),w=r(112);var E=function(e){Object(j.a)(r,e);var t=Object(b.a)(r);function r(){return Object(l.a)(this,r),t.apply(this,arguments)}return Object(d.a)(r,[{key:"render",value:function(){var e=this;return void 0===this.props.SecondaryDirectoryer?null:Object(k.jsxs)("div",{style:{marginTop:"5px",backgroundColor:"white"},children:[Object(k.jsx)(I.a,{style:{margin:"5px"},children:Object(k.jsxs)(M.b,{children:[Object(k.jsx)(T.a,{children:Object(k.jsx)(x.a,{style:{marginTop:"3px"},addonBefore:"\u8d26\u6237\u540d",type:"text",value:this.props.Name,onChange:function(t){return e.props.changeZhanghuming(t.target.value,e.props.k)}})}),Object(k.jsx)(T.a,{children:Object(k.jsx)(w.a,{style:{marginTop:"3px"},onClick:function(){return e.props.addZhanghu(e.props.k)},children:"\u6dfb\u52a0\u660e\u7ec6"})}),Object(k.jsx)(T.a,{children:Object(k.jsx)(w.a,{danger:!0,style:{marginTop:"3px"},onClick:function(){return e.props.deleteZhanghu(e.props.k)},children:"\u5220\u9664\u8d26\u6237"})})]})}),this.props.SecondaryDirectoryer.map((function(t,r){return Object(k.jsx)(J,Object(u.a)({l1:e.props.k,l2:r},t),r)})),Object(k.jsx)("br",{})]})}}]),r}(n.Component),U=Object(c.b)((function(e){return{}}),(function(e){return{addZhanghu:function(t){e({type:"add_zhang_hu",value:t})},changeZhanghuming:function(t,r){e({type:"change_zhang_hu_ming",value:t,index:r})},deleteZhanghu:function(t){e({type:"delete_zhang_hu",index:t})}}}))(E),z=r(182),B=r(111),Z=r(180);var F=function(e){Object(j.a)(r,e);var t=Object(b.a)(r);function r(){return Object(l.a)(this,r),t.apply(this,arguments)}return Object(d.a)(r,[{key:"render",value:function(){return Object(k.jsx)("div",{style:{backgroundColor:"white",margin:"5px"},children:Object(k.jsx)(Z.a,{title:"Total Balance (CNY)",value:this.compeleteTotalMoney(),precision:2,style:{margin:"8px"}})})}},{key:"compeleteTotalMoney",value:function(){if(void 0===this.props.data)return console.log("this.props.data === undefined"),null;for(var e=0,t=0;t<this.props.data.length;t++)if(null!=this.props.data[t])for(var r=0;r<this.props.data[t].SecondaryDirectoryer.length;r++)if(null!=this.props.data[t].SecondaryDirectoryer[r]){var n=parseFloat(this.props.data[t].SecondaryDirectoryer[r].Number);isNaN(n)||(e+=n)}return e}}]),r}(n.Component),X=Object(c.b)((function(e){return{data:e.data}}),(function(e){return{}}))(F);var L=function(e){Object(j.a)(r,e);var t=Object(b.a)(r);function r(){return Object(l.a)(this,r),t.apply(this,arguments)}return Object(d.a)(r,[{key:"render",value:function(){return Object(k.jsx)("div",{style:{backgroundColor:"white",margin:"5px"},children:Object(k.jsx)(Z.a,{title:"Can Use Balance (CNY)",value:this.compeleteCanUseMoney(),precision:2,style:{margin:"8px"}})})}},{key:"compeleteCanUseMoney",value:function(){if(void 0===this.props.data)return null;for(var e=0,t=0;t<this.props.data.length;t++)if(null!=this.props.data[t])for(var r=0;r<this.props.data[t].SecondaryDirectoryer.length;r++)if(null!=this.props.data[t].SecondaryDirectoryer[r]&&1===this.props.data[t].SecondaryDirectoryer[r].CanUse){var n=parseFloat(this.props.data[t].SecondaryDirectoryer[r].Number);if(isNaN(n))continue;e+=n}return e}}]),r}(n.Component),R=Object(c.b)((function(e){return{data:e.data}}),(function(e){return{}}))(L),V=z.a.Header,Y=z.a.Footer,H=z.a.Content;var q=function(e){Object(j.a)(r,e);var t=Object(b.a)(r);function r(e){var n;return Object(l.a)(this,r),(n=t.call(this,e)).saveChange=n.saveChange.bind(Object(h.a)(n)),n}return Object(d.a)(r,[{key:"render",value:function(){return void 0===this.props.data||null===this.props.data?null:Object(k.jsx)("div",{children:Object(k.jsxs)(z.a,{children:[Object(k.jsx)(V,{style:{backgroundColor:"white"},children:Object(k.jsx)(I.a,{justify:"center",children:Object(k.jsx)(T.a,{children:"\u603b\u76ee\u5f55"})})}),Object(k.jsx)(H,{children:Object(k.jsxs)(I.a,{children:[Object(k.jsx)(T.a,{span:4}),Object(k.jsxs)(T.a,{children:[this.props.data.map((function(e,t){return Object(k.jsx)(U,Object(u.a)({k:t},e),t)})),Object(k.jsx)(w.a,{onClick:this.props.addZhanghu,children:"\u6dfb\u52a0\u8d26\u6237"}),Object(k.jsx)(w.a,{type:"primary",onClick:this.saveChange,children:"\u4fdd\u5b58\u66f4\u65b0"})]}),Object(k.jsxs)(T.a,{children:[Object(k.jsx)(X,{}),Object(k.jsx)(R,{})]}),Object(k.jsx)(T.a,{span:4})]})}),Object(k.jsx)(Y,{})]})})}},{key:"componentDidMount",value:function(){var e=this;y.a.get(this.props.url+"/details").then((function(t){e.props.test(t.data)}))}},{key:"saveChange",value:function(){var e=this.props.data,t=this.props.url+"/updatechange";y.a.post(t,g.a.stringify({msg:JSON.stringify(e)})).then((function(e){B.b.success("\u4fdd\u5b58\u6210\u529f...")}))}}]),r}(n.Component),A=Object(c.b)((function(e){return{data:e.data,url:e.back.url}}),(function(e){return{test:function(t){e({type:"updateFromBack",value:t})},addZhanghu:function(){e({type:"add_lv1_zhang_hu"})}}}))(q);r(175);i.a.render(Object(k.jsx)(c.a,{store:p,children:Object(k.jsx)("div",{children:Object(k.jsx)(A,{})})}),document.getElementById("root"))}},[[176,1,2]]]);
//# sourceMappingURL=main.8a5746da.chunk.js.map