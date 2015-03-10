/*! jQuery UI - v1.11.2 - 2014-11-28
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, position.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){function e(e,n){var s,o,a,r=e.nodeName.toLowerCase();return"area"===r?(s=e.parentNode,o=s.name,e.href&&o&&"map"===s.nodeName.toLowerCase()?(a=t("img[usemap='#"+o+"']")[0],!!a&&i(a)):!1):(/input|select|textarea|button|object/.test(r)?!e.disabled:"a"===r?e.href||n:n)&&i(e)}function i(e){return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){return"hidden"===t.css(this,"visibility")}).length}/*!
   * jQuery UI Core 1.11.2
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/category/ui-core/
   */
t.ui=t.ui||{},t.extend(t.ui,{version:"1.11.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),t.fn.extend({scrollParent:function(e){var i=this.css("position"),n="absolute"===i,s=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return n&&"static"===e.css("position")?!1:s.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:t(this[0].ownerDocument||document)},uniqueId:function(){var t=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++t)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&t(this).removeAttr("id")})}}),t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,n){return!!t.data(e,n[3])},focusable:function(i){return e(i,!isNaN(t.attr(i,"tabindex")))},tabbable:function(i){var n=t.attr(i,"tabindex"),s=isNaN(n);return(s||n>=0)&&e(i,!s)}}),t("<a>").outerWidth(1).jquery||t.each(["Width","Height"],function(e,i){function n(e,i,n,o){return t.each(s,function(){i-=parseFloat(t.css(e,"padding"+this))||0,n&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),o&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var s="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),a={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(e){return void 0===e?a["inner"+i].call(this):this.each(function(){t(this).css(o,n(this,e)+"px")})},t.fn["outer"+i]=function(e,s){return"number"!=typeof e?a["outer"+i].call(this,e):this.each(function(){t(this).css(o,n(this,e,!0,s)+"px")})}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(t.fn.removeData=function(e){return function(i){return arguments.length?e.call(this,t.camelCase(i)):e.call(this)}}(t.fn.removeData)),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),t.fn.extend({focus:function(e){return function(i,n){return"number"==typeof i?this.each(function(){var e=this;setTimeout(function(){t(e).focus(),n&&n.call(e)},i)}):e.apply(this,arguments)}}(t.fn.focus),disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(e){if(void 0!==e)return this.css("zIndex",e);if(this.length)for(var i,n,s=t(this[0]);s.length&&s[0]!==document;){if(i=s.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(n=parseInt(s.css("zIndex"),10),!isNaN(n)&&0!==n))return n;s=s.parent()}return 0}}),t.ui.plugin={add:function(e,i,n){var s,o=t.ui[e].prototype;for(s in n)o.plugins[s]=o.plugins[s]||[],o.plugins[s].push([i,n[s]])},call:function(t,e,i,n){var s,o=t.plugins[e];if(o&&(n||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(s=0;s<o.length;s++)t.options[o[s][0]]&&o[s][1].apply(t.element,i)}};/*!
   * jQuery UI Widget 1.11.2
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/jQuery.widget/
   */
var n=0,s=Array.prototype.slice;t.cleanData=function(e){return function(i){var n,s,o;for(o=0;null!=(s=i[o]);o++)try{n=t._data(s,"events"),n&&n.remove&&t(s).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,n){var s,o,a,r,l={},c=e.split(".")[0];return e=e.split(".")[1],s=c+"-"+e,n||(n=i,i=t.Widget),t.expr[":"][s.toLowerCase()]=function(e){return!!t.data(e,s)},t[c]=t[c]||{},o=t[c][e],a=t[c][e]=function(t,e){return this._createWidget?void(arguments.length&&this._createWidget(t,e)):new a(t,e)},t.extend(a,o,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),r=new i,r.options=t.widget.extend({},r.options),t.each(n,function(e,n){return t.isFunction(n)?void(l[e]=function(){var t=function(){return i.prototype[e].apply(this,arguments)},s=function(t){return i.prototype[e].apply(this,t)};return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=s,e=n.apply(this,arguments),this._super=i,this._superApply=o,e}}()):void(l[e]=n)}),a.prototype=t.widget.extend(r,{widgetEventPrefix:o?r.widgetEventPrefix||e:e},l,{constructor:a,namespace:c,widgetName:e,widgetFullName:s}),o?(t.each(o._childConstructors,function(e,i){var n=i.prototype;t.widget(n.namespace+"."+n.widgetName,a,i._proto)}),delete o._childConstructors):i._childConstructors.push(a),t.widget.bridge(e,a),a},t.widget.extend=function(e){for(var i,n,o=s.call(arguments,1),a=0,r=o.length;r>a;a++)for(i in o[a])n=o[a][i],o[a].hasOwnProperty(i)&&void 0!==n&&(e[i]=t.isPlainObject(n)?t.isPlainObject(e[i])?t.widget.extend({},e[i],n):t.widget.extend({},n):n);return e},t.widget.bridge=function(e,i){var n=i.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=s.call(arguments,1),l=this;return o=!a&&r.length?t.widget.extend.apply(null,[o].concat(r)):o,this.each(a?function(){var i,s=t.data(this,n);return"instance"===o?(l=s,!1):s?t.isFunction(s[o])&&"_"!==o.charAt(0)?(i=s[o].apply(s,r),i!==s&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+o+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; attempted to call method '"+o+"'")}:function(){var e=t.data(this,n);e?(e.option(o||{}),e._init&&e._init()):t.data(this,n,new i(o,this))}),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,i){i=t(i||this.defaultElement||this)[0],this.element=t(i),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),i!==this&&(t.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=t(i.style?i.ownerDocument:i.document||i),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var n,s,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},n=e.split("."),e=n.shift(),n.length){for(s=a[e]=t.widget.extend({},this.options[e]),o=0;o<n.length-1;o++)s[n[o]]=s[n[o]]||{},s=s[n[o]];if(e=n.pop(),1===arguments.length)return void 0===s[e]?null:s[e];s[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!e),e&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(e,i,n){var s,o=this;"boolean"!=typeof e&&(n=i,i=e,e=!1),n?(i=s=t(i),this.bindings=this.bindings.add(i)):(n=i,i=this.element,s=this.widget()),t.each(n,function(n,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=n.match(/^([\w:-]*)\s*(.*)$/),c=l[1]+o.eventNamespace,h=l[2];h?s.delegate(h,c,r):i.bind(c,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(i).undelegate(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?n[t]:t).apply(n,arguments)}var n=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,n){var s,o,a=this.options[e];if(n=n||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(s in o)s in i||(i[s]=o[s]);return this.element.trigger(i,n),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(n))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(n,s,o){"string"==typeof s&&(s={effect:s});var a,r=s?s===!0||"number"==typeof s?i:s.effect||i:e;s=s||{},"number"==typeof s&&(s={duration:s}),a=!t.isEmptyObject(s),s.complete=o,s.delay&&n.delay(s.delay),a&&t.effects&&t.effects.effect[r]?n[e](s):r!==e&&n[r]?n[r](s.duration,s.easing,o):n.queue(function(i){t(this)[e](),o&&o.call(n[0]),i()})}});var o=(t.widget,!1);t(document).mouseup(function(){o=!1});t.widget("ui.mouse",{version:"1.11.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).bind("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){if(!o){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(e),this._mouseDownEvent=e;var i=this,n=1===e.which,s="string"==typeof this.options.cancel&&e.target.nodeName?t(e.target).closest(this.options.cancel).length:!1;return n&&!s&&this._mouseCapture(e)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(e)!==!1,!this._mouseStarted)?(e.preventDefault(),!0):(!0===t.data(e.target,this.widgetName+".preventClickEvent")&&t.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return i._mouseMove(t)},this._mouseUpDelegate=function(t){return i._mouseUp(t)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),o=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||document.documentMode<9)&&!e.button)return this._mouseUp(e);if(!e.which)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),o=!1,!1},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}});/*!
   * jQuery UI Position 1.11.2
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/position/
   */
!function(){function e(t,e,i){return[parseFloat(t[0])*(f.test(t[0])?e/100:1),parseFloat(t[1])*(f.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var s,o,a=Math.max,r=Math.abs,l=Math.round,c=/left|center|right/,h=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,f=/%$/,p=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==s)return s;var e,i,n=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),e=o.offsetWidth,n.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=n[0].clientWidth),n.remove(),s=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),n=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),s="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===n||"auto"===n&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:s?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),n=t.isWindow(i[0]),s=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:n,isDocument:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:n||s?i.width():i.outerWidth(),height:n||s?i.height():i.outerHeight()}}},t.fn.position=function(s){if(!s||!s.of)return p.apply(this,arguments);s=t.extend({},s);var f,m,g,v,w,b,y=t(s.of),x=t.position.getWithinInfo(s.within),_=t.position.getScrollInfo(x),C=(s.collision||"flip").split(" "),S={};return b=n(y),y[0].preventDefault&&(s.at="left top"),m=b.width,g=b.height,v=b.offset,w=t.extend({},v),t.each(["my","at"],function(){var t,e,i=(s[this]||"").split(" ");1===i.length&&(i=c.test(i[0])?i.concat(["center"]):h.test(i[0])?["center"].concat(i):["center","center"]),i[0]=c.test(i[0])?i[0]:"center",i[1]=h.test(i[1])?i[1]:"center",t=u.exec(i[0]),e=u.exec(i[1]),S[this]=[t?t[0]:0,e?e[0]:0],s[this]=[d.exec(i[0])[0],d.exec(i[1])[0]]}),1===C.length&&(C[1]=C[0]),"right"===s.at[0]?w.left+=m:"center"===s.at[0]&&(w.left+=m/2),"bottom"===s.at[1]?w.top+=g:"center"===s.at[1]&&(w.top+=g/2),f=e(S.at,m,g),w.left+=f[0],w.top+=f[1],this.each(function(){var n,c,h=t(this),u=h.outerWidth(),d=h.outerHeight(),p=i(this,"marginLeft"),b=i(this,"marginTop"),k=u+p+i(this,"marginRight")+_.width,E=d+b+i(this,"marginBottom")+_.height,T=t.extend({},w),D=e(S.my,h.outerWidth(),h.outerHeight());"right"===s.my[0]?T.left-=u:"center"===s.my[0]&&(T.left-=u/2),"bottom"===s.my[1]?T.top-=d:"center"===s.my[1]&&(T.top-=d/2),T.left+=D[0],T.top+=D[1],o||(T.left=l(T.left),T.top=l(T.top)),n={marginLeft:p,marginTop:b},t.each(["left","top"],function(e,i){t.ui.position[C[e]]&&t.ui.position[C[e]][i](T,{targetWidth:m,targetHeight:g,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:k,collisionHeight:E,offset:[f[0]+D[0],f[1]+D[1]],my:s.my,at:s.at,within:x,elem:h})}),s.using&&(c=function(t){var e=v.left-T.left,i=e+m-u,n=v.top-T.top,o=n+g-d,l={target:{element:y,left:v.left,top:v.top,width:m,height:g},element:{element:h,left:T.left,top:T.top,width:u,height:d},horizontal:0>i?"left":e>0?"right":"center",vertical:0>o?"top":n>0?"bottom":"middle"};u>m&&r(e+i)<m&&(l.horizontal="center"),d>g&&r(n+o)<g&&(l.vertical="middle"),l.important=a(r(e),r(i))>a(r(n),r(o))?"horizontal":"vertical",s.using.call(this,t,l)}),h.offset(t.extend(T,{using:c}))})},t.ui.position={fit:{left:function(t,e){var i,n=e.within,s=n.isWindow?n.scrollLeft:n.offset.left,o=n.width,r=t.left-e.collisionPosition.marginLeft,l=s-r,c=r+e.collisionWidth-o-s;e.collisionWidth>o?l>0&&0>=c?(i=t.left+l+e.collisionWidth-o-s,t.left+=l-i):t.left=c>0&&0>=l?s:l>c?s+o-e.collisionWidth:s:l>0?t.left+=l:c>0?t.left-=c:t.left=a(t.left-r,t.left)},top:function(t,e){var i,n=e.within,s=n.isWindow?n.scrollTop:n.offset.top,o=e.within.height,r=t.top-e.collisionPosition.marginTop,l=s-r,c=r+e.collisionHeight-o-s;e.collisionHeight>o?l>0&&0>=c?(i=t.top+l+e.collisionHeight-o-s,t.top+=l-i):t.top=c>0&&0>=l?s:l>c?s+o-e.collisionHeight:s:l>0?t.top+=l:c>0?t.top-=c:t.top=a(t.top-r,t.top)}},flip:{left:function(t,e){var i,n,s=e.within,o=s.offset.left+s.scrollLeft,a=s.width,l=s.isWindow?s.scrollLeft:s.offset.left,c=t.left-e.collisionPosition.marginLeft,h=c-l,u=c+e.collisionWidth-a-l,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,f="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,p=-2*e.offset[0];0>h?(i=t.left+d+f+p+e.collisionWidth-a-o,(0>i||i<r(h))&&(t.left+=d+f+p)):u>0&&(n=t.left-e.collisionPosition.marginLeft+d+f+p-l,(n>0||r(n)<u)&&(t.left+=d+f+p))},top:function(t,e){var i,n,s=e.within,o=s.offset.top+s.scrollTop,a=s.height,l=s.isWindow?s.scrollTop:s.offset.top,c=t.top-e.collisionPosition.marginTop,h=c-l,u=c+e.collisionHeight-a-l,d="top"===e.my[1],f=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,p="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>h?(n=t.top+f+p+m+e.collisionHeight-a-o,t.top+f+p+m>h&&(0>n||n<r(h))&&(t.top+=f+p+m)):u>0&&(i=t.top-e.collisionPosition.marginTop+f+p+m-l,t.top+f+p+m>u&&(i>0||r(i)<u)&&(t.top+=f+p+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,n,s,a,r=document.getElementsByTagName("body")[0],l=document.createElement("div");e=document.createElement(r?"div":"body"),n={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&t.extend(n,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in n)e.style[a]=n[a];e.appendChild(l),i=r||document.documentElement,i.insertBefore(e,i.firstChild),l.style.cssText="position: absolute; left: 10.7432222px;",s=t(l).offset().left,o=s>10&&11>s,e.innerHTML="",i.removeChild(e)}()}();t.ui.position}),jQuery(function(){if("function"!=typeof window.scrollTo&&"object"!=typeof window.scrollTo){var t=document.createElement("iframe");document.body.appendChild(t);var e=t.contentWindow.scrollTo;document.body.removeChild(t),"function"==typeof e.call&&(window.scrollTo=function(t,i){e.call(window,t,i)})}}),"undefined"!=typeof Bugsnag&&(Bugsnag.beforeNotify=function(t,e){"undefined"!=typeof Payroll&&Payroll.Store&&Payroll.Store.company&&(e.company=Payroll.Store.company.toJSON());var i=window._lastJqxhr;if(window._lastJqxhr=null,"undefined"!=typeof i&&i){var n=i.responseText.substring(0,1024);if(1024==n.length&&(n+="... (truncated)"),e.lastAjaxRequest={requestType:i.requestType,requestDataType:i.requestDataType,requestURL:i.requestURL,responseStatus:i.status,responseData:n},i.requestData){var s=JSON.parse(i.requestData),o=JSON.stringify(s,function(t,e){return"password"===t?"[FILTERED]":e}),a=o.substring(0,1024);1024==a.length&&(a+="... (truncated)"),e.lastAjaxRequest.requestData=a}}},$(document).ajaxSend(function(t,e,i){e.requestType=i.type,e.requestDataType=i.dataType,e.requestData=i.data,e.requestURL=i.url,window._lastJqxhr=e}),Bugsnag.releaseStage="production",Bugsnag.notifyReleaseStages=["staging","demo","production"]),function(t,e){var i=function(){var e=t._data(document,"events");return e&&e.click&&t.grep(e.click,function(t){return"rails"===t.namespace}).length};i()&&t.error("jquery-ujs has already been loaded!");var n;t.rails=n={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input:file",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(e){var i=t('meta[name="csrf-token"]').attr("content");i&&e.setRequestHeader("X-CSRF-Token",i)},fire:function(e,i,n){var s=t.Event(i);return e.trigger(s,n),s.result!==!1},confirm:function(t){return confirm(t)},ajax:function(e){return t.ajax(e)},href:function(t){return t.attr("href")},handleRemote:function(i){var s,o,a,r,l,c,h,u;if(n.fire(i,"ajax:before")){if(r=i.data("cross-domain"),l=r===e?null:r,c=i.data("with-credentials")||null,h=i.data("type")||t.ajaxSettings&&t.ajaxSettings.dataType,i.is("form")){s=i.attr("method"),o=i.attr("action"),a=i.serializeArray();var d=i.data("ujs:submit-button");d&&(a.push(d),i.data("ujs:submit-button",null))}else i.is(n.inputChangeSelector)?(s=i.data("method"),o=i.data("url"),a=i.serialize(),i.data("params")&&(a=a+"&"+i.data("params"))):(s=i.data("method"),o=n.href(i),a=i.data("params")||null);u={type:s||"GET",data:a,dataType:h,beforeSend:function(t,s){return s.dataType===e&&t.setRequestHeader("accept","*/*;q=0.5, "+s.accepts.script),n.fire(i,"ajax:beforeSend",[t,s])},success:function(t,e,n){i.trigger("ajax:success",[t,e,n])},complete:function(t,e){i.trigger("ajax:complete",[t,e])},error:function(t,e,n){i.trigger("ajax:error",[t,e,n])},xhrFields:{withCredentials:c},crossDomain:l},o&&(u.url=o);var f=n.ajax(u);return i.trigger("ajax:send",f),f}return!1},handleMethod:function(i){var s=n.href(i),o=i.data("method"),a=i.attr("target"),r=t("meta[name=csrf-token]").attr("content"),l=t("meta[name=csrf-param]").attr("content"),c=t('<form method="post" action="'+s+'"></form>'),h='<input name="_method" value="'+o+'" type="hidden" />';l!==e&&r!==e&&(h+='<input name="'+l+'" value="'+r+'" type="hidden" />'),a&&c.attr("target",a),c.hide().append(h).appendTo("body"),c.submit()},disableFormElements:function(e){e.find(n.disableSelector).each(function(){var e=t(this),i=e.is("button")?"html":"val";e.data("ujs:enable-with",e[i]()),e[i](e.data("disable-with")),e.prop("disabled",!0)})},enableFormElements:function(e){e.find(n.enableSelector).each(function(){var e=t(this),i=e.is("button")?"html":"val";e.data("ujs:enable-with")&&e[i](e.data("ujs:enable-with")),e.prop("disabled",!1)})},allowAction:function(t){var e,i=t.data("confirm"),s=!1;return i?(n.fire(t,"confirm")&&(s=n.confirm(i),e=n.fire(t,"confirm:complete",[s])),s&&e):!0},blankInputs:function(e,i,n){var s,o,a=t(),r=i||"input,textarea",l=e.find(r);return l.each(function(){if(s=t(this),o=s.is(":checkbox,:radio")?s.is(":checked"):s.val(),!o==!n){if(s.is(":radio")&&l.filter('input:radio:checked[name="'+s.attr("name")+'"]').length)return!0;a=a.add(s)}}),a.length?a:!1},nonBlankInputs:function(t,e){return n.blankInputs(t,e,!0)},stopEverything:function(e){return t(e.target).trigger("ujs:everythingStopped"),e.stopImmediatePropagation(),!1},callFormSubmitBindings:function(i,n){var s=i.data("events"),o=!0;return s!==e&&s.submit!==e&&t.each(s.submit,function(t,e){return"function"==typeof e.handler?o=e.handler(n):void 0}),o},disableElement:function(t){t.data("ujs:enable-with",t.html()),t.html(t.data("disable-with")),t.bind("click.railsDisable",function(t){return n.stopEverything(t)})},enableElement:function(t){t.data("ujs:enable-with")!==e&&(t.html(t.data("ujs:enable-with")),t.data("ujs:enable-with",!1)),t.unbind("click.railsDisable")}},n.fire(t(document),"rails:attachBindings")&&(t.ajaxPrefilter(function(t,e,i){t.crossDomain||n.CSRFProtection(i)}),t(document).delegate(n.linkDisableSelector,"ajax:complete",function(){n.enableElement(t(this))}),t(document).delegate(n.linkClickSelector,"click.rails",function(i){var s=t(this),o=s.data("method"),a=s.data("params");if(!n.allowAction(s))return n.stopEverything(i);if(s.is(n.linkDisableSelector)&&n.disableElement(s),s.data("remote")!==e){if(!(!i.metaKey&&!i.ctrlKey||o&&"GET"!==o||a))return!0;var r=n.handleRemote(s);return r===!1?n.enableElement(s):r.error(function(){n.enableElement(s)}),!1}return s.data("method")?(n.handleMethod(s),!1):void 0}),t(document).delegate(n.inputChangeSelector,"change.rails",function(e){var i=t(this);return n.allowAction(i)?(n.handleRemote(i),!1):n.stopEverything(e)}),t(document).delegate(n.formSubmitSelector,"submit.rails",function(i){var s=t(this),o=s.data("remote")!==e,a=n.blankInputs(s,n.requiredInputSelector),r=n.nonBlankInputs(s,n.fileInputSelector);if(!n.allowAction(s))return n.stopEverything(i);if(a&&s.attr("novalidate")==e&&n.fire(s,"ajax:aborted:required",[a]))return n.stopEverything(i);if(o){if(r){setTimeout(function(){n.disableFormElements(s)},13);var l=n.fire(s,"ajax:aborted:file",[r]);return l||setTimeout(function(){n.enableFormElements(s)},13),l}return!t.support.submitBubbles&&t().jquery<"1.7"&&n.callFormSubmitBindings(s,i)===!1?n.stopEverything(i):(n.handleRemote(s),!1)}setTimeout(function(){n.disableFormElements(s)},13)}),t(document).delegate(n.formInputClickSelector,"click.rails",function(e){var i=t(this);if(!n.allowAction(i))return n.stopEverything(e);var s=i.attr("name"),o=s?{name:s,value:i.val()}:null;i.closest("form").data("ujs:submit-button",o)}),t(document).delegate(n.formSubmitSelector,"ajax:beforeSend.rails",function(e){this==e.target&&n.disableFormElements(t(this))}),t(document).delegate(n.formSubmitSelector,"ajax:complete.rails",function(e){this==e.target&&n.enableFormElements(t(this))}),t(function(){csrf_token=t("meta[name=csrf-token]").attr("content"),csrf_param=t("meta[name=csrf-param]").attr("content"),t('form input[name="'+csrf_param+'"]').val(csrf_token)}))}(jQuery),function(t){if(window.initializeNamespace=function(t){var e=t.split("."),i=window;for(var n in e){var s=e[n];i[s]||(i[s]={}),i=i[s]}},window.isBlank=function(t){return"undefined"==typeof t||null===t||""===t},window.isZero=function(t){return 0==t},window.endsWith=function(t,e){return-1!==t.indexOf(e,t.length-e.length)},window.emulatePlaceholderTag=function(){t("[placeholder]").focus(function(){var e=t(this);e.val()==e.attr("placeholder")&&(e.val(""),e.addClass("non-placeholder-field-color"),e.removeClass("placeholder-field-color"))}).blur(function(){var e=t(this);(""==e.val()||e.val()==e.attr("placeholder"))&&(e.removeClass("non-placeholder-field-color"),e.addClass("placeholder-field-color"),e.val(e.attr("placeholder")))}).blur(),t("[placeholder]").parents("form").submit(function(){t(this).find("[placeholder]").each(function(){var e=t(this);e.val()==e.attr("placeholder")&&e.val("")})})},window.formatAllFields=function(){formatPhoneFields(),formatSSNFields(),formatITINFields(),formatEINFields(),formatCAEINFields(),formatBankRoutingFields()},window.formatBankRoutingFields=function(){t(".format-bank-routing").mask("999999999")},window.formatPhoneFields=function(){t(".format-phone").mask("(999) 999-9999")},window.formatSSNFields=function(){t(".format-ssn").mask("999-99-9999")},window.formatITINFields=function(){t(".format-itin").mask("999-99-9999")},window.formatEINFields=function(){t(".format-ein").mask("99-9999999")},window.formatCAEINFields=function(){t(".format-ca-ein").mask("999-9999-9")},window.formatString=function(t,e,i){var n=t;return e.test(t)&&(n=t.replace(e,i)),n},window.formatPhone=function(t){return formatString(t,/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,"$1-$2-$3")},window.formatSSN=function(t){return formatString(t,/^([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{4})$/,"XXX-XX-$3")},window.formatBankNumber=function(t){for(var e="",i=4,n=0;n<t.length;n++)e+=n>t.length-i-1?t.charAt(n):"X";return e},window.formatITIN=function(t){return formatString(t,/^([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{4})$/,"XXX-XX-$3")},window.formatEIN=function(t){return formatString(t,/^([0-9]{2})[-. ]?([0-9]{7})$/,"$1-$2")},window.formatDate=function(t){return t=t.replace(/T.*/,""),formatString(t,/^([0-9]{4})[-. ]?([0-9]{2})[-. ]?([0-9]{2})/,"$2/$3/$1")},window.formatTimezoneDate=function(t){return t.toString("MM/dd/yyyy")},window.formatTimezoneTime=function(t){return t.toString("h:mmk (Z)")},window.formatMonthDay=function(t){return t=t.replace(/T.*/,""),formatString(t,/^([0-9]{4})[-. ]?([0-9]{2})[-. ]?([0-9]{2})/,"$2/$3")},window.localizeDate=function(t){return t?t.replace(/(\d{4})-(\d{2})-(\d{2})/g,"$2/$3/$1"):""},window.unlocalizeDate=function(t){return t.replace(/(\d{2})\/(\d{2})\/(\d{4})/g,"$3-$1-$2")},window.parseDate=function(t){var e=t.match(/(\d+)/g);return new Date(e[0],e[1]-1,e[2])},window.formatDollars=function(t,e){e=e||{};var i="$",n=e.cents||2,s=".",o=",",a=0>t?"-":"",r=parseInt(t=Math.abs(+t||Number.MIN_VALUE).toFixed(n))+"",l=r.length>3?r.length%3:0,c=a+i;return c+=l?r.substr(0,l)+o:"",c+=r.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+o)+(s+Math.abs(t-r).toFixed(n).slice(2))},window.toDecimal=function(t,e,i){return parseFloat(parseFloat(t.toFixed(e)).toFixed(i))},window.extractPath=function(t){if(getHost()==t)return"/";var e=/.+?\:\/\/.+?(\/.*)/,i=e.exec(t);return null==i?t:i[1]},window.getHost=function(){var t,e=window.location.hostname.substr(window.location.hostname.lastIndexOf(".")+1),i=window.location.hostname.substr(0,window.location.hostname.lastIndexOf("."));return t=-1==i.indexOf(".")?i:i.substr(i.indexOf(".")+1),window.location.port?window.location.protocol+"//"+t+"."+e+":"+window.location.port:window.location.protocol+"//"+t+"."+e},window.preload=function(e){t(e).each(function(){(new Image).src=this})},String.prototype.toProperCase=function(){return this.replace(/\w\S*/g,function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()})},String.prototype.removeWhiteSpaces=function(){return this.replace(/\s/g,"")},Date.prototype.getShortMonthString=function(){var t=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"),e=this.getMonth();return t[e]},Date.prototype.getMonthString=function(){var t=new Array("January","February","March","April","May","June","July","August","September","October","November","December"),e=this.getMonth();return t[e]},window.createCookie=function(t,e,i){if(i){var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3);var s="; expires="+n.toGMTString()}else var s="";document.cookie=t+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;",document.cookie=t+"="+e+s+"; domain=."+window.ENVIRONMENT.SERVER_NAME+"; path=/"},window.readCookie=function(t){for(var e=t+"=",i=document.cookie.split(";"),n=0;n<i.length;n++){for(var s=i[n];" "==s.charAt(0);)s=s.substring(1,s.length);if(0==s.indexOf(e))return s.substring(e.length,s.length)}return null},window.eraseCookie=function(t){createCookie(t,"",-1)},window.popupParams=function(t,e){var i,n,s,o,a,r,l;return i="undefined"!=typeof window.screenX?window.screenX:window.screenLeft,a="undefined"!=typeof window.screenY?window.screenY:window.screenTop,s="undefined"!=typeof window.outerWidth?window.outerWidth:document.documentElement.clientWidth,n="undefined"!=typeof window.outerHeight?window.outerHeight:document.documentElement.clientHeight-22,o=0>i?window.screen.width+i:i,r=parseInt(o+(s-t)/2,10),l=parseInt(a+(n-e)/2.5,10),"width="+t+",height="+e+",left="+r+",top="+l+",scrollbars=1"},window.extractNestedAttributeFragments=function(t){return t.match(/([\w\(\)\-]+)/g)},window.isInteger=function(t){return/^\d+$/.test(t)},"function"!=typeof String.prototype.startsWith&&(String.prototype.startsWith=function(t){return this.slice(0,t.length)===t}),window.isNumeric=function(t){return!isNaN(parseFloat(t))&&isFinite(t)||""==t},"undefined"!=typeof XDate&&("function"!=typeof XDate.prototype.isToday&&(XDate.prototype.isToday=function(){return 0==this.diffDays(XDate.today())}),"function"!=typeof XDate.prototype.isBetween&&(XDate.prototype.isBetween=function(t,e){return this>=t&&e>=this})),document.documentMode&&document.documentMode<9){var e=Array.prototype.splice;Array.prototype.splice=function(){for(var t=[],i=0,n=arguments.length;n>i;i++)t.push(arguments[i]);return 1==t.length&&t.push(this.length-t[0]),e.apply(this,t)}}window.jqXHRError=function(t){return t.status>=500&&t.status<600||0==t.status||401==t.status},t.fn.extend({isChecked:function(){return"checked"===this.attr("checked")},isUnchecked:function(){return"checked"!==this.attr("checked")}})}(jQuery),function(){!function(t){var e,i;return i=function(){var e,i,n,s;return e={spinner:!0,spinnerClass:"ajax-spinner"},s=function(i){return function(n,s,o){var a;return a=t.extend({},e,o),a.spinner?i.find("."+a.spinnerClass).children(".spinner").show().parent().children(":not('.spinner')").hide():void 0}}(this),i=function(i){return function(n,s,o){var a;return a=t.extend({},e,o),a.spinner?i.find("."+a.spinnerClass).children(".spinner").hide().parent().children(":not('.spinner')").show():void 0}}(this),n=function(){return function(t,e,n){return e.status<400?setTimeout(function(){return i(t,e,n)},400):i(t,e,n)}}(this),t(document).on("ajaxSend.ajaxSpinner",s),t(document).on("ajaxComplete.ajaxSpinner",n)},e=function(){return t(document).off(".ajaxSpinner")},t.fn.ajaxSpinner=function(t){return"disable"===t?e.call(this):i.call(this),this}}(jQuery)}.call(this),/*! jQuery UI - v1.11.2 - 2014-11-28
 * http://jqueryui.com
 * Includes: slider.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){/*!
 * jQuery UI Slider 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slider/
 */
t.widget("ui.slider",t.ui.mouse,{version:"1.11.2",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,n=this.options,s=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),o="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",a=[];for(i=n.values&&n.values.length||1,s.length>i&&(s.slice(i).remove(),s=s.slice(0,i)),e=s.length;i>e;e++)a.push(o);this.handles=s.add(t(a.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options,i="";e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=t("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===e.range||"max"===e.range?" ui-slider-range-"+e.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(e){var i,n,s,o,a,r,l,c,h=this,u=this.options;return u.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},n=this._normValueFromMouse(i),s=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(n-h.values(e));(s>i||s===i&&(e===h._lastChangedValue||h.values(e)===u.min))&&(s=i,o=t(this),a=e)}),r=this._start(e,a),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=a,o.addClass("ui-state-active").focus(),l=o.offset(),c=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=c?{left:0,top:0}:{left:e.pageX-l.left-o.width()/2,top:e.pageY-l.top-o.height()/2-(parseInt(o.css("borderTopWidth"),10)||0)-(parseInt(o.css("borderBottomWidth"),10)||0)+(parseInt(o.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,a,n),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,n,s,o;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),n=i/e,n>1&&(n=1),0>n&&(n=0),"vertical"===this.orientation&&(n=1-n),s=this._valueMax()-this._valueMin(),o=this._valueMin()+n*s,this._trimAlignValue(o)},_start:function(t,e){var i={handle:this.handles[e],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("start",t,i)},_slide:function(t,e,i){var n,s,o;this.options.values&&this.options.values.length?(n=this.values(e?0:1),2===this.options.values.length&&this.options.range===!0&&(0===e&&i>n||1===e&&n>i)&&(i=n),i!==this.values(e)&&(s=this.values(),s[e]=i,o=this._trigger("slide",t,{handle:this.handles[e],value:i,values:s}),n=this.values(e?0:1),o!==!1&&this.values(e,i))):i!==this.value()&&(o=this._trigger("slide",t,{handle:this.handles[e],value:i}),o!==!1&&this.value(i))},_stop:function(t,e){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("stop",t,i)},_change:function(t,e){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._lastChangedValue=e,this._trigger("change",t,i)}},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),void this._change(null,0)):this._value()},values:function(e,i){var n,s,o;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),void this._change(null,e);if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(e):this.value();for(n=this.options.values,s=arguments[0],o=0;o<n.length;o+=1)n[o]=this._trimAlignValue(s[o]),this._change(null,o);this._refreshValue()},_setOption:function(e,i){var n,s=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(s=this.options.values.length),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!i),this._super(e,i),e){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),n=0;s>n;n+=1)this._change(null,n);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,n;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),n=0;n<i.length;n+=1)i[n]=this._trimAlignValue(i[n]);return i}return[]},_trimAlignValue:function(t){if(t<=this._valueMin())return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,n=t-i;return 2*Math.abs(i)>=e&&(n+=i>0?e:-e),parseFloat(n.toFixed(5))},_calculateNewMax:function(){var t=(this.options.max-this._valueMin())%this.options.step;this.max=this.options.max-t},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshValue:function(){var e,i,n,s,o,a=this.options.range,r=this.options,l=this,c=this._animateOff?!1:r.animate,h={};this.options.values&&this.options.values.length?this.handles.each(function(n){i=(l.values(n)-l._valueMin())/(l._valueMax()-l._valueMin())*100,h["horizontal"===l.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[c?"animate":"css"](h,r.animate),l.options.range===!0&&("horizontal"===l.orientation?(0===n&&l.range.stop(1,1)[c?"animate":"css"]({left:i+"%"},r.animate),1===n&&l.range[c?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===n&&l.range.stop(1,1)[c?"animate":"css"]({bottom:i+"%"},r.animate),1===n&&l.range[c?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(n=this.value(),s=this._valueMin(),o=this._valueMax(),i=o!==s?(n-s)/(o-s)*100:0,h["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[c?"animate":"css"](h,r.animate),"min"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[c?"animate":"css"]({width:i+"%"},r.animate),"max"===a&&"horizontal"===this.orientation&&this.range[c?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[c?"animate":"css"]({height:i+"%"},r.animate),"max"===a&&"vertical"===this.orientation&&this.range[c?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(e){var i,n,s,o,a=t(e.target).data("ui-slider-handle-index");switch(e.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(e.preventDefault(),!this._keySliding&&(this._keySliding=!0,t(e.target).addClass("ui-state-active"),i=this._start(e,a),i===!1))return}switch(o=this.options.step,n=s=this.options.values&&this.options.values.length?this.values(a):this.value(),e.keyCode){case t.ui.keyCode.HOME:s=this._valueMin();break;case t.ui.keyCode.END:s=this._valueMax();break;case t.ui.keyCode.PAGE_UP:s=this._trimAlignValue(n+(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.PAGE_DOWN:s=this._trimAlignValue(n-(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(n===this._valueMax())return;s=this._trimAlignValue(n+o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(n===this._valueMin())return;s=this._trimAlignValue(n-o)}this._slide(e,a,s)},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),t(e.target).removeClass("ui-state-active"))}}})}),/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
function(t){function e(t,e){if(!(t.originalEvent.touches.length>1)){t.preventDefault();var i=t.originalEvent.changedTouches[0],n=document.createEvent("MouseEvents");n.initMouseEvent(e,!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),t.target.dispatchEvent(n)}}if(t.support.touch="ontouchend"in document,t.support.touch){var i,n=t.ui.mouse.prototype,s=n._mouseInit,o=n._mouseDestroy;n._touchStart=function(t){var n=this;!i&&n._mouseCapture(t.originalEvent.changedTouches[0])&&(i=!0,n._touchMoved=!1,e(t,"mouseover"),e(t,"mousemove"),e(t,"mousedown"))},n._touchMove=function(t){i&&(this._touchMoved=!0,e(t,"mousemove"))},n._touchEnd=function(t){i&&(e(t,"mouseup"),e(t,"mouseout"),this._touchMoved||e(t,"click"),i=!1)},n._mouseInit=function(){var e=this;e.element.bind({touchstart:t.proxy(e,"_touchStart"),touchmove:t.proxy(e,"_touchMove"),touchend:t.proxy(e,"_touchEnd")}),s.call(e)},n._mouseDestroy=function(){var e=this;e.element.unbind({touchstart:t.proxy(e,"_touchStart"),touchmove:t.proxy(e,"_touchMove"),touchend:t.proxy(e,"_touchEnd")}),o.call(e)}}}(jQuery),/*
 jQuery Masked Input Plugin
 Copyright (c) 2007 - 2014 Josh Bush (digitalbush.com)
 Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
 Version: 1.4.0
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){var e,i=navigator.userAgent,n=/iphone/i.test(i),s=/chrome/i.test(i),o=/android/i.test(i);t.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},t.fn.extend({caret:function(t,e){var i;return 0===this.length||this.is(":hidden")?void 0:"number"==typeof t?(e="number"==typeof e?e:t,this.each(function(){this.setSelectionRange?this.setSelectionRange(t,e):this.createTextRange&&(i=this.createTextRange(),i.collapse(!0),i.moveEnd("character",e),i.moveStart("character",t),i.select())})):(this[0].setSelectionRange?(t=this[0].selectionStart,e=this[0].selectionEnd):document.selection&&document.selection.createRange&&(i=document.selection.createRange(),t=0-i.duplicate().moveStart("character",-1e5),e=t+i.text.length),{begin:t,end:e})},unmask:function(){return this.trigger("unmask")},mask:function(i,a){var r,l,c,h,u,d,f,p;if(!i&&this.length>0){r=t(this[0]);var m=r.data(t.mask.dataName);return m?m():void 0}return a=t.extend({autoclear:t.mask.autoclear,placeholder:t.mask.placeholder,completed:null},a),l=t.mask.definitions,c=[],h=f=i.length,u=null,t.each(i.split(""),function(t,e){"?"==e?(f--,h=t):l[e]?(c.push(new RegExp(l[e])),null===u&&(u=c.length-1),h>t&&(d=c.length-1)):c.push(null)}),this.trigger("unmask").each(function(){function r(){if(a.completed){for(var t=u;d>=t;t++)if(c[t]&&D[t]===m(t))return;a.completed.call(T)}}function m(t){return a.placeholder.charAt(t<a.placeholder.length?t:0)}function g(t){for(;++t<f&&!c[t];);return t}function v(t){for(;--t>=0&&!c[t];);return t}function w(t,e){var i,n;if(!(0>t)){for(i=t,n=g(e);f>i;i++)if(c[i]){if(!(f>n&&c[i].test(D[n])))break;D[i]=D[n],D[n]=m(n),n=g(n)}k(),T.caret(Math.max(u,t))}}function b(t){var e,i,n,s;for(e=t,i=m(t);f>e;e++)if(c[e]){if(n=g(e),s=D[e],D[e]=i,!(f>n&&c[n].test(s)))break;i=s}}function y(){var t=T.val(),e=T.caret();if(t.length<p.length){for(E(!0);e.begin>0&&!c[e.begin-1];)e.begin--;if(0===e.begin)for(;e.begin<u&&!c[e.begin];)e.begin++;T.caret(e.begin,e.begin)}else{for(E(!0);e.begin<f&&!c[e.begin];)e.begin++;T.caret(e.begin,e.begin)}r()}function x(){E(),T.val()!=N&&T.change()}function _(t){if(!T.prop("readonly")){var e,i,s,o=t.which||t.keyCode;p=T.val(),8===o||46===o||n&&127===o?(e=T.caret(),i=e.begin,s=e.end,s-i===0&&(i=46!==o?v(i):s=g(i-1),s=46===o?g(s):s),S(i,s),w(i,s-1),t.preventDefault()):13===o?x.call(this,t):27===o&&(T.val(N),T.caret(0,E()),t.preventDefault())}}function C(e){if(!T.prop("readonly")){var i,n,s,a=e.which||e.keyCode,l=T.caret();if(!(e.ctrlKey||e.altKey||e.metaKey||32>a)&&a&&13!==a){if(l.end-l.begin!==0&&(S(l.begin,l.end),w(l.begin,l.end-1)),i=g(l.begin-1),f>i&&(n=String.fromCharCode(a),c[i].test(n))){if(b(i),D[i]=n,k(),s=g(i),o){var h=function(){t.proxy(t.fn.caret,T,s)()};setTimeout(h,0)}else T.caret(s);l.begin<=d&&r()}e.preventDefault()}}}function S(t,e){var i;for(i=t;e>i&&f>i;i++)c[i]&&(D[i]=m(i))}function k(){T.val(D.join(""))}function E(t){var e,i,n,s=T.val(),o=-1;for(e=0,n=0;f>e;e++)if(c[e]){for(D[e]=m(e);n++<s.length;)if(i=s.charAt(n-1),c[e].test(i)){D[e]=i,o=e;break}if(n>s.length){S(e+1,f);break}}else D[e]===s.charAt(n)&&n++,h>e&&(o=e);return t?k():h>o+1?a.autoclear||D.join("")===M?(T.val()&&T.val(""),S(0,f)):k():(k(),T.val(T.val().substring(0,o+1))),h?e:u}var T=t(this),D=t.map(i.split(""),function(t,e){return"?"!=t?l[t]?m(e):t:void 0}),M=D.join(""),N=T.val();T.data(t.mask.dataName,function(){return t.map(D,function(t,e){return c[e]&&t!=m(e)?t:null}).join("")}),T.one("unmask",function(){T.off(".mask").removeData(t.mask.dataName)}).on("focus.mask",function(){if(!T.prop("readonly")){clearTimeout(e);var t;N=T.val(),t=E(),e=setTimeout(function(){k(),t==i.replace("?","").length?T.caret(0,t):T.caret(t)},10)}}).on("blur.mask",x).on("keydown.mask",_).on("keypress.mask",C).on("input.mask paste.mask",function(){T.prop("readonly")||setTimeout(function(){var t=E(!0);T.caret(t),r()},0)}),s&&o&&T.off("input.mask").on("input.mask",y),E()})}})}),function(){!function(t){return t.fn.extend({zenSlider:function(e){var i,n,s,o,a;return o={debug:!1},o=t.extend(o,e),this.keyup(function(e){return e.preventDefault(),38===e.keyCode?(t(this).val(parseInt(t(this).val())+1),t(this).trigger("change")):40===e.keyCode?(t(this).val(parseInt(t(this).val())-1),t(this).trigger("change")):void 0}),a=function(t,e,i){return t.html(e),s(t,i)},s=function(t,e){return e||(e=t.parent()),t.css("top","-"+(10+t.outerHeight())+"px"),t.css("left","-"+(t.outerWidth()-t.parent().outerWidth())/2+"px"),t.css("opacity",1)},n=function(e){var i;return i=t("<div class='tooltip'></div>"),i.on("reposition",function(){return s(i,e)}),a(i,"",e),i},i=function(e){var i,s,r;return s=t("<div class='slider'></div>"),r=n(s),o.slide=function(t,e){return s.find(".hidden-field").val(e.value),o.sliderChanged(e.value,function(t){return a(r,t)})},s.slider(o),s.find(".ui-slider-handle").append(r),o.name&&(i=t("<input type='hidden' class='hidden-field' name='"+o.name+"' value='"+o.value+"'></input>"),s.append(i)),e(s),o.sliderChanged(o.value,function(t){return a(r,t)}),s},this.each(function(){return i(function(e){return function(i){return t(e).append(i)}}(this))})}})}(jQuery)}.call(this),/*
 * jquery-countdown plugin - v0.2
 *
 * Copyright (c) 2009 Martin Conte Mac Donell <Reflejo@gmail.com>
 * Copyright (c) 2011 Peter Farmer <pfarmer@gmail.com>
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */
function(t){var e=function(e){var i,n={stepTime:60,format:"dd:hh:mm:ss",startTime:"01:12:32:55",digitImages:6,digitWidth:53,digitHeight:77,autoStart:!0,timerEnd:function(){},image:"digits.png"},s=[],o=function(t){var e=0,i=0,o=0,r=0;if("object"==typeof n.startTime&&n.startTime.constructor==Date){var l=new Date;n.startTime.getTime()<l.getTime()&&n.startTime.setFullYear(n.startTime.getFullYear()+1);var c=Math.ceil((n.startTime.getTime()-l.getTime())/1e3),h=Math.floor(c/86400),u=Math.floor(c%86400/3600),d=Math.floor(c%86400%3600/60),f=c%86400%3600%60;n.startTime=h+":"+u+":"+d+":"+f}_startTime=n.startTime.split(""),cCounter=0;for(var p=0;p<_startTime.length;p++)isNaN(parseInt(_startTime[p]))&&(cCounter+=1);for(var m=n.startTime.split(":"),p=0;p<m.length;p++){var g=59;3==m.length&&0==p&&(g=23),4==m.length&&(0==p&&(g=9999),1==p&&(g=23)),m[p]>g&&(m[p]=g),m[p].length<2&&(m[p]="0"+m[p])}switch(n.startTime=m.join(":"),cCounter){case 3:n.format=3==n.startTime.split(":")[0].length?"ddd:hh:mm:ss":"dd:hh:mm:ss";break;case 2:n.format="hh:mm:ss";break;case 1:n.format="mm:ss";break;case 0:n.format="ss"}n.startTime=n.startTime.split(""),n.format=n.format.split("");for(var p=0;p<n.startTime.length;p++){if(parseInt(n.startTime[p])>=0){var v=jQuery('<div id="cnt_'+p+'" class="cntDigit" />').css({height:n.digitHeight*n.digitImages*10,"float":"left",background:"url('"+n.image+"')",width:n.digitWidth});switch(s.push(v),a(e,-(parseInt(n.startTime[p])*n.digitHeight*n.digitImages)),s[e].__max=9,n.format[p]){case"h":1>i?(s[e].__max=2,i=1):s[e].__condmax=3;break;case"d":s[e].__max=9;break;case"m":1>o?(s[e].__max=5,o=1):s[e].__condmax=9;break;case"s":1>r?(s[e].__max=5,r=1):s[e].__condmax=9}++e}else v=jQuery('<div class="cntSeparator"/>').css({"float":"left"}).text(n.startTime[p]);t.append("<div>"),t.append(v),t.append("</div>")}},a=function(t,e){return void 0!==e?s[t].css({marginTop:e+"px"}):void 0!==s[t]&&void 0!=s[t].css("marginTop")?parseInt(s[t].css("marginTop").replace("px","")):0},r=function(t){return s[t]._digitInitial=-(s[t].__max*n.digitHeight*n.digitImages),function e(){if(mtop=a(t)+n.digitHeight,mtop==n.digitHeight){if(a(t,s[t]._digitInitial),!(t>0)){clearInterval(i);for(var o=0;o<s.length;o++)a(o,0);return void n.timerEnd()}return r(t-1)(),void(t>0&&void 0!==s[t].__condmax&&s[t-1]._digitInitial==a(t-1)&&a(t,-(s[t].__condmax*n.digitHeight*n.digitImages)))}a(t,mtop),a(t)/n.digitHeight%n.digitImages!=0&&setTimeout(e,n.stepTime),0==mtop&&(s[t].__isma=!0)}},l=function(){void 0==i&&(i=setInterval(r(s.length-1),1e3))},c=function(){i&&(window.clearInterval(i),i=void 0)};this.data("countdown",{start:l,pause:c}),t.extend(n,e),this.css({height:n.digitHeight,overflow:"hidden"}),o(this),n.autoStart&&l()};t.fn.countdown=function(i){if(!this.length)return!1;var n=this.data("countdown");return n&&n[i]?n[i].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof i&&i?void t.error("Method "+i+" does not exist on jQuery.countdown"):e.apply(this,arguments)}}(jQuery),/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
function(t){t.cookie=function(e,i,n){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(i))||null===i||void 0===i)){if(n=t.extend({},n),(null===i||void 0===i)&&(n.expires=-1),"number"==typeof n.expires){var s=n.expires,o=n.expires=new Date;o.setDate(o.getDate()+s)}return i=String(i),document.cookie=[encodeURIComponent(e),"=",n.raw?i:encodeURIComponent(i),n.expires?"; expires="+n.expires.toUTCString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")}n=i||{};for(var a,r=n.raw?function(t){return t}:decodeURIComponent,l=document.cookie.split("; "),c=0;a=l[c]&&l[c].split("=");c++)if(r(a[0])===e)return r(a[1]||"");return null}}(jQuery),function(){!function(t){var e,i,n,s;return i=t.parseJSON,e=t.ajax,s=function(e,i){var s;try{return n(t.stripHijackingBuster(e),i)}catch(o){if(s=o,s instanceof SyntaxError)return!1;throw s}},t.extend(t,{stripHijackingBuster:function(t){return"string"==typeof t&&")]}'"===t.substring(0,4)&&(t=t.substring(4)),t},parseJSON:function(t){return s(t)},ajax:function(i,n){var s;return"object"==typeof i?(n=i,i=void 0):n.url=i,n=n||{},null!=n.dataFilter&&(s=n.dataFilter),n.dataFilter=function(e,i){return"string"==typeof e&&(e=t.stripHijackingBuster(e)),s?s(e,i):e},e(n)}}),n=JSON.parse,JSON.parse=function(t,e){return s(t,e)}}(jQuery)}.call(this),/*
Copyright 2012 Igor Vaynberg

Version: 3.3.2 Timestamp: Mon Mar 25 12:14:18 PDT 2013

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
General Public License version 2 (the "GPL License"). You may choose either license to govern your
use of this software only upon the condition that you accept all of the terms of either the Apache
License or the GPL License.

You may obtain a copy of the Apache License and the GPL License at:

    http://www.apache.org/licenses/LICENSE-2.0
    http://www.gnu.org/licenses/gpl-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the
Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
the specific language governing permissions and limitations under the Apache License and the GPL License.
*/
function(t) {
    "undefined" == typeof t.fn.each2 && t.fn.extend({
        each2: function(e) {
            for (var i = t([0]), n = -1, s = this.length; ++n < s && (i.context = i[0] = this[n]) && e.call(i[0], n, i) !== !1;);
            return this
        }
    })
}(jQuery),
function(t, e) {
    "use strict";

    function i(t, e) {
        for (var i = 0, s = e.length; s > i; i += 1)
            if (n(t, e[i])) return i;
        return -1
    }

    function n(t, i) {
        return t === i ? !0 : t === e || i === e ? !1 : null === t || null === i ? !1 : t.constructor === String ? t + "" == i + "" : i.constructor === String ? i + "" == t + "" : !1
    }

    function s(e, i) {
        var n, s, o;
        if (null === e || e.length < 1) return [];
        for (n = e.split(i), s = 0, o = n.length; o > s; s += 1) n[s] = t.trim(n[s]);
        return n
    }

    function o(t) {
        return t.outerWidth(!1) - t.width()
    }

    function a(i) {
        var n = "keyup-change-value";
        i.bind("keydown", function() {
            t.data(i, n) === e && t.data(i, n, i.val())
        }), i.bind("keyup", function() {
            var s = t.data(i, n);
            s !== e && i.val() !== s && (t.removeData(i, n), i.trigger("keyup-change"))
        })
    }

    function r(i) {
        i.bind("mousemove", function(i) {
            var n = I;
            (n === e || n.x !== i.pageX || n.y !== i.pageY) && t(i.target).trigger("mousemove-filtered", i)
        })
    }

    function l(t, i, n) {
        n = n || e;
        var s;
        return function() {
            var e = arguments;
            window.clearTimeout(s), s = window.setTimeout(function() {
                i.apply(n, e)
            }, t)
        }
    }

    function c(t) {
        var e, i = !1;
        return function() {
            return i === !1 && (e = t(), i = !0), e
        }
    }

    function h(t, e) {
        var n = l(t, function(t) {
            e.trigger("scroll-debounced", t)
        });
        e.bind("scroll", function(t) {
            i(t.target, e.get()) >= 0 && n(t)
        })
    }

    function u(t) {
        t[0] !== document.activeElement && window.setTimeout(function() {
            var e, i = t[0],
                n = t.val().length;
            t.focus(), t.is(":visible") && i === document.activeElement && (i.setSelectionRange ? i.setSelectionRange(n, n) : i.createTextRange && (e = i.createTextRange(), e.collapse(!1), e.select()))
        }, 0)
    }

    function d(t) {
        t.preventDefault(), t.stopPropagation()
    }

    function f(t) {
        t.preventDefault(), t.stopImmediatePropagation()
    }

    function p(e) {
        if (!N) {
            var i = e[0].currentStyle || window.getComputedStyle(e[0], null);
            N = t(document.createElement("div")).css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: i.fontSize,
                fontFamily: i.fontFamily,
                fontStyle: i.fontStyle,
                fontWeight: i.fontWeight,
                letterSpacing: i.letterSpacing,
                textTransform: i.textTransform,
                whiteSpace: "nowrap"
            }), N.attr("class", "select2-sizer"), t("body").append(N)
        }
        return N.text(e.val()), N.width()
    }

    function m(e, i, n) {
        var s, o, a = [];
        s = e.attr("class"), s && (s = "" + s, t(s.split(" ")).each2(function() {
            0 === this.indexOf("select2-") && a.push(this)
        })), s = i.attr("class"), s && (s = "" + s, t(s.split(" ")).each2(function() {
            0 !== this.indexOf("select2-") && (o = n(this), o && a.push(this))
        })), e.attr("class", a.join(" "))
    }

    function g(t, e, i, n) {
        var s = t.toUpperCase().indexOf(e.toUpperCase()),
            o = e.length;
        return 0 > s ? void i.push(n(t)) : (i.push(n(t.substring(0, s))), i.push("<span class='select2-match'>"), i.push(n(t.substring(s, s + o))), i.push("</span>"), void i.push(n(t.substring(s + o, t.length))))
    }

    function v(e) {
        var i, n = 0,
            s = null,
            o = e.quietMillis || 100,
            a = e.url,
            r = this;
        return function(l) {
            window.clearTimeout(i), i = window.setTimeout(function() {
                n += 1;
                var i = n,
                    o = e.data,
                    c = a,
                    h = e.transport || t.ajax,
                    u = e.type || "GET",
                    d = {};
                o = o ? o.call(r, l.term, l.page, l.context) : null, c = "function" == typeof c ? c.call(r, l.term, l.page, l.context) : c, null !== s && s.abort(), e.params && (t.isFunction(e.params) ? t.extend(d, e.params.call(r)) : t.extend(d, e.params)), t.extend(d, {
                    url: c,
                    dataType: e.dataType,
                    data: o,
                    type: u,
                    cache: !1,
                    success: function(t) {
                        if (!(n > i)) {
                            var s = e.results(t, l.page);
                            l.callback(s)
                        }
                    }
                }), s = h.call(r, d)
            }, o)
        }
    }

    function w(e) {
        var i, n, s = e,
            o = function(t) {
                return "" + t.text
            };
        t.isArray(s) && (n = s, s = {
            results: n
        }), t.isFunction(s) === !1 && (n = s, s = function() {
            return n
        });
        var a = s();
        return a.text && (o = a.text, t.isFunction(o) || (i = s.text, o = function(t) {
                return t[i]
            })),
            function(e) {
                var i, n = e.term,
                    a = {
                        results: []
                    };
                return "" === n ? void e.callback(s()) : (i = function(s, a) {
                    var r, l;
                    if (s = s[0], s.children) {
                        r = {};
                        for (l in s) s.hasOwnProperty(l) && (r[l] = s[l]);
                        r.children = [], t(s.children).each2(function(t, e) {
                            i(e, r.children)
                        }), (r.children.length || e.matcher(n, o(r), s)) && a.push(r)
                    } else e.matcher(n, o(s), s) && a.push(s)
                }, t(s().results).each2(function(t, e) {
                    i(e, a.results)
                }), void e.callback(a))
            }
    }

    function b(i) {
        var n = t.isFunction(i);
        return function(s) {
            var o = s.term,
                a = {
                    results: []
                };
            t(n ? i() : i).each(function() {
                var t = this.text !== e,
                    i = t ? this.text : this;
                ("" === o || s.matcher(o, i)) && a.results.push(t ? this : {
                    id: this,
                    text: this
                })
            }), s.callback(a)
        }
    }

    function y(e) {
        if (t.isFunction(e)) return !0;
        if (!e) return !1;
        throw new Error("formatterName must be a function or a falsy value")
    }

    function x(e) {
        return t.isFunction(e) ? e() : e
    }

    function _(e) {
        var i = 0;
        return t.each(e, function(t, e) {
            e.children ? i += _(e.children) : i++
        }), i
    }

    function C(t, i, s, o) {
        var a, r, l, c, h, u = t,
            d = !1;
        if (!o.createSearchChoice || !o.tokenSeparators || o.tokenSeparators.length < 1) return e;
        for (;;) {
            for (r = -1, l = 0, c = o.tokenSeparators.length; c > l && (h = o.tokenSeparators[l], r = t.indexOf(h), !(r >= 0)); l++);
            if (0 > r) break;
            if (a = t.substring(0, r), t = t.substring(r + h.length), a.length > 0 && (a = o.createSearchChoice(a, i), a !== e && null !== a && o.id(a) !== e && null !== o.id(a))) {
                for (d = !1, l = 0, c = i.length; c > l; l++)
                    if (n(o.id(a), o.id(i[l]))) {
                        d = !0;
                        break
                    }
                d || s(a)
            }
        }
        return u !== t ? t : void 0
    }

    function S(e, i) {
        var n = function() {};
        return n.prototype = new e, n.prototype.constructor = n, n.prototype.parent = e.prototype, n.prototype = t.extend(n.prototype, i), n
    }
    if (window.Select2 === e) {
        var k, E, T, D, M, N, I, j;
        k = {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            HOME: 36,
            END: 35,
            BACKSPACE: 8,
            DELETE: 46,
            isArrow: function(t) {
                switch (t = t.which ? t.which : t) {
                    case k.LEFT:
                    case k.RIGHT:
                    case k.UP:
                    case k.DOWN:
                        return !0
                }
                return !1
            },
            isControl: function(t) {
                var e = t.which;
                switch (e) {
                    case k.SHIFT:
                    case k.CTRL:
                    case k.ALT:
                        return !0
                }
                return t.metaKey ? !0 : !1
            },
            isFunctionKey: function(t) {
                return t = t.which ? t.which : t, t >= 112 && 123 >= t
            }
        }, j = t(document), M = function() {
            var t = 1;
            return function() {
                return t++
            }
        }(), j.bind("mousemove", function(t) {
            I = {
                x: t.pageX,
                y: t.pageY
            }
        }), E = S(Object, {
            bind: function(t) {
                var e = this;
                return function() {
                    t.apply(e, arguments)
                }
            },
            init: function(i) {
                var n, s, o = ".select2-results";
                this.opts = i = this.prepareOpts(i), this.id = i.id, i.element.data("select2") !== e && null !== i.element.data("select2") && this.destroy(), this.enabled = !0, this.container = this.createContainer(), this.containerId = "s2id_" + (i.element.attr("id") || "autogen" + M()), this.containerSelector = "#" + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), this.container.attr("id", this.containerId), this.body = c(function() {
                    return i.element.closest("body")
                }), m(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.css(x(i.containerCss)), this.container.addClass(x(i.containerCssClass)), this.elementTabIndex = this.opts.element.attr("tabIndex"), this.opts.element.data("select2", this).addClass("select2-offscreen").bind("focus.select2", function() {
                    t(this).select2("focus")
                }).attr("tabIndex", "-1").before(this.container), this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), this.dropdown.addClass(x(i.dropdownCssClass)), this.dropdown.data("select2", this), this.results = n = this.container.find(o), this.search = s = this.container.find("input.select2-input"), s.attr("tabIndex", this.elementTabIndex), this.resultsPage = 0, this.context = null, this.initContainer(), r(this.results), this.dropdown.delegate(o, "mousemove-filtered touchstart touchmove touchend", this.bind(this.highlightUnderEvent)), h(80, this.results), this.dropdown.delegate(o, "scroll-debounced", this.bind(this.loadMoreIfNeeded)), t.fn.mousewheel && n.mousewheel(function(t, e, i, s) {
                    var o = n.scrollTop();
                    s > 0 && 0 >= o - s ? (n.scrollTop(0), d(t)) : 0 > s && n.get(0).scrollHeight - n.scrollTop() + s <= n.height() && (n.scrollTop(n.get(0).scrollHeight - n.height()), d(t))
                }), a(s), s.bind("keyup-change input paste", this.bind(this.updateResults)), s.bind("focus", function() {
                    s.addClass("select2-focused")
                }), s.bind("blur", function() {
                    s.removeClass("select2-focused")
                }), this.dropdown.delegate(o, "mouseup", this.bind(function(e) {
                    t(e.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(e), this.selectHighlighted(e))
                })), this.dropdown.bind("click mouseup mousedown", function(t) {
                    t.stopPropagation()
                }), t.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), (i.element.is(":disabled") || i.element.is("[readonly='readonly']")) && this.disable()
            },
            destroy: function() {
                var t = this.opts.element.data("select2");
                this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), t !== e && (t.container.remove(), t.dropdown.remove(), t.opts.element.removeClass("select2-offscreen").removeData("select2").unbind(".select2").attr({
                    tabIndex: this.elementTabIndex
                }).show())
            },
            prepareOpts: function(i) {
                var o, a, r, l;
                if (o = i.element, "select" === o.get(0).tagName.toLowerCase() && (this.select = a = i.element), a && t.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function() {
                        if (this in i) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                    }), i = t.extend({}, {
                        populateResults: function(n, s, o) {
                            var a, r = this.opts.id,
                                l = this;
                            (a = function(n, s, c) {
                                var h, u, d, f, p, m, g, v, w, b;
                                for (n = i.sortResults(n, s, o), h = 0, u = n.length; u > h; h += 1) d = n[h], p = d.disabled === !0, f = !p && r(d) !== e, m = d.children && d.children.length > 0, g = t("<li></li>"), g.addClass("select2-results-dept-" + c), g.addClass("select2-result"), g.addClass(f ? "select2-result-selectable" : "select2-result-unselectable"), p && g.addClass("select2-disabled"), m && g.addClass("select2-result-with-children"), g.addClass(l.opts.formatResultCssClass(d)), v = t(document.createElement("div")), v.addClass("select2-result-label"), b = i.formatResult(d, v, o, l.opts.escapeMarkup), b !== e && v.html(b), g.append(v), m && (w = t("<ul></ul>"), w.addClass("select2-result-sub"), a(d.children, w, c + 1), g.append(w)), g.data("select2-data", d), s.append(g)
                            })(s, n, 0)
                        }
                    }, t.fn.select2.defaults, i), "function" != typeof i.id && (r = i.id, i.id = function(t) {
                        return t[r]
                    }), t.isArray(i.element.data("select2Tags"))) {
                    if ("tags" in i) throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + i.element.attr("id");
                    i.tags = i.element.data("select2Tags")
                }
                if (a ? (i.query = this.bind(function(i) {
                        var s, a, r, l = {
                                results: [],
                                more: !1
                            },
                            c = i.term;
                        r = function(t, e) {
                            var s;
                            t.is("option") ? i.matcher(c, t.text(), t) && e.push({
                                id: t.attr("value"),
                                text: t.text(),
                                element: t.get(),
                                css: t.attr("class"),
                                disabled: n(t.attr("disabled"), "disabled")
                            }) : t.is("optgroup") && (s = {
                                text: t.attr("label"),
                                children: [],
                                element: t.get(),
                                css: t.attr("class")
                            }, t.children().each2(function(t, e) {
                                r(e, s.children)
                            }), s.children.length > 0 && e.push(s))
                        }, s = o.children(), this.getPlaceholder() !== e && s.length > 0 && (a = s[0], "" === t(a).text() && (s = s.not(a))), s.each2(function(t, e) {
                            r(e, l.results)
                        }), i.callback(l)
                    }), i.id = function(t) {
                        return t.id
                    }, i.formatResultCssClass = function(t) {
                        return t.css
                    }) : "query" in i || ("ajax" in i ? (l = i.element.data("ajax-url"), l && l.length > 0 && (i.ajax.url = l), i.query = v.call(i.element, i.ajax)) : "data" in i ? i.query = w(i.data) : "tags" in i && (i.query = b(i.tags), i.createSearchChoice === e && (i.createSearchChoice = function(t) {
                        return {
                            id: t,
                            text: t
                        }
                    }), i.initSelection === e && (i.initSelection = function(e, o) {
                        var a = [];
                        t(s(e.val(), i.separator)).each(function() {
                            var e = this,
                                s = this,
                                o = i.tags;
                            t.isFunction(o) && (o = o()), t(o).each(function() {
                                return n(this.id, e) ? (s = this.text, !1) : void 0
                            }), a.push({
                                id: e,
                                text: s
                            })
                        }), o(a)
                    }))), "function" != typeof i.query) throw "query function not defined for Select2 " + i.element.attr("id");
                return i
            },
            monitorSource: function() {
                var t, e = this.opts.element;
                e.bind("change.select2", this.bind(function() {
                    this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                })), t = this.bind(function() {
                    var t, e;
                    t = "disabled" !== this.opts.element.attr("disabled"), e = "readonly" === this.opts.element.attr("readonly"), t = t && !e, this.enabled !== t && (t ? this.enable() : this.disable()), m(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.addClass(x(this.opts.containerCssClass)), m(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(x(this.opts.dropdownCssClass))
                }), e.bind("propertychange.select2 DOMAttrModified.select2", t), "undefined" != typeof WebKitMutationObserver && (this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), this.propertyObserver = new WebKitMutationObserver(function(e) {
                    e.forEach(t)
                }), this.propertyObserver.observe(e.get(0), {
                    attributes: !0,
                    subtree: !1
                }))
            },
            triggerChange: function(e) {
                e = e || {}, e = t.extend({}, e, {
                    type: "change",
                    val: this.val()
                }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(e), this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), this.opts.blurOnChange && this.opts.element.blur()
            },
            enable: function() {
                this.enabled || (this.enabled = !0, this.container.removeClass("select2-container-disabled"), this.opts.element.removeAttr("disabled"))
            },
            disable: function() {
                this.enabled && (this.close(), this.enabled = !1, this.container.addClass("select2-container-disabled"), this.opts.element.attr("disabled", "disabled"))
            },
            opened: function() {
                return this.container.hasClass("select2-dropdown-open")
            },
            positionDropdown: function() {
                var e, i, n, s = this.container.offset(),
                    o = this.container.outerHeight(!1),
                    a = this.container.outerWidth(!1),
                    r = this.dropdown.outerHeight(!1),
                    l = t(window).scrollLeft() + t(window).width(),
                    c = t(window).scrollTop() + t(window).height(),
                    h = s.top + o,
                    u = s.left,
                    d = c >= h + r,
                    f = s.top - r >= this.body().scrollTop(),
                    p = this.dropdown.outerWidth(!1),
                    m = l >= u + p,
                    g = this.dropdown.hasClass("select2-drop-above");
                "static" !== this.body().css("position") && (e = this.body().offset(), h -= e.top, u -= e.left), g ? (i = !0, !f && d && (i = !1)) : (i = !1, !d && f && (i = !0)), m || (u = s.left + a - p), i ? (h = s.top - r, this.container.addClass("select2-drop-above"), this.dropdown.addClass("select2-drop-above")) : (this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")), n = t.extend({
                    top: h,
                    left: u,
                    width: a
                }, x(this.opts.dropdownCss)), this.dropdown.css(n)
            },
            shouldOpen: function() {
                var e;
                return this.opened() ? !1 : (e = t.Event("opening"), this.opts.element.trigger(e), !e.isDefaultPrevented())
            },
            clearDropdownAlignmentPreference: function() {
                this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")
            },
            open: function() {
                return this.shouldOpen() ? (window.setTimeout(this.bind(this.opening), 1), !0) : !1
            },
            opening: function() {
                function e() {
                    return {
                        width: Math.max(document.documentElement.scrollWidth, t(window).width()),
                        height: Math.max(document.documentElement.scrollHeight, t(window).height())
                    }
                }
                var i, n = this.containerId,
                    s = "scroll." + n,
                    o = "resize." + n,
                    a = "orientationchange." + n;
                this.clearDropdownAlignmentPreference(), this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()), this.updateResults(!0), i = t("#select2-drop-mask"), 0 == i.length && (i = t(document.createElement("div")), i.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), i.hide(), i.appendTo(this.body()), i.bind("mousedown touchstart", function() {
                    var e, i = t("#select2-drop");
                    i.length > 0 && (e = i.data("select2"), e.opts.selectOnBlur && e.selectHighlighted({
                        noFocus: !0
                    }), e.close())
                })), this.dropdown.prev()[0] !== i[0] && this.dropdown.before(i), t("#select2-drop").removeAttr("id"), this.dropdown.attr("id", "select2-drop"), i.css(e()), i.show(), this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active"), this.ensureHighlightVisible();
                var r = this;
                this.container.parents().add(window).each(function() {
                    t(this).bind(o + " " + s + " " + a, function() {
                        t("#select2-drop-mask").css(e()), r.positionDropdown()
                    })
                }), this.focusSearch()
            },
            close: function() {
                if (this.opened()) {
                    var e = this.containerId,
                        i = "scroll." + e,
                        n = "resize." + e,
                        s = "orientationchange." + e;
                    this.container.parents().add(window).each(function() {
                        t(this).unbind(i).unbind(n).unbind(s)
                    }), this.clearDropdownAlignmentPreference(), t("#select2-drop-mask").hide(), this.dropdown.removeAttr("id"), this.dropdown.hide(), this.container.removeClass("select2-dropdown-open"), this.results.empty(), this.clearSearch(), this.search.removeClass("select2-active"), this.opts.element.trigger(t.Event("close"))
                }
            },
            clearSearch: function() {},
            getMaximumSelectionSize: function() {
                return x(this.opts.maximumSelectionSize)
            },
            ensureHighlightVisible: function() {
                var e, i, n, s, o, a, r, l = this.results;
                if (i = this.highlight(), !(0 > i)) {
                    if (0 == i) return void l.scrollTop(0);
                    e = this.findHighlightableChoices(), n = t(e[i]), s = n.offset().top + n.outerHeight(!0), i === e.length - 1 && (r = l.find("li.select2-more-results"), r.length > 0 && (s = r.offset().top + r.outerHeight(!0))), o = l.offset().top + l.outerHeight(!0), s > o && l.scrollTop(l.scrollTop() + (s - o)), a = n.offset().top - l.offset().top, 0 > a && "none" != n.css("display") && l.scrollTop(l.scrollTop() + a)
                }
            },
            findHighlightableChoices: function() {
                this.results.find(".select2-result-selectable:not(.select2-selected):not(.select2-disabled)");
                return this.results.find(".select2-result-selectable:not(.select2-selected):not(.select2-disabled)")
            },
            moveHighlight: function(e) {
                for (var i = this.findHighlightableChoices(), n = this.highlight(); n > -1 && n < i.length;) {
                    n += e;
                    var s = t(i[n]);
                    if (s.hasClass("select2-result-selectable") && !s.hasClass("select2-disabled") && !s.hasClass("select2-selected")) {
                        this.highlight(n);
                        break
                    }
                }
            },
            highlight: function(e) {
                var n, s, o = this.findHighlightableChoices();
                return 0 === arguments.length ? i(o.filter(".select2-highlighted")[0], o.get()) : (e >= o.length && (e = o.length - 1), 0 > e && (e = 0), this.results.find(".select2-highlighted").removeClass("select2-highlighted"), n = t(o[e]), n.addClass("select2-highlighted"), this.ensureHighlightVisible(), s = n.data("select2-data"), void(s && this.opts.element.trigger({
                    type: "highlight",
                    val: this.id(s),
                    choice: s
                })))
            },
            countSelectableResults: function() {
                return this.findHighlightableChoices().length
            },
            highlightUnderEvent: function(e) {
                var i = t(e.target).closest(".select2-result-selectable");
                if (i.length > 0 && !i.is(".select2-highlighted")) {
                    var n = this.findHighlightableChoices();
                    this.highlight(n.index(i))
                } else 0 == i.length && this.results.find(".select2-highlighted").removeClass("select2-highlighted")
            },
            loadMoreIfNeeded: function() {
                var t, e = this.results,
                    i = e.find("li.select2-more-results"),
                    n = this.resultsPage + 1,
                    s = this,
                    o = this.search.val(),
                    a = this.context;
                0 !== i.length && (t = i.offset().top - e.offset().top - e.height(), t <= this.opts.loadMorePadding && (i.addClass("select2-active"), this.opts.query({
                    element: this.opts.element,
                    term: o,
                    page: n,
                    context: a,
                    matcher: this.opts.matcher,
                    callback: this.bind(function(t) {
                        s.opened() && (s.opts.populateResults.call(this, e, t.results, {
                            term: o,
                            page: n,
                            context: a
                        }), s.postprocessResults(t, !1, !1), t.more === !0 ? (i.detach().appendTo(e).text(s.opts.formatLoadMore(n + 1)), window.setTimeout(function() {
                            s.loadMoreIfNeeded()
                        }, 10)) : i.remove(), s.positionDropdown(), s.resultsPage = n, s.context = t.context)
                    })
                })))
            },
            tokenize: function() {},
            updateResults: function(i) {
                function s() {
                    c.scrollTop(0), l.removeClass("select2-active"), u.positionDropdown()
                }

                function o(t) {
                    c.html(t), s()
                }
                var a, r, l = this.search,
                    c = this.results,
                    h = this.opts,
                    u = this,
                    d = l.val(),
                    f = t.data(this.container, "select2-last-term");
                if ((i === !0 || !f || !n(d, f)) && (t.data(this.container, "select2-last-term", d), i === !0 || this.showSearchInput !== !1 && this.opened())) {
                    var p = this.getMaximumSelectionSize();
                    if (p >= 1 && (a = this.data(), t.isArray(a) && a.length >= p && y(h.formatSelectionTooBig, "formatSelectionTooBig"))) return void o("<li class='select2-selection-limit'>" + h.formatSelectionTooBig(p) + "</li>");
                    if (l.val().length < h.minimumInputLength) return void o(y(h.formatInputTooShort, "formatInputTooShort") ? "<li class='select2-no-results'>" + h.formatInputTooShort(l.val(), h.minimumInputLength) + "</li>" : "");
                    if (h.maximumInputLength && l.val().length > h.maximumInputLength) return void o(y(h.formatInputTooLong, "formatInputTooLong") ? "<li class='select2-no-results'>" + h.formatInputTooLong(l.val(), h.maximumInputLength) + "</li>" : "");
                    h.formatSearching && 0 === this.findHighlightableChoices().length && o("<li class='select2-searching'>" + h.formatSearching() + "</li>"), l.addClass("select2-active"), r = this.tokenize(), r != e && null != r && l.val(r), this.resultsPage = 1, h.query({
                        element: h.element,
                        term: l.val(),
                        page: this.resultsPage,
                        context: null,
                        matcher: h.matcher,
                        callback: this.bind(function(a) {
                            var r;
                            return this.opened() ? (this.context = a.context === e ? null : a.context, this.opts.createSearchChoice && "" !== l.val() && (r = this.opts.createSearchChoice.call(null, l.val(), a.results), r !== e && null !== r && u.id(r) !== e && null !== u.id(r) && 0 === t(a.results).filter(function() {
                                return n(u.id(this), u.id(r))
                            }).length && a.results.unshift(r)), 0 === a.results.length && y(h.formatNoMatches, "formatNoMatches") ? void o("<li class='select2-no-results'>" + h.formatNoMatches(l.val()) + "</li>") : (c.empty(), u.opts.populateResults.call(this, c, a.results, {
                                term: l.val(),
                                page: this.resultsPage,
                                context: null
                            }), a.more === !0 && y(h.formatLoadMore, "formatLoadMore") && (c.append("<li class='select2-more-results'>" + u.opts.escapeMarkup(h.formatLoadMore(this.resultsPage)) + "</li>"), window.setTimeout(function() {
                                u.loadMoreIfNeeded()
                            }, 10)), this.postprocessResults(a, i), s(), void this.opts.element.trigger({
                                type: "loaded",
                                data: a
                            }))) : void this.search.removeClass("select2-active")
                        })
                    })
                }
            },
            cancel: function() {
                this.close()
            },
            blur: function() {
                this.opts.selectOnBlur && this.selectHighlighted({
                    noFocus: !0
                }), this.close(), this.container.removeClass("select2-container-active"), this.search[0] === document.activeElement && this.search.blur(), this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
            },
            focusSearch: function() {
                u(this.search)
            },
            selectHighlighted: function(t) {
                var e = this.highlight(),
                    i = this.results.find(".select2-highlighted"),
                    n = i.closest(".select2-result").data("select2-data");
                n && (this.highlight(e), this.onSelect(n, t))
            },
            getPlaceholder: function() {
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder
            },
            initContainerWidth: function() {
                function i() {
                    var i, n, s, o, a;
                    if ("off" === this.opts.width) return null;
                    if ("element" === this.opts.width) return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";
                    if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                        if (i = this.opts.element.attr("style"), i !== e)
                            for (n = i.split(";"), o = 0, a = n.length; a > o; o += 1)
                                if (s = n[o].replace(/\s/g, "").match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/), null !== s && s.length >= 1) return s[1];
                        return "resolve" === this.opts.width ? (i = this.opts.element.css("width"), i.indexOf("%") > 0 ? i : 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px") : null
                    }
                    return t.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                }
                var n = i.call(this);
                null !== n && this.container.css("width", n)
            }
        }), T = S(E, {
            createContainer: function() {
                var e = t(document.createElement("div")).attr({
                    "class": "select2-container"
                }).html(["<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>", "   <span></span><abbr class='select2-search-choice-close' style='display:none;'></abbr>", "   <div><b></b></div>", "</a>", "<input class='select2-focusser select2-offscreen' type='text'/>", "<div class='select2-drop' style='display:none'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return e
            },
            disable: function() {
                this.enabled && (this.parent.disable.apply(this, arguments), this.focusser.attr("disabled", "disabled"))
            },
            enable: function() {
                this.enabled || (this.parent.enable.apply(this, arguments), this.focusser.removeAttr("disabled"))
            },
            opening: function() {
                this.parent.opening.apply(this, arguments), this.focusser.attr("disabled", "disabled"), this.opts.element.trigger(t.Event("open"))
            },
            close: function() {
                this.opened() && (this.parent.close.apply(this, arguments), this.focusser.removeAttr("disabled"), u(this.focusser))
            },
            focus: function() {
                this.opened() ? this.close() : (this.focusser.removeAttr("disabled"), this.focusser.focus())
            },
            isFocused: function() {
                return this.container.hasClass("select2-container-active")
            },
            cancel: function() {
                this.parent.cancel.apply(this, arguments), this.focusser.removeAttr("disabled"), this.focusser.focus()
            },
            initContainer: function() {
                var e, i = this.container,
                    n = this.dropdown,
                    s = !1;
                this.showSearch(this.opts.minimumResultsForSearch >= 0), this.selection = e = i.find(".select2-choice"), this.focusser = i.find(".select2-focusser"), this.focusser.attr("id", "s2id_autogen" + M()), t("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.focusser.attr("id")), this.search.bind("keydown", this.bind(function(t) {
                    if (this.enabled) {
                        if (t.which === k.PAGE_UP || t.which === k.PAGE_DOWN) return void d(t);
                        switch (t.which) {
                            case k.UP:
                            case k.DOWN:
                                return this.moveHighlight(t.which === k.UP ? -1 : 1), void d(t);
                            case k.TAB:
                            case k.ENTER:
                                return this.selectHighlighted(), void d(t);
                            case k.ESC:
                                return this.cancel(t), void d(t)
                        }
                    }
                })), this.search.bind("blur", this.bind(function() {
                    document.activeElement === this.body().get(0) && window.setTimeout(this.bind(function() {
                        this.search.focus()
                    }), 0)
                })), this.focusser.bind("keydown", this.bind(function(t) {
                    return !this.enabled || t.which === k.TAB || k.isControl(t) || k.isFunctionKey(t) || t.which === k.ESC ? void 0 : this.opts.openOnEnter === !1 && t.which === k.ENTER ? void d(t) : t.which == k.DOWN || t.which == k.UP || t.which == k.ENTER && this.opts.openOnEnter ? (this.open(), void d(t)) : t.which == k.DELETE || t.which == k.BACKSPACE ? (this.opts.allowClear && this.clear(), void d(t)) : void 0
                })), a(this.focusser), this.focusser.bind("keyup-change input", this.bind(function(t) {
                    this.opened() || (this.open(), this.showSearchInput !== !1 && this.search.val(this.focusser.val()), this.focusser.val(""), d(t))
                })), e.delegate("abbr", "mousedown", this.bind(function(t) {
                    this.enabled && (this.clear(), f(t), this.close(), this.selection.focus())
                })), e.bind("mousedown", this.bind(function(t) {
                    s = !0, this.opened() ? this.close() : this.enabled && this.open(), d(t), s = !1
                })), n.bind("mousedown", this.bind(function() {
                    this.search.focus()
                })), e.bind("focus", this.bind(function(t) {
                    d(t)
                })), this.focusser.bind("focus", this.bind(function() {
                    this.container.addClass("select2-container-active")
                })).bind("blur", this.bind(function() {
                    this.opened() || this.container.removeClass("select2-container-active")
                })), this.search.bind("focus", this.bind(function() {
                    this.container.addClass("select2-container-active")
                })), this.initContainerWidth(), this.setPlaceholder()
            },
            clear: function(t) {
                var e = this.selection.data("select2-data");
                e && (this.opts.element.val(""), this.selection.find("span").empty(), this.selection.removeData("select2-data"), this.setPlaceholder(), t !== !1 && (this.opts.element.trigger({
                    type: "removed",
                    val: this.id(e),
                    choice: e
                }), this.triggerChange({
                    removed: e
                })))
            },
            initSelection: function() {
                if ("" === this.opts.element.val() && "" === this.opts.element.text()) this.close(), this.setPlaceholder();
                else {
                    var t = this;
                    this.opts.initSelection.call(null, this.opts.element, function(i) {
                        i !== e && null !== i && (t.updateSelection(i), t.close(), t.setPlaceholder())
                    })
                }
            },
            prepareOpts: function() {
                var e = this.parent.prepareOpts.apply(this, arguments);
                return "select" === e.element.get(0).tagName.toLowerCase() ? e.initSelection = function(e, i) {
                    var n = e.find(":selected");
                    t.isFunction(i) && i({
                        id: n.attr("value"),
                        text: n.text(),
                        element: n
                    })
                } : "data" in e && (e.initSelection = e.initSelection || function(i, s) {
                    var o = i.val(),
                        a = null;
                    e.query({
                        matcher: function(t, i, s) {
                            var r = n(o, e.id(s));
                            return r && (a = s), r
                        },
                        callback: t.isFunction(s) ? function() {
                            s(a)
                        } : t.noop
                    })
                }), e
            },
            getPlaceholder: function() {
                return this.select && "" !== this.select.find("option").first().text() ? e : this.parent.getPlaceholder.apply(this, arguments)
            },
            setPlaceholder: function() {
                var t = this.getPlaceholder();
                if ("" === this.opts.element.val() && t !== e) {
                    if (this.select && "" !== this.select.find("option:first").text()) return;
                    this.selection.find("span").html(this.opts.escapeMarkup(t)), this.selection.addClass("select2-default"), this.selection.find("abbr").hide()
                }
            },
            postprocessResults: function(t, e, i) {
                var s = 0,
                    o = this,
                    a = !0;
                if (this.findHighlightableChoices().each2(function(t, e) {
                        return n(o.id(e.data("select2-data")), o.opts.element.val()) ? (s = t, !1) : void 0
                    }), i !== !1 && this.highlight(s), e === !0) {
                    var r = this.opts.minimumResultsForSearch;
                    a = 0 > r ? !1 : _(t.results) >= r, this.showSearch(a)
                }
            },
            showSearch: function(e) {
                this.showSearchInput = e, this.dropdown.find(".select2-search")[e ? "removeClass" : "addClass"]("select2-search-hidden"), t(this.dropdown, this.container)[e ? "addClass" : "removeClass"]("select2-with-searchbox")
            },
            onSelect: function(t, e) {
                var i = this.opts.element.val();
                this.opts.element.val(this.id(t)), this.updateSelection(t), this.opts.element.trigger({
                    type: "selected",
                    val: this.id(t),
                    choice: t
                }), this.close(), e && e.noFocus || this.selection.focus(), n(i, this.id(t)) || this.triggerChange()
            },
            updateSelection: function(t) {
                var i, n = this.selection.find("span");
                this.selection.data("select2-data", t), n.empty(), i = this.opts.formatSelection(t, n), i !== e && n.append(this.opts.escapeMarkup(i)), this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== e && this.selection.find("abbr").show()
            },
            val: function() {
                var t, i = !1,
                    n = null,
                    s = this;
                if (0 === arguments.length) return this.opts.element.val();
                if (t = arguments[0], arguments.length > 1 && (i = arguments[1]), this.select) this.select.val(t).find(":selected").each2(function(t, e) {
                    return n = {
                        id: e.attr("value"),
                        text: e.text(),
                        element: e.get(0)
                    }, !1
                }), this.updateSelection(n), this.setPlaceholder(), i && this.triggerChange();
                else {
                    if (this.opts.initSelection === e) throw new Error("cannot call val() if initSelection() is not defined");
                    if (!t && 0 !== t) return this.clear(i), void(i && this.triggerChange());
                    this.opts.element.val(t), this.opts.initSelection(this.opts.element, function(t) {
                        s.opts.element.val(t ? s.id(t) : ""), s.updateSelection(t), s.setPlaceholder(), i && s.triggerChange()
                    })
                }
            },
            clearSearch: function() {
                this.search.val(""), this.focusser.val("")
            },
            data: function(t) {
                var i;
                return 0 === arguments.length ? (i = this.selection.data("select2-data"), i == e && (i = null), i) : void(t && "" !== t ? (this.opts.element.val(t ? this.id(t) : ""), this.updateSelection(t)) : this.clear())
            }
        }), D = S(E, {
            createContainer: function() {
                var e = t(document.createElement("div")).attr({
                    "class": "select2-container select2-container-multi"
                }).html(["    <ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <input type='text' autocomplete='off' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi' style='display:none;'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return e
            },
            prepareOpts: function() {
                var e = this.parent.prepareOpts.apply(this, arguments);
                return "select" === e.element.get(0).tagName.toLowerCase() ? e.initSelection = function(t, e) {
                    var i = [];
                    t.find(":selected").each2(function(t, e) {
                        i.push({
                            id: e.attr("value"),
                            text: e.text(),
                            element: e[0]
                        })
                    }), e(i)
                } : "data" in e && (e.initSelection = e.initSelection || function(i, o) {
                    var a = s(i.val(), e.separator),
                        r = [];
                    e.query({
                        matcher: function(i, s, o) {
                            var l = t.grep(a, function(t) {
                                return n(t, e.id(o))
                            }).length;
                            return l && r.push(o), l
                        },
                        callback: t.isFunction(o) ? function() {
                            o(r)
                        } : t.noop
                    })
                }), e
            },
            initContainer: function() {
                var e, i = ".select2-choices";
                this.searchContainer = this.container.find(".select2-search-field"), this.selection = e = this.container.find(i), this.search.attr("id", "s2id_autogen" + M()), t("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.search.attr("id")), this.search.bind("input paste", this.bind(function() {
                    this.enabled && (this.opened() || this.open())
                })), this.search.bind("keydown", this.bind(function(t) {
                    if (this.enabled) {
                        if (t.which === k.BACKSPACE && "" === this.search.val()) {
                            this.close();
                            var i, n = e.find(".select2-search-choice-focus");
                            if (n.length > 0) return this.unselect(n.first()), this.search.width(10), void d(t);
                            i = e.find(".select2-search-choice:not(.select2-locked)"), i.length > 0 && i.last().addClass("select2-search-choice-focus")
                        } else e.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                        if (this.opened()) switch (t.which) {
                            case k.UP:
                            case k.DOWN:
                                return this.moveHighlight(t.which === k.UP ? -1 : 1), void d(t);
                            case k.ENTER:
                            case k.TAB:
                                return this.selectHighlighted(), void d(t);
                            case k.ESC:
                                return this.cancel(t), void d(t)
                        }
                        if (t.which !== k.TAB && !k.isControl(t) && !k.isFunctionKey(t) && t.which !== k.BACKSPACE && t.which !== k.ESC) {
                            if (t.which === k.ENTER) {
                                if (this.opts.openOnEnter === !1) return;
                                if (t.altKey || t.ctrlKey || t.shiftKey || t.metaKey) return
                            }
                            this.open(), (t.which === k.PAGE_UP || t.which === k.PAGE_DOWN) && d(t), t.which === k.ENTER && d(t)
                        }
                    }
                })), this.search.bind("keyup", this.bind(this.resizeSearch)), this.search.bind("blur", this.bind(function(t) {
                    this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), this.opened() || this.clearSearch(), t.stopImmediatePropagation()
                })), this.container.delegate(i, "mousedown", this.bind(function(e) {
                    this.enabled && (t(e.target).closest(".select2-search-choice").length > 0 || (this.clearPlaceholder(), this.open(), this.focusSearch(), e.preventDefault()))
                })), this.container.delegate(i, "focus", this.bind(function() {
                    this.enabled && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder())
                })), this.initContainerWidth(), this.clearSearch()
            },
            enable: function() {
                this.enabled || (this.parent.enable.apply(this, arguments), this.search.removeAttr("disabled"))
            },
            disable: function() {
                this.enabled && (this.parent.disable.apply(this, arguments), this.search.attr("disabled", !0))
            },
            initSelection: function() {
                if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
                    var t = this;
                    this.opts.initSelection.call(null, this.opts.element, function(i) {
                        i !== e && null !== i && (t.updateSelection(i), t.close(), t.clearSearch())
                    })
                }
            },
            clearSearch: function() {
                var t = this.getPlaceholder();
                t !== e && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(t).addClass("select2-default"), this.search.width(this.getMaxSearchWidth())) : this.search.val("").width(10)
            },
            clearPlaceholder: function() {
                this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default")
            },
            opening: function() {
                this.clearPlaceholder(), this.resizeSearch(), this.parent.opening.apply(this, arguments), this.focusSearch(), this.opts.element.trigger(t.Event("open"))
            },
            close: function() {
                this.opened() && this.parent.close.apply(this, arguments)
            },
            focus: function() {
                this.close(), this.search.focus()
            },
            isFocused: function() {
                return this.search.hasClass("select2-focused")
            },
            updateSelection: function(e) {
                var n = [],
                    s = [],
                    o = this;
                t(e).each(function() {
                    i(o.id(this), n) < 0 && (n.push(o.id(this)), s.push(this))
                }), e = s, this.selection.find(".select2-search-choice").remove(), t(e).each(function() {
                    o.addSelectedChoice(this)
                }), o.postprocessResults()
            },
            tokenize: function() {
                var t = this.search.val();
                t = this.opts.tokenizer(t, this.data(), this.bind(this.onSelect), this.opts), null != t && t != e && (this.search.val(t), t.length > 0 && this.open())
            },
            onSelect: function(t, e) {
                this.addSelectedChoice(t), this.opts.element.trigger({
                    type: "selected",
                    val: this.id(t),
                    choice: t
                }), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(), this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() && this.updateResults(!0), this.positionDropdown()) : (this.close(), this.search.width(10)), this.triggerChange({
                    added: t
                }), e && e.noFocus || this.focusSearch()
            },
            cancel: function() {
                this.close(), this.focusSearch()
            },
            addSelectedChoice: function(i) {
                var n, s = !i.locked,
                    o = t("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"),
                    a = t("<li class='select2-search-choice select2-locked'><div></div></li>"),
                    r = s ? o : a,
                    l = this.id(i),
                    c = this.getVal();
                n = this.opts.formatSelection(i, r.find("div")), n != e && r.find("div").replaceWith("<div>" + this.opts.escapeMarkup(n) + "</div>"), s && r.find(".select2-search-choice-close").bind("mousedown", d).bind("click dblclick", this.bind(function(e) {
                    this.enabled && (t(e.target).closest(".select2-search-choice").fadeOut("fast", this.bind(function() {
                        this.unselect(t(e.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), this.close(), this.focusSearch()
                    })).dequeue(), d(e))
                })).bind("focus", this.bind(function() {
                    this.enabled && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"))
                })), r.data("select2-data", i), r.insertBefore(this.searchContainer), c.push(l), this.setVal(c)
            },
            unselect: function(t) {
                var e, n, s = this.getVal();
                if (t = t.closest(".select2-search-choice"), 0 === t.length) throw "Invalid argument: " + t + ". Must be .select2-search-choice";
                e = t.data("select2-data"), e && (n = i(this.id(e), s), n >= 0 && (s.splice(n, 1), this.setVal(s), this.select && this.postprocessResults()), t.remove(), this.opts.element.trigger({
                    type: "removed",
                    val: this.id(e),
                    choice: e
                }), this.triggerChange({
                    removed: e
                }))
            },
            postprocessResults: function() {
                var t = this.getVal(),
                    e = this.results.find(".select2-result"),
                    n = this.results.find(".select2-result-with-children"),
                    s = this;
                e.each2(function(e, n) {
                    var o = s.id(n.data("select2-data"));
                    i(o, t) >= 0 && (n.addClass("select2-selected"), n.find(".select2-result-selectable").addClass("select2-selected"))
                }), n.each2(function(t, e) {
                    e.is(".select2-result-selectable") || 0 !== e.find(".select2-result-selectable:not(.select2-selected)").length || e.addClass("select2-selected")
                }), -1 == this.highlight() && s.highlight(0)
            },
            getMaxSearchWidth: function() {
                return this.selection.width() - o(this.search)
            },
            resizeSearch: function() {
                var t, e, i, n, s, a = o(this.search);
                t = p(this.search) + 10, e = this.search.offset().left, i = this.selection.width(), n = this.selection.offset().left, s = i - (e - n) - a, t > s && (s = i - a), 40 > s && (s = i - a), 0 >= s && (s = t), this.search.width(s)
            },
            getVal: function() {
                var t;
                return this.select ? (t = this.select.val(), null === t ? [] : t) : (t = this.opts.element.val(), s(t, this.opts.separator))
            },
            setVal: function(e) {
                var n;
                this.select ? this.select.val(e) : (n = [], t(e).each(function() {
                    i(this, n) < 0 && n.push(this)
                }), this.opts.element.val(0 === n.length ? "" : n.join(this.opts.separator)))
            },
            val: function() {
                var i, n = !1,
                    s = this;
                if (0 === arguments.length) return this.getVal();
                if (i = arguments[0], arguments.length > 1 && (n = arguments[1]), !i && 0 !== i) return this.opts.element.val(""), this.updateSelection([]), this.clearSearch(), void(n && this.triggerChange());
                if (this.setVal(i), this.select) this.opts.initSelection(this.select, this.bind(this.updateSelection)), n && this.triggerChange();
                else {
                    if (this.opts.initSelection === e) throw new Error("val() cannot be called if initSelection() is not defined");
                    this.opts.initSelection(this.opts.element, function(e) {
                        var i = t(e).map(s.id);
                        s.setVal(i), s.updateSelection(e), s.clearSearch(), n && s.triggerChange()
                    })
                }
                this.clearSearch()
            },
            onSortStart: function() {
                if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0), this.searchContainer.hide()
            },
            onSortEnd: function() {
                var e = [],
                    i = this;
                this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), this.resizeSearch(), this.selection.find(".select2-search-choice").each(function() {
                    e.push(i.opts.id(t(this).data("select2-data")))
                }), this.setVal(e), this.triggerChange()
            },
            data: function(e) {
                var i, n = this;
                return 0 === arguments.length ? this.selection.find(".select2-search-choice").map(function() {
                    return t(this).data("select2-data")
                }).get() : (e || (e = []), i = t.map(e, function(t) {
                    return n.opts.id(t)
                }), this.setVal(i), this.updateSelection(e), this.clearSearch(), void 0)
            }
        }), t.fn.select2 = function() {
            var n, s, o, a, r = Array.prototype.slice.call(arguments, 0),
                l = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "onSortStart", "onSortEnd", "enable", "disable", "positionDropdown", "data"];
            return this.each(function() {
                if (0 === r.length || "object" == typeof r[0]) n = 0 === r.length ? {} : t.extend({}, r[0]), n.element = t(this), "select" === n.element.get(0).tagName.toLowerCase() ? a = n.element.attr("multiple") : (a = n.multiple || !1, "tags" in n && (n.multiple = a = !0)), s = a ? new D : new T, s.init(n);
                else {
                    if ("string" != typeof r[0]) throw "Invalid arguments to select2 plugin: " + r;
                    if (i(r[0], l) < 0) throw "Unknown method: " + r[0];
                    if (o = e, s = t(this).data("select2"), s === e) return;
                    if (o = "container" === r[0] ? s.container : s[r[0]].apply(s, r.slice(1)), o !== e) return !1
                }
            }), o === e ? this : o
        }, t.fn.select2.defaults = {
            width: "copy",
            loadMorePadding: 0,
            closeOnSelect: !0,
            openOnEnter: !0,
            containerCss: {},
            dropdownCss: {},
            containerCssClass: "",
            dropdownCssClass: "",
            formatResult: function(t, e, i, n) {
                var s = [];
                return g(t.text, i.term, s, n), s.join("")
            },
            formatSelection: function(t) {
                return t ? t.text : e
            },
            sortResults: function(t) {
                return t
            },
            formatResultCssClass: function() {
                return e
            },
            formatNoMatches: function() {
                return "No matches found"
            },
            formatInputTooShort: function(t, e) {
                var i = e - t.length;
                return "Please enter " + i + " more character" + (1 == i ? "" : "s")
            },
            formatInputTooLong: function(t, e) {
                var i = t.length - e;
                return "Please delete " + i + " character" + (1 == i ? "" : "s")
            },
            formatSelectionTooBig: function(t) {
                return "You can only select " + t + " item" + (1 == t ? "" : "s")
            },
            formatLoadMore: function() {
                return "Loading more results..."
            },
            formatSearching: function() {
                return "Searching..."
            },
            minimumResultsForSearch: 0,
            minimumInputLength: 0,
            maximumInputLength: null,
            maximumSelectionSize: 0,
            id: function(t) {
                return t.id
            },
            matcher: function(t, e) {
                return ("" + e).toUpperCase().indexOf(("" + t).toUpperCase()) >= 0
            },
            separator: ",",
            tokenSeparators: [],
            tokenizer: C,
            escapeMarkup: function(t) {
                var e = {
                    "\\": "&#92;",
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&apos;",
                    "/": "&#47;"
                };
                return String(t).replace(/[&<>"'\/\\]/g, function(t) {
                    return e[t[0]]
                })
            },
            blurOnChange: !1,
            selectOnBlur: !1,
            adaptContainerCssClass: function(t) {
                return t
            },
            adaptDropdownCssClass: function() {
                return null
            }
        }, window.Select2 = {
            query: {
                ajax: v,
                local: w,
                tags: b
            },
            util: {
                debounce: l,
                markMatch: g
            },
            "class": {
                "abstract": E,
                single: T,
                multi: D
            }
        }
    }
}(jQuery),
function() {
    var t;
    t = {}, t.ak = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ak-0700a7be141d3bd8b7ba4bdfa87531f7.png", t.al = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/al-71c52862d75dde9e7e45559674d2789d.png", t.ar = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ar-945cc7025c13e8126d24926080aef34e.png", t.az = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/az-a76c61e44499a5e362b3e4fa17f29c98.png", t.ca = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ca-e2ca9a342c9e5ea8757578886cbd8baa.png", t.co = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/co-dd297e8e2801bb395330cf7a4e6c524e.png", t.ct = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ct-36410ab302010898d5e903dc17b949c0.png", t.dc = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/dc-ccc82a8356c462575c6c5ef46d058b16.png", t.de = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/de-1b509f7c100547c61692b3bc6799cd6e.png", t.fl = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/fl-474259cb963864598eea9fdde29c1545.png", t.ga = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ga-3a3dcd17859b6d561e6710c1b8e73f11.png", t.hi = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/hi-a1110c0f128bd7b6fb046265318e95ea.png", t.ia = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ia-7e2428f3b0df9153b453f225cd763902.png", t.id = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/id-4457fb268c0537b5c5a88acffc3ae327.png", t.il = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/il-2bd83197d3979852a9b279fa4d983e7c.png", t["in"] = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/in-9970c4fa98c27df29f22254d95fa4c3d.png", t.ks = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ks-7b9bdacb3a9f9346828579d5f8964847.png", t.ky = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ky-bf7bb1e922041c4d42f8e34f33954937.png", t.la = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/la-6a34cc23a2f5a14c286b39225783e8fc.png", t.ma = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ma-9d9b0d976a4de9dfc9d4c605c345603a.png", t.md = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/md-d990f7358aa574483029c8f36887a078.png", t.me = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/me-4f4a28719cf92bd9accac375287d1478.png", t.mi = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/mi-54e8fd7a3d3df9a81d65904e909bc166.png", t.mn = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/mn-9671869739c0322077bafe99566ad4e5.png", t.mo = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/mo-33194a1b037c49c88c4d122ee1d7c01b.png", t.ms = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ms-8adb35a0f60946a4cda7ec5152d22847.png", t.mt = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/mt-8484c9ac341761b983f5bf56a9185c97.png", t.nc = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/nc-8508755afe8d1ee4752c2622c98c5e50.png", t.nd = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/nd-557faf984c29f84c261d12d505e2e2d6.png", t.ne = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ne-b8e7ba606c16820eb58338bd08fc63c5.png", t.nh = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/nh-1311e5fc9ff30b9f41f4be32fa43dd31.png", t.nj = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/nj-214abd67c9a02e58bca5015fcf76c9c3.png", t.nm = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/nm-089365394f5ae5029b0703645ee133d1.png", t.nv = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/nv-891ca70fd55cc755bfb23993acaf32a4.png", t.ny = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ny-26f2c044b87531546cb080e554d3b936.png", t.oh = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/oh-98eef1fdcce8c625052c72e2fe6536d8.png", t.ok = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ok-3153f87d998a355c6c81cf4bd93cb4b5.png", t.or = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/or-4e1110dece6cf78c1bdd866193c0c665.png", t.pa = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/pa-d9398e4572993dfda93d91f119541170.png", t.ri = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ri-110f992a75bd4d8c61a5907f1793ae4b.png", t.sc = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/sc-dc433a2ca3bb6cfa6e307f04af472b2e.png", t.sd = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/sd-9e7eff8d90a853dab97dc1a06b206c94.png", t.tn = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/tn-b976627b44743d10c51706d3570b97eb.png", t.tx = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/tx-fef7099a436b9f7da06dd38295db2f91.png", t.ut = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/ut-cc3b8256bb15a6c982688555b4531981.png", t.va = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/va-7877307559047a0be01a77aa48f34cc5.png", t.vt = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/vt-c5a059f7a5668e513d49f4eb912a4b5b.png", t.wa = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/wa-98401360279801b00e4f114c02b778b9.png", t.wi = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/wi-46c7a6ad20d27121bab350676be91b3c.png", t.wv = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/wv-9707f93acd8368cb5c750daff73c4b54.png", t.wy = "//d1w32dwlo9psx6.cloudfront.net/assets/flags/wy-224de28af2a4636cc754702459c608e4.png", window.renderSelect2States = function(e) {
        var i, n, s, o, a, r, l;
        for (s = function(e) {
                return e.id ? "<img class='flag' src='" + t[e.id.toLowerCase()] + "'/> " + e.text : e.text
            }, e("select.states").css({
                width: "100%"
            }).select2({
                formatResult: s,
                formatSelection: s,
                escapeMarkup: function(t) {
                    return t
                },
                placeholder: "All Company Locations (states)"
            }), e(".select2-container input.select2-input").removeAttr("tabindex"), n = function(t) {
                return e("#" + t).change(function() {
                    return e(this).val() < 0 ? e(this).val("") : void 0
                })
            }, r = ["company_lead_number_employees", "accountant_lead_number_companies"], l = [], o = 0, a = r.length; a > o; o++) i = r[o], l.push(n(i));
        return l
    }, jQuery(function(t) {
        return renderSelect2States(t)
    })
}.call(this), jQuery(function(t) {
        function e() {
            if (!t.cookie("so"))
                if (t.cookie("refcode")) {
                    var e = t.cookie("refcode");
                    n("so", e)
                } else {
                    var a = document.referrer,
                        r = a.split("/")[2];
                    if (n("lp", i()), o("refcode") || o("utm_source")) {
                        var l = o("refcode") || o("utm_source");
                        n("so", l), s("ca", "utm_campaign"), s("co", "utm_content"), s("mt", "matchtype"), s("kw", "keyword"), s("cr", "creative"), s("xu", "xuid"), s("gc", "gclid"), s("pl", "placement");
                        var c = o("network") ? o("network") : a;
                        n("ne", c)
                    } else if (a) {
                        var h = ["www.google.com", "www.bing.com", "www.ask.com", "r.search.yahoo.com", "search.aol.com"];
                        t.inArray(r, h) > -1 ? (n("so", "SEO"), n("ne", r)) : (n("so", "Inbound Referral"), n("ne", a))
                    } else n("so", "Direct")
                }
        }

        function i() {
            return window.location.pathname
        }

        function n(e, i) {
            t.cookie(e, i.substring(0, 255), {
                expires: a,
                path: "/",
                domain: window.location.hostname
            })
        }

        function s(t, e) {
            var i = o(e);
            i && n(t, i)
        }

        function o(t) {
            var e = "[\\?&]" + t + "=([^&#]*)",
                i = new RegExp(e),
                n = i.exec(window.location.search);
            return null == n ? !1 : (window.location.search.replace(e, ""), decodeURIComponent(n[1].replace(/\+/g, " ")))
        }
        t(function() {
            e()
        });
        var a = 90
    }),
    function() {
        function t() {}

        function e(t) {
            return o.retinaImageSuffix + t
        }

        function i(t, i) {
            if (this.path = t || "", "undefined" != typeof i && null !== i) this.at_2x_path = i, this.perform_check = !1;
            else {
                if (void 0 !== document.createElement) {
                    var n = document.createElement("a");
                    n.href = this.path, n.pathname = n.pathname.replace(a, e), this.at_2x_path = n.href
                } else {
                    var s = this.path.split("?");
                    s[0] = s[0].replace(a, e), this.at_2x_path = s.join("?")
                }
                this.perform_check = !0
            }
        }

        function n(t) {
            this.el = t, this.path = new i(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
            var e = this;
            this.path.check_2x_variant(function(t) {
                t && e.swap()
            })
        }
        var s = "undefined" == typeof exports ? window : exports,
            o = {
                retinaImageSuffix: "@2x",
                check_mime_type: !0,
                force_original_dimensions: !0
            };
        s.Retina = t, t.configure = function(t) {
            null === t && (t = {});
            for (var e in t) t.hasOwnProperty(e) && (o[e] = t[e])
        }, t.init = function(t) {
            null === t && (t = s), t.addEventListener("load", function() {
                var t, e, i = document.getElementsByTagName("img"),
                    s = i.length,
                    o = [];
                for (t = 0; s > t; t += 1) e = i[t], e.getAttributeNode("data-no-retina") || e.src && o.push(new n(e))
            })
        }, t.isRetina = function() {
            var t = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
            return s.devicePixelRatio > 1 ? !0 : s.matchMedia && s.matchMedia(t).matches ? !0 : !1
        };
        var a = /\.[\w\?=]+$/;
        s.RetinaImagePath = i, i.confirmed_paths = [], i.prototype.is_external = function() {
            return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
        }, i.prototype.check_2x_variant = function(t) {
            var e, n = this;
            return this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in i.confirmed_paths ? t(!0) : this.is_external() ? t(!1) : (e = new XMLHttpRequest, e.open("HEAD", this.at_2x_path), e.onreadystatechange = function() {
                if (4 !== e.readyState) return t(!1);
                if (e.status >= 200 && e.status <= 399) {
                    if (o.check_mime_type) {
                        var s = e.getResponseHeader("Content-Type");
                        if (null === s || !s.match(/^image/i)) return t(!1)
                    }
                    return i.confirmed_paths.push(n.at_2x_path), t(!0)
                }
                return t(!1)
            }, e.send(), void 0) : t(!0)
        }, s.RetinaImage = n, n.prototype.swap = function(t) {
            function e() {
                i.el.complete ? (o.force_original_dimensions && (0 == i.el.offsetWidth && 0 == i.el.offsetHeight ? (i.el.setAttribute("width", i.el.naturalWidth), i.el.setAttribute("height", i.el.naturalHeight)) : (i.el.setAttribute("width", i.el.offsetWidth), i.el.setAttribute("height", i.el.offsetHeight))), i.el.setAttribute("src", t)) : setTimeout(e, 5)
            }
            "undefined" == typeof t && (t = this.path.at_2x_path);
            var i = this;
            e()
        }, t.isRetina() && t.init(s)
    }(),
    function() {
        jQuery(function(t) {
            var e, i;
            return e = function() {
                return t("#zp-nav-logo .zp-logo-2c").css("opacity", 1).css("display", "block")
            }, i = function() {
                return t("#corporate-main-nav").hasClass("nav-dark") ? void 0 : t("#zp-nav-logo .zp-logo-2c").css("opacity", 0).css("display", "none")
            }, t("#corporate-main-nav button.navbar-toggle").click(function() {
                return t("#corporate-nav-bar").hasClass("in") && !t("nav#corporate-main-nav.navbar-fixed-top").hasClass("scrolled") ? i() : e()
            }), t(window).bind({
                resize: function() {
                    return t(window).width() >= 768 ? t("#corporate-nav-bar.in").removeClass("in") : void 0
                }
            }), t(window).bind({
                "scroll load resize": function() {
                    var e, i, n, s, o, a, r;
                    return i = .95, n = t("section.first-section").height(), r = .1, o = 2, a = n * r / o, t(window).scrollTop() >= 80 ? (t("nav#corporate-main-nav.navbar-fixed-top").addClass("scrolled"), t(window).scrollTop() > n ? (e = i, s = 0) : (e = i * ((t(window).scrollTop() * o - a) / (n - a)), s = 1 - e / (1.8 * o)), t("nav#corporate-main-nav.navbar-fixed-top").css("background-color", "rgba(255,255,255,0.95)"), t("section.first-section .first-section-content").css("opacity", s), t("nav #zp-nav-logo .zp-logo-2c").css("opacity", 1).css("display", "block")) : (t("nav#corporate-main-nav.navbar-fixed-top").removeClass("scrolled"), t("nav#corporate-main-nav.navbar-fixed-top").css("background-color", "transparent"), t("section.first-section .first-section-content").css("opacity", 1), t("#corporate-nav-bar").hasClass("in") ? void 0 : t("nav #zp-nav-logo .zp-logo-2c").css("display", "none"))
                }
            })
        })
    }.call(this),
    function() {
        jQuery(function(t) {
            return t(document).on("click", "a.anchor-scroll[href^='#']", function(e) {
                var i;
                e.preventDefault(), i = this.hash, t("html, body").animate({
                    scrollTop: t(i).offset().top
                }, 500, function() {
                    window.location.hash = i
                })
            })
        })
    }.call(this),
    function() {
        jQuery(function(t) {
            return t("body").hasClass("landing-page") && t("body.landing-page .landing-intro-resize").length > 0 && t(window).width() > 768 ? t(window).bind({
                "load resize": function() {
                    var e, i;
                    return i = 102, e = Math.min(t(window).height() - i, 1e3), t("body.landing-page .landing-intro-resize").css("min-height", e)
                }
            }) : void 0
        })
    }.call(this),
    function() {
        jQuery(function(t) {
            return t("body").hasClass("landing-page") ? t("input#company_lead_company_name").bind("change keyup input", function() {
                var e;
                return e = t("input#company_lead_company_name").val(), e.length > 1 && (t("#landing-signup-form-full-section-2").slideDown(1e3), window.renderSelect2States(t), window.formatPhoneFields(), t("#corporate-main-nav").hasClass("nav-dark")) ? t("#signup-form h4").removeClass("text-shadow-light").removeClass("text-white") : void 0
            }) : void 0
        })
    }.call(this),
    function() {
        jQuery(function(t) {
            var e, i, n;
            return i = t("input#company_lead_full_name"), e = t("input#company_lead_company_name"), n = t("button#homepage-submit-button"), i.bind("change keyup input", function() {
                var t;
                return t = i.val(), 2 === t.length ? i.trigger("formStarted") : void 0
            }), e.bind("change keyup input", function() {
                var t;
                return t = e.val(), 2 === t.length ? e.trigger("formExpanded") : void 0
            }), n.bind("click", function() {
                return i.val().length > 2 ? n.trigger("formSubmitted") : void 0
            }), i.one("formStarted", function() {
                return analytics.track("Form Started", {
                    category: "Form",
                    label: "Homepage Company Lead Form"
                })
            }), e.one("formExpanded", function() {
                return analytics.track("Form Expanded", {
                    category: "Form",
                    label: "Homepage Company Lead Form"
                })
            }), n.one("formSubmitted", function() {
                return analytics.track("Form Submitted", {
                    category: "Form",
                    label: "Homepage Company Lead Form"
                })
            })
        })
    }.call(this),
    function() {
        jQuery(function() {
            return jQuery("body").on("click", "[data-event-category]", function(t) {
                var e;
                return e = jQuery(t.currentTarget), analytics.track(e.data("event-action"), {
                    category: e.data("event-category"),
                    label: e.data("event-label")
                })
            })
        })
    }.call(this),
    function() {
        jQuery(function(t) {
            return t("#faq-secondary .toggle-link").on("click", function() {
                return t(this).toggleClass("collapsed"), t(".toggle-content").toggle(), t("#pricing.pricing-2col .zen-slider .tooltip").trigger("reposition")
            })
        })
    }.call(this),
    function() {
        jQuery(function(t) {
            var e, i, n, s;
            if (i = 90, e = "zenpayroll.com", n = t("body").data("lead-tag")) {
                if (s = t.cookie("tags"), !s) return t.cookie("tags", n, {
                    expires: i,
                    path: "/",
                    domain: e
                });
                if (s.search(n) < 0) return n = s + "-" + n, t.cookie("tags", n, {
                    expires: i,
                    path: "/",
                    domain: e
                })
            }
        })
    }.call(this),
    function(t) {
        ! function() {
            var t = document.createElement("script");
            t.type = "text/javascript", t.async = !0, t.src = "//cdn.mouseflow.com/projects/eba6e5dc-6ea7-4812-9044-f54a22ae81a0.js", document.getElementsByTagName("head")[0].appendChild(t)
        }(), window.windowWidth = t(window).width(), window.mouseflowPath = document.location.pathname, mouseflowPath += windowWidth <= 480 ? "/xs" : windowWidth <= 768 ? "/sm" : windowWidth <= 992 ? "/md" : "/lg"
    }(jQuery),
    function() {
        jQuery(function(t) {
            var e, i, n, s, o, a, r;
            return t("body").ajaxSpinner(), n = 100, e = 25, s = 5, i = e + s * n, a = function(t) {
                var i;
                return i = {}, t = Math.min(Math.max(t, 0), n), i.baseEmployees = t, i.baseEmployeesCost = i.baseEmployees * s, i.totalCost = e + i.baseEmployeesCost, i
            }, r = function(t) {
                var e, i;
                return e = 100 === t ? "100+" : t, i = 1 === t ? "personne" : "personnes", e + " " + i
            }, window.isOldIE ? t(".zen-slider").css("margin-top", 0) : (t("#pricing.pricing-standard .zen-slider").zenSlider({
                range: "min",
                min: 1,
                value: 1,
                sliderChanged: function(n, s) {
                    var o, l, c, h;
                    // return c = a(n), isNaN(n) ? void 0 : (o = "<div class='tooltip-header'></div>", o += "<div class='tooltip-content'>", o += "<h3>" + r(n) + "</h3>", o += "<ul>", c.totalCost >= i ? (h = t("#zen-slider-contact a").attr("href"), l = "Contact us for enterprise pricing", o += "<li>" + l + "</li>", t("#pricing #total .total-text").html("<p class='text-large'>With <span>over 100 people</span> in your company,<br /><span><a href='" + h + "'>contact us</a></span> for enterprise pricing.</p>")) : (o += "<li>$" + e + " base price</li>", o += "<li>$4/person x " + r(c.baseEmployees) + "</li>", t("#pricing #total .total-text").html("<p class='text-large'>With <span class='text-color'>" + r(n) + "</span> in your company, <br /><span>$" + c.totalCost + " per month</span> for delightful payroll</p>")), o += "</ul>", o += "</div>", s(o))

                    return c = a(n), isNaN(n) ? void 0 : (o = "<div class='tooltip-header'></div>", o += "<div class='tooltip-content'>", o += "<h3>" + r(n) + "</h3>", o += "<ul>", c.totalCost >= i ? (h = t("#zen-slider-contact a").attr("href"), l = "Contact us for enterprise pricing", o += "<li>" + l + "</li>", t("#pricing #total .total-text").html("<p class='text-large'>With <span>over 100 people</span> in your company,<br /><span><a href='" + h + "'>contact us</a></span> for enterprise pricing.</p>")) : (o += "<li>$" + e + " base price</li>", o += "<li>$5/personne x " + r(c.baseEmployees) + "</li>", t("#pricing #total .total-text").html("<p class='text-large'>Avec <span class='text-color'>" + r(n) + "</span> dans votre société, <br /><span>$" + c.totalCost + " par mois</span> pour une paie moderne</p>")), o += "</ul>", o += "</div>", s(o))
                }
            }), t("#pricing.pricing-2col .zen-slider").zenSlider({
                range: "min",
                min: 1,
                value: 1,
                sliderChanged: function(e, n) {
                    var s, o, l, c;
                    return l = a(e), isNaN(e) ? void 0 : (s = "<div class='tooltip-header'></div>", s += "<div class='tooltip-content'>", s += "<h3>" + r(e) + "</h3>", s += "<ul>", l.totalCost >= i ? (c = t("#zen-slider-contact a").attr("href"), o = "Contact us for enterprise pricing", s += "<li>" + o + "</li>", t("#pricing #total .total-text").html("<div class='row'><div class='col-xs-6'><p>" + r(e) + "</p></div><div class='col-xs-6'><p><a href='" + c + "'>Contact us</a> for enterprise pricing</p></div></div>")) : s += "<li class='tooltip-price-total'><span class='total-cost'>$" + l.totalCost + "</span>/ month <span class='tooltip-payroll'>for delightful payroll</span></li>", s += "</ul>", s += "</div>", n(s))
                }
            })), o = function(t, e) {
                return 1 === e.length ? t + " " + e[0] : 2 === e.length ? t + " " + e[0] + " and " + e[1] : o(t + " " + e.pop() + ",", e)
            }, formatPhoneFields()
        })
    }.call(this);
