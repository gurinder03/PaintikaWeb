"use strict";(self.webpackChunkpaindIkaWeb=self.webpackChunkpaindIkaWeb||[]).push([[592],{4754:(h,d,o)=>{o.d(d,{o:()=>m});var a=o(5861),c=o(4650),l=o(4627);let m=(()=>{var u;class _{constructor(s){this.request=s}getAllUser(s){return new Promise((t,r)=>{this.request.send("userList",s,e=>{e?t(e):r(e.statusText)},null,!0)})}getAdminCateList(s){return new Promise((t,r)=>{this.request.send("adminCategoryList",s,e=>{e?t(e):r(e.statusText)},null,!0)})}addCategoryData(s){return new Promise((t,r)=>{this.request.send("addCategroy",s,e=>{e?t(e):r(e.statusText)},null,!0)})}singleCategory(s){var t=this;return(0,a.Z)(function*(){return new Promise((r,n)=>{t.request.send("singleViewCategory",{id:s},i=>{i?r(i):n(i.statusText)},null,!0)})})()}removeCategory(s){var t=this;return(0,a.Z)(function*(){return new Promise((r,n)=>{t.request.send("removeCategory",s,i=>{i?r(i):n(i.statusText)},null,!0)})})()}}return(u=_).\u0275fac=function(s){return new(s||u)(c.LFG(l.s))},u.\u0275prov=c.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),_})()}}]);