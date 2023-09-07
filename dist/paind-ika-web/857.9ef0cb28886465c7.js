"use strict";(self.webpackChunkpaindIkaWeb=self.webpackChunkpaindIkaWeb||[]).push([[857],{5963:(Y,T,d)=>{d.d(T,{H:()=>b});var F=d(9751),l=d(4986),x=d(3532);function b(y=0,E,D=l.P){let w=-1;return null!=E&&((0,x.K)(E)?D=E:w=E),new F.y(A=>{let O=function L(y){return y instanceof Date&&!isNaN(y)}(y)?+y-D.now():y;O<0&&(O=0);let I=0;return D.schedule(function(){A.closed||(A.next(I++),0<=w?this.schedule(void 0,w):A.complete())},O)})}},5017:(Y,T,d)=>{d.d(T,{A8:()=>O,Ov:()=>w,Z9:()=>b,eX:()=>D,k:()=>I,o2:()=>L,yy:()=>E});var F=d(4033),l=d(7579),x=d(4650);class L{}function b(m){return m&&"function"==typeof m.connect&&!(m instanceof F.c)}class E{applyChanges(o,a,h,v,f){o.forEachOperation((_,V,S)=>{let R,C;if(null==_.previousIndex){const z=h(_,V,S);R=a.createEmbeddedView(z.templateRef,z.context,z.index),C=1}else null==S?(a.remove(V),C=3):(R=a.get(V),a.move(R,S),C=2);f&&f({context:R?.context,operation:C,record:_})})}detach(){}}class D{constructor(){this.viewCacheSize=20,this._viewCache=[]}applyChanges(o,a,h,v,f){o.forEachOperation((_,V,S)=>{let R,C;null==_.previousIndex?(R=this._insertView(()=>h(_,V,S),S,a,v(_)),C=R?1:0):null==S?(this._detachAndCacheView(V,a),C=3):(R=this._moveView(V,S,a,v(_)),C=2),f&&f({context:R?.context,operation:C,record:_})})}detach(){for(const o of this._viewCache)o.destroy();this._viewCache=[]}_insertView(o,a,h,v){const f=this._insertViewFromCache(a,h);if(f)return void(f.context.$implicit=v);const _=o();return h.createEmbeddedView(_.templateRef,_.context,_.index)}_detachAndCacheView(o,a){const h=a.detach(o);this._maybeCacheView(h,a)}_moveView(o,a,h,v){const f=h.get(o);return h.move(f,a),f.context.$implicit=v,f}_maybeCacheView(o,a){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(o);else{const h=a.indexOf(o);-1===h?o.destroy():a.remove(h)}}_insertViewFromCache(o,a){const h=this._viewCache.pop();return h&&a.insert(h,o),h||null}}class w{get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}constructor(o=!1,a,h=!0,v){this._multiple=o,this._emitChanges=h,this.compareWith=v,this._selection=new Set,this._deselectedToEmit=[],this._selectedToEmit=[],this.changed=new l.x,a&&a.length&&(o?a.forEach(f=>this._markSelected(f)):this._markSelected(a[0]),this._selectedToEmit.length=0)}select(...o){this._verifyValueAssignment(o),o.forEach(h=>this._markSelected(h));const a=this._hasQueuedChanges();return this._emitChangeEvent(),a}deselect(...o){this._verifyValueAssignment(o),o.forEach(h=>this._unmarkSelected(h));const a=this._hasQueuedChanges();return this._emitChangeEvent(),a}setSelection(...o){this._verifyValueAssignment(o);const a=this.selected,h=new Set(o);o.forEach(f=>this._markSelected(f)),a.filter(f=>!h.has(f)).forEach(f=>this._unmarkSelected(f));const v=this._hasQueuedChanges();return this._emitChangeEvent(),v}toggle(o){return this.isSelected(o)?this.deselect(o):this.select(o)}clear(o=!0){this._unmarkAll();const a=this._hasQueuedChanges();return o&&this._emitChangeEvent(),a}isSelected(o){return this._selection.has(this._getConcreteValue(o))}isEmpty(){return 0===this._selection.size}hasValue(){return!this.isEmpty()}sort(o){this._multiple&&this.selected&&this._selected.sort(o)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(o){o=this._getConcreteValue(o),this.isSelected(o)||(this._multiple||this._unmarkAll(),this.isSelected(o)||this._selection.add(o),this._emitChanges&&this._selectedToEmit.push(o))}_unmarkSelected(o){o=this._getConcreteValue(o),this.isSelected(o)&&(this._selection.delete(o),this._emitChanges&&this._deselectedToEmit.push(o))}_unmarkAll(){this.isEmpty()||this._selection.forEach(o=>this._unmarkSelected(o))}_verifyValueAssignment(o){}_hasQueuedChanges(){return!(!this._deselectedToEmit.length&&!this._selectedToEmit.length)}_getConcreteValue(o){if(this.compareWith){for(let a of this._selection)if(this.compareWith(o,a))return a;return o}return o}}let O=(()=>{class m{constructor(){this._listeners=[]}notify(a,h){for(let v of this._listeners)v(a,h)}listen(a){return this._listeners.push(a),()=>{this._listeners=this._listeners.filter(h=>a!==h)}}ngOnDestroy(){this._listeners=[]}}return m.\u0275fac=function(a){return new(a||m)},m.\u0275prov=x.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),m})();const I=new x.OlP("_ViewRepeater")},4087:(Y,T,d)=>{d.d(T,{ZD:()=>U,mF:()=>W,Cl:()=>Ce,rL:()=>K});var F=d(1281),l=d(4650),x=d(7579),L=d(9646),b=d(9751),y=d(8421),E=d(5577),D=d(1144),w=d(576),A=d(3268);const O=["addListener","removeListener"],I=["addEventListener","removeEventListener"],m=["on","off"];function o(n,i,e,t){if((0,w.m)(e)&&(t=e,e=void 0),t)return o(n,i,e).pipe((0,A.Z)(t));const[r,s]=function f(n){return(0,w.m)(n.addEventListener)&&(0,w.m)(n.removeEventListener)}(n)?I.map(c=>g=>n[c](i,g,e)):function h(n){return(0,w.m)(n.addListener)&&(0,w.m)(n.removeListener)}(n)?O.map(a(n,i)):function v(n){return(0,w.m)(n.on)&&(0,w.m)(n.off)}(n)?m.map(a(n,i)):[];if(!r&&(0,D.z)(n))return(0,E.z)(c=>o(c,i,e))((0,y.Xf)(n));if(!r)throw new TypeError("Invalid event target");return new b.y(c=>{const g=(...u)=>c.next(1<u.length?u:u[0]);return r(g),()=>s(g)})}function a(n,i){return e=>t=>n[e](i,t)}var _=d(4408),V=d(727);const S={schedule(n){let i=requestAnimationFrame,e=cancelAnimationFrame;const{delegate:t}=S;t&&(i=t.requestAnimationFrame,e=t.cancelAnimationFrame);const r=i(s=>{e=void 0,n(s)});return new V.w0(()=>e?.(r))},requestAnimationFrame(...n){const{delegate:i}=S;return(i?.requestAnimationFrame||requestAnimationFrame)(...n)},cancelAnimationFrame(...n){const{delegate:i}=S;return(i?.cancelAnimationFrame||cancelAnimationFrame)(...n)},delegate:void 0};var C=d(640);const J=new class z extends C.v{flush(i){this._active=!0;const e=this._scheduled;this._scheduled=void 0;const{actions:t}=this;let r;i=i||t.shift();do{if(r=i.execute(i.state,i.delay))break}while((i=t[0])&&i.id===e&&t.shift());if(this._active=!1,r){for(;(i=t[0])&&i.id===e&&t.shift();)i.unsubscribe();throw r}}}(class R extends _.o{constructor(i,e){super(i,e),this.scheduler=i,this.work=e}requestAsyncId(i,e,t=0){return null!==t&&t>0?super.requestAsyncId(i,e,t):(i.actions.push(this),i._scheduled||(i._scheduled=S.requestAnimationFrame(()=>i.flush(void 0))))}recycleAsyncId(i,e,t=0){var r;if(null!=t?t>0:this.delay>0)return super.recycleAsyncId(i,e,t);const{actions:s}=i;null!=e&&(null===(r=s[s.length-1])||void 0===r?void 0:r.id)!==e&&(S.cancelAnimationFrame(e),i._scheduled=void 0)}});let j,q=1;const B={};function Z(n){return n in B&&(delete B[n],!0)}const ee={setImmediate(n){const i=q++;return B[i]=!0,j||(j=Promise.resolve()),j.then(()=>Z(i)&&n()),i},clearImmediate(n){Z(n)}},{setImmediate:te,clearImmediate:ie}=ee,P={setImmediate(...n){const{delegate:i}=P;return(i?.setImmediate||te)(...n)},clearImmediate(n){const{delegate:i}=P;return(i?.clearImmediate||ie)(n)},delegate:void 0},se=new class re extends C.v{flush(i){this._active=!0;const e=this._scheduled;this._scheduled=void 0;const{actions:t}=this;let r;i=i||t.shift();do{if(r=i.execute(i.state,i.delay))break}while((i=t[0])&&i.id===e&&t.shift());if(this._active=!1,r){for(;(i=t[0])&&i.id===e&&t.shift();)i.unsubscribe();throw r}}}(class ne extends _.o{constructor(i,e){super(i,e),this.scheduler=i,this.work=e}requestAsyncId(i,e,t=0){return null!==t&&t>0?super.requestAsyncId(i,e,t):(i.actions.push(this),i._scheduled||(i._scheduled=P.setImmediate(i.flush.bind(i,void 0))))}recycleAsyncId(i,e,t=0){var r;if(null!=t?t>0:this.delay>0)return super.recycleAsyncId(i,e,t);const{actions:s}=i;null!=e&&(null===(r=s[s.length-1])||void 0===r?void 0:r.id)!==e&&(P.clearImmediate(e),i._scheduled===e&&(i._scheduled=void 0))}});var oe=d(4986),le=d(4482),G=d(5403),ce=d(5963);function N(n,i=oe.z){return function ae(n){return(0,le.e)((i,e)=>{let t=!1,r=null,s=null,c=!1;const g=()=>{if(s?.unsubscribe(),s=null,t){t=!1;const p=r;r=null,e.next(p)}c&&e.complete()},u=()=>{s=null,c&&e.complete()};i.subscribe((0,G.x)(e,p=>{t=!0,r=p,s||(0,y.Xf)(n(p)).subscribe(s=(0,G.x)(e,g,u))},()=>{c=!0,(!t||!s||s.closed)&&e.complete()}))})}(()=>(0,ce.H)(n,i))}var de=d(9300),H=d(2722),he=d(8675),k=d(3353),$=d(6895),M=d(445);const ue=["contentWrapper"],fe=["*"],ge=new l.OlP("VIRTUAL_SCROLL_STRATEGY");let W=(()=>{class n{constructor(e,t,r){this._ngZone=e,this._platform=t,this._scrolled=new x.x,this._globalSubscription=null,this._scrolledCount=0,this.scrollContainers=new Map,this._document=r}register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){const t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=20){return this._platform.isBrowser?new b.y(t=>{this._globalSubscription||this._addGlobalListener();const r=e>0?this._scrolled.pipe(N(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||this._removeGlobalListener()}}):(0,L.of)()}ngOnDestroy(){this._removeGlobalListener(),this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){const r=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe((0,de.h)(s=>!s||r.indexOf(s)>-1))}getAncestorScrollContainers(e){const t=[];return this.scrollContainers.forEach((r,s)=>{this._scrollableContainsElement(s,e)&&t.push(s)}),t}_getWindow(){return this._document.defaultView||window}_scrollableContainsElement(e,t){let r=(0,F.fI)(t),s=e.getElementRef().nativeElement;do{if(r==s)return!0}while(r=r.parentElement);return!1}_addGlobalListener(){this._globalSubscription=this._ngZone.runOutsideAngular(()=>o(this._getWindow().document,"scroll").subscribe(()=>this._scrolled.next()))}_removeGlobalListener(){this._globalSubscription&&(this._globalSubscription.unsubscribe(),this._globalSubscription=null)}}return n.\u0275fac=function(e){return new(e||n)(l.LFG(l.R0b),l.LFG(k.t4),l.LFG($.K0,8))},n.\u0275prov=l.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),Q=(()=>{class n{constructor(e,t,r,s){this.elementRef=e,this.scrollDispatcher=t,this.ngZone=r,this.dir=s,this._destroyed=new x.x,this._elementScrolled=new b.y(c=>this.ngZone.runOutsideAngular(()=>o(this.elementRef.nativeElement,"scroll").pipe((0,H.R)(this._destroyed)).subscribe(c)))}ngOnInit(){this.scrollDispatcher.register(this)}ngOnDestroy(){this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){const t=this.elementRef.nativeElement,r=this.dir&&"rtl"==this.dir.value;null==e.left&&(e.left=r?e.end:e.start),null==e.right&&(e.right=r?e.start:e.end),null!=e.bottom&&(e.top=t.scrollHeight-t.clientHeight-e.bottom),r&&0!=(0,k._i)()?(null!=e.left&&(e.right=t.scrollWidth-t.clientWidth-e.left),2==(0,k._i)()?e.left=e.right:1==(0,k._i)()&&(e.left=e.right?-e.right:e.right)):null!=e.right&&(e.left=t.scrollWidth-t.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){const t=this.elementRef.nativeElement;(0,k.Mq)()?t.scrollTo(e):(null!=e.top&&(t.scrollTop=e.top),null!=e.left&&(t.scrollLeft=e.left))}measureScrollOffset(e){const t="left",r="right",s=this.elementRef.nativeElement;if("top"==e)return s.scrollTop;if("bottom"==e)return s.scrollHeight-s.clientHeight-s.scrollTop;const c=this.dir&&"rtl"==this.dir.value;return"start"==e?e=c?r:t:"end"==e&&(e=c?t:r),c&&2==(0,k._i)()?e==t?s.scrollWidth-s.clientWidth-s.scrollLeft:s.scrollLeft:c&&1==(0,k._i)()?e==t?s.scrollLeft+s.scrollWidth-s.clientWidth:-s.scrollLeft:e==t?s.scrollLeft:s.scrollWidth-s.clientWidth-s.scrollLeft}}return n.\u0275fac=function(e){return new(e||n)(l.Y36(l.SBq),l.Y36(W),l.Y36(l.R0b),l.Y36(M.Is,8))},n.\u0275dir=l.lG2({type:n,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]],standalone:!0}),n})(),K=(()=>{class n{constructor(e,t,r){this._platform=e,this._change=new x.x,this._changeListener=s=>{this._change.next(s)},this._document=r,t.runOutsideAngular(()=>{if(e.isBrowser){const s=this._getWindow();s.addEventListener("resize",this._changeListener),s.addEventListener("orientationchange",this._changeListener)}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){if(this._platform.isBrowser){const e=this._getWindow();e.removeEventListener("resize",this._changeListener),e.removeEventListener("orientationchange",this._changeListener)}this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();const e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){const e=this.getViewportScrollPosition(),{width:t,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+t,height:r,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};const e=this._document,t=this._getWindow(),r=e.documentElement,s=r.getBoundingClientRect();return{top:-s.top||e.body.scrollTop||t.scrollY||r.scrollTop||0,left:-s.left||e.body.scrollLeft||t.scrollX||r.scrollLeft||0}}change(e=20){return e>0?this._change.pipe(N(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){const e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}}return n.\u0275fac=function(e){return new(e||n)(l.LFG(k.t4),l.LFG(l.R0b),l.LFG($.K0,8))},n.\u0275prov=l.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();const X=new l.OlP("VIRTUAL_SCROLLABLE");let pe=(()=>{class n extends Q{constructor(e,t,r,s){super(e,t,r,s)}measureViewportSize(e){const t=this.elementRef.nativeElement;return"horizontal"===e?t.clientWidth:t.clientHeight}}return n.\u0275fac=function(e){return new(e||n)(l.Y36(l.SBq),l.Y36(W),l.Y36(l.R0b),l.Y36(M.Is,8))},n.\u0275dir=l.lG2({type:n,features:[l.qOj]}),n})();const Se=typeof requestAnimationFrame<"u"?J:se;let we=(()=>{class n extends pe{get orientation(){return this._orientation}set orientation(e){this._orientation!==e&&(this._orientation=e,this._calculateSpacerSize())}get appendOnly(){return this._appendOnly}set appendOnly(e){this._appendOnly=(0,F.Ig)(e)}constructor(e,t,r,s,c,g,u,p){super(e,g,r,c),this.elementRef=e,this._changeDetectorRef=t,this._scrollStrategy=s,this.scrollable=p,this._platform=(0,l.f3M)(k.t4),this._detachedSubject=new x.x,this._renderedRangeSubject=new x.x,this._orientation="vertical",this._appendOnly=!1,this.scrolledIndexChange=new b.y(Re=>this._scrollStrategy.scrolledIndexChange.subscribe(xe=>Promise.resolve().then(()=>this.ngZone.run(()=>Re.next(xe))))),this.renderedRangeStream=this._renderedRangeSubject,this._totalContentSize=0,this._totalContentWidth="",this._totalContentHeight="",this._renderedRange={start:0,end:0},this._dataLength=0,this._viewportSize=0,this._renderedContentOffset=0,this._renderedContentOffsetNeedsRewrite=!1,this._isChangeDetectionPending=!1,this._runAfterChangeDetection=[],this._viewportChanges=V.w0.EMPTY,this._viewportChanges=u.change().subscribe(()=>{this.checkViewportSize()}),this.scrollable||(this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable"),this.scrollable=this)}ngOnInit(){this._platform.isBrowser&&(this.scrollable===this&&super.ngOnInit(),this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._measureViewportSize(),this._scrollStrategy.attach(this),this.scrollable.elementScrolled().pipe((0,he.O)(null),N(0,Se)).subscribe(()=>this._scrollStrategy.onContentScrolled()),this._markChangeDetectionNeeded()})))}ngOnDestroy(){this.detach(),this._scrollStrategy.detach(),this._renderedRangeSubject.complete(),this._detachedSubject.complete(),this._viewportChanges.unsubscribe(),super.ngOnDestroy()}attach(e){this.ngZone.runOutsideAngular(()=>{this._forOf=e,this._forOf.dataStream.pipe((0,H.R)(this._detachedSubject)).subscribe(t=>{const r=t.length;r!==this._dataLength&&(this._dataLength=r,this._scrollStrategy.onDataLengthChanged()),this._doChangeDetection()})})}detach(){this._forOf=null,this._detachedSubject.next()}getDataLength(){return this._dataLength}getViewportSize(){return this._viewportSize}getRenderedRange(){return this._renderedRange}measureBoundingClientRectWithScrollOffset(e){return this.getElementRef().nativeElement.getBoundingClientRect()[e]}setTotalContentSize(e){this._totalContentSize!==e&&(this._totalContentSize=e,this._calculateSpacerSize(),this._markChangeDetectionNeeded())}setRenderedRange(e){(function ve(n,i){return n.start==i.start&&n.end==i.end})(this._renderedRange,e)||(this.appendOnly&&(e={start:0,end:Math.max(this._renderedRange.end,e.end)}),this._renderedRangeSubject.next(this._renderedRange=e),this._markChangeDetectionNeeded(()=>this._scrollStrategy.onContentRendered()))}getOffsetToRenderedContentStart(){return this._renderedContentOffsetNeedsRewrite?null:this._renderedContentOffset}setRenderedContentOffset(e,t="to-start"){e=this.appendOnly&&"to-start"===t?0:e;const s="horizontal"==this.orientation,c=s?"X":"Y";let u=`translate${c}(${Number((s&&this.dir&&"rtl"==this.dir.value?-1:1)*e)}px)`;this._renderedContentOffset=e,"to-end"===t&&(u+=` translate${c}(-100%)`,this._renderedContentOffsetNeedsRewrite=!0),this._renderedContentTransform!=u&&(this._renderedContentTransform=u,this._markChangeDetectionNeeded(()=>{this._renderedContentOffsetNeedsRewrite?(this._renderedContentOffset-=this.measureRenderedContentSize(),this._renderedContentOffsetNeedsRewrite=!1,this.setRenderedContentOffset(this._renderedContentOffset)):this._scrollStrategy.onRenderedOffsetChanged()}))}scrollToOffset(e,t="auto"){const r={behavior:t};"horizontal"===this.orientation?r.start=e:r.top=e,this.scrollable.scrollTo(r)}scrollToIndex(e,t="auto"){this._scrollStrategy.scrollToIndex(e,t)}measureScrollOffset(e){let t;return t=this.scrollable==this?r=>super.measureScrollOffset(r):r=>this.scrollable.measureScrollOffset(r),Math.max(0,t(e??("horizontal"===this.orientation?"start":"top"))-this.measureViewportOffset())}measureViewportOffset(e){let t;const r="left",s="right",c="rtl"==this.dir?.value;t="start"==e?c?s:r:"end"==e?c?r:s:e||("horizontal"===this.orientation?"left":"top");const g=this.scrollable.measureBoundingClientRectWithScrollOffset(t);return this.elementRef.nativeElement.getBoundingClientRect()[t]-g}measureRenderedContentSize(){const e=this._contentWrapper.nativeElement;return"horizontal"===this.orientation?e.offsetWidth:e.offsetHeight}measureRangeSize(e){return this._forOf?this._forOf.measureRangeSize(e,this.orientation):0}checkViewportSize(){this._measureViewportSize(),this._scrollStrategy.onDataLengthChanged()}_measureViewportSize(){this._viewportSize=this.scrollable.measureViewportSize(this.orientation)}_markChangeDetectionNeeded(e){e&&this._runAfterChangeDetection.push(e),this._isChangeDetectionPending||(this._isChangeDetectionPending=!0,this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._doChangeDetection()})))}_doChangeDetection(){this._isChangeDetectionPending=!1,this._contentWrapper.nativeElement.style.transform=this._renderedContentTransform,this.ngZone.run(()=>this._changeDetectorRef.markForCheck());const e=this._runAfterChangeDetection;this._runAfterChangeDetection=[];for(const t of e)t()}_calculateSpacerSize(){this._totalContentHeight="horizontal"===this.orientation?"":`${this._totalContentSize}px`,this._totalContentWidth="horizontal"===this.orientation?`${this._totalContentSize}px`:""}}return n.\u0275fac=function(e){return new(e||n)(l.Y36(l.SBq),l.Y36(l.sBO),l.Y36(l.R0b),l.Y36(ge,8),l.Y36(M.Is,8),l.Y36(W),l.Y36(K),l.Y36(X,8))},n.\u0275cmp=l.Xpm({type:n,selectors:[["cdk-virtual-scroll-viewport"]],viewQuery:function(e,t){if(1&e&&l.Gf(ue,7),2&e){let r;l.iGM(r=l.CRH())&&(t._contentWrapper=r.first)}},hostAttrs:[1,"cdk-virtual-scroll-viewport"],hostVars:4,hostBindings:function(e,t){2&e&&l.ekj("cdk-virtual-scroll-orientation-horizontal","horizontal"===t.orientation)("cdk-virtual-scroll-orientation-vertical","horizontal"!==t.orientation)},inputs:{orientation:"orientation",appendOnly:"appendOnly"},outputs:{scrolledIndexChange:"scrolledIndexChange"},standalone:!0,features:[l._Bn([{provide:Q,useFactory:(i,e)=>i||e,deps:[[new l.FiY,new l.tBr(X)],n]}]),l.qOj,l.jDz],ngContentSelectors:fe,decls:4,vars:4,consts:[[1,"cdk-virtual-scroll-content-wrapper"],["contentWrapper",""],[1,"cdk-virtual-scroll-spacer"]],template:function(e,t){1&e&&(l.F$t(),l.TgZ(0,"div",0,1),l.Hsn(2),l.qZA(),l._UZ(3,"div",2)),2&e&&(l.xp6(3),l.Udp("width",t._totalContentWidth)("height",t._totalContentHeight))},styles:["cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}"],encapsulation:2,changeDetection:0}),n})(),U=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=l.oAB({type:n}),n.\u0275inj=l.cJS({}),n})(),Ce=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=l.oAB({type:n}),n.\u0275inj=l.cJS({imports:[M.vT,U,we,M.vT,U]}),n})()}}]);