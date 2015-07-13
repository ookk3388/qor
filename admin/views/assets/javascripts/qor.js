!function(t){"function"==typeof define&&define.amd?define("datepicker",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(t){return"number"==typeof t}function i(t){return"undefined"==typeof t}function n(t,i){var n=[];return e(i)&&n.push(i),n.slice.apply(t,n)}function a(t){return t%4===0&&t%100!==0||t%400===0}function o(t,e){return[31,a(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]}function s(t){var e,i,n=t.match(/[.\/\-\s].*?/)||"/",a=t.split(/\W+/);if(!a||0===a.length)throw new Error("Invalid date format.");for(t={separator:n[0],parts:a},e=a.length,i=0;e>i;i++)switch(a[i]){case"dd":case"d":t.day=!0;break;case"mm":case"m":t.month=!0;break;case"yyyy":case"yy":t.year=!0}return t}function r(t,e){var i,n,a,o,s,r,l;if(i="string"==typeof t&&t?t.split(e.separator):[],n=e.parts.length,t=new Date,a=t.getFullYear(),o=t.getDate(),s=t.getMonth(),i.length===n)for(l=0;n>l;l++)switch(r=parseInt(i[l],10)||1,e.parts[l]){case"dd":case"d":o=r;break;case"mm":case"m":s=r-1;break;case"yy":a=2e3+r;break;case"yyyy":a=r}return new Date(a,s,o,0,0,0,0)}function l(t,e){var i,n={d:t.getDate(),m:t.getMonth()+1,yy:t.getFullYear().toString().substring(2),yyyy:t.getFullYear()},a=[],o=e.parts.length;for(n.dd=(n.d<10?"0":"")+n.d,n.mm=(n.m<10?"0":"")+n.m,i=0;o>i;i++)a.push(n[e.parts[i]]);return a.join(e.separator)}var d=t(window),c=t(document),h=function(e,i){this.$element=t(e),this.options=t.extend({},h.DEFAULTS,t.isPlainObject(i)&&i),this.visible=!1,this.isInput=!1,this.isInline=!1,this.init()};h.prototype={constructor:h,init:function(){var e,i=this.$element,n=this.options;this.$trigger=t(n.trigger||i),this.$picker=e=t(n.template),this.$years=e.find('[data-type="years picker"]'),this.$months=e.find('[data-type="months picker"]'),this.$days=e.find('[data-type="days picker"]'),this.isInput=i.is("input")||i.is("textarea"),this.isInline=n.inline&&(n.container||!this.isInput),this.isInline?(e.find(".datepicker-arrow").hide(),t(n.container||i).append(e)):(t(n.container||"body").append(e),this.place(),e.hide()),n.date&&i.data("date",n.date),this.format=s(n.dateFormat),this.fillWeek(),this.bind(),this.update(),this.isInline&&this.show()},bind:function(){var e=this.$element,i=this.options;this.$picker.on("click",t.proxy(this.click,this)),this.isInline||(this.isInput&&(e.on("keyup",t.proxy(this.update,this)),i.trigger||e.on("focus",t.proxy(this.show,this))),this.$trigger.on("click",t.proxy(this.show,this)))},showView:function(t){var e=this.format;if(e.year||e.month||e.day)switch(t){case 2:case"years":this.$months.hide(),this.$days.hide(),e.year?(this.fillYears(),this.$years.show()):this.showView(0);break;case 1:case"months":this.$years.hide(),this.$days.hide(),e.month?(this.fillMonths(),this.$months.show()):this.showView(2);break;default:this.$years.hide(),this.$months.hide(),e.day?(this.fillDays(),this.$days.show()):this.showView(1)}},hideView:function(){this.options.autoClose&&this.hide()},place:function(){var t=this.$trigger,e=t.offset();this.$picker.css({position:"absolute",top:e.top+t.outerHeight(),left:e.left,zIndex:this.options.zIndex})},show:function(){this.visible||(this.visible=!0,this.$picker.show(),this.isInline||(d.on("resize",t.proxy(this.place,this)),c.on("click",t.proxy(function(t){t.target!==this.$element[0]&&this.hide()},this))),this.showView(this.options.viewStart))},hide:function(){this.visible&&(this.visible=!1,this.$picker.hide(),this.isInline||(d.off("resize",this.place),c.off("click",this.hide)))},update:function(){var t=this.$element,e=t.data("date")||(this.isInput?t.prop("value"):t.text());this.date=e=r(e,this.format),this.viewDate=new Date(e.getFullYear(),e.getMonth(),e.getDate()),this.fillAll()},change:function(){var t=this.$element,e=l(this.date,this.format);this.isInput?t.prop("value",e):this.isInline||t.text(e),t.data("date",e).trigger("change")},getMonthByNumber:function(t,i){var n=this.options,a=i?n.monthsShort:n.months;return a[e(t)?t:this.date.getMonth()]},getDayByNumber:function(t,i,n){var a=this.options,o=n?a.daysMin:i?a.daysShort:a.days;return o[e(t)?t:this.date.getDay()]},getDate:function(t){return t?l(this.date,this.format):new Date(this.date)},template:function(e){var i=this.options,n={text:"",type:"",selected:!1,disabled:!1};return t.extend(n,e),["<"+i.itemTag+" ",n.selected?'class="'+i.selectedClass+'"':n.disabled?'class="'+i.disabledClass+'"':"",n.type?' data-type="'+n.type+'"':"",">",n.text,"</"+i.itemTag+">"].join("")},fillAll:function(){this.fillYears(),this.fillMonths(),this.fillDays()},fillYears:function(){var t,e,i="",n=[],a=this.options.yearSuffix||"",o=this.date.getFullYear(),s=this.viewDate.getFullYear();for(i=s-5+a+" - "+(s+6)+a,e=-5;7>e;e++)t=s+e===o,n.push(this.template({text:s+e,type:t?"year selected":"year",selected:t,disabled:-5===e||6===e}));this.$picker.find('[data-type="years current"]').html(i),this.$picker.find('[data-type="years"]').empty().html(n.join(""))},fillMonths:function(){var t,e,i="",n=[],a=this.options.monthsShort,o=this.date.getFullYear(),s=this.date.getMonth(),r=this.viewDate.getFullYear();for(i=r.toString()+this.options.yearSuffix||"",e=0;12>e;e++)t=r===o&&e===s,n.push(this.template({text:a[e],type:t?"month selected":"month",selected:t}));this.$picker.find('[data-type="year current"]').html(i),this.$picker.find('[data-type="months"]').empty().html(n.join(""))},fillWeek:function(){var e,i=this.options,n=[],a=i.daysMin,o=parseInt(i.weekStart,10)%7;for(a=t.merge(a.slice(o),a.slice(0,o)),e=0;7>e;e++)n.push(this.template({text:a[e]}));this.$picker.find('[data-type="week"]').html(n.join(""))},fillDays:function(){var e,i,n,a,s,r,l="",d=[],c=[],h=[],u=[],p=this.options.monthsShort,f=this.options.yearSuffix||"",m=this.date.getFullYear(),y=this.date.getMonth(),g=this.date.getDate(),v=this.viewDate.getFullYear(),b=this.viewDate.getMonth(),w=parseInt(this.options.weekStart,10)%7;for(l=this.options.showMonthAfterYear?v+f+" "+p[b]:p[b]+" "+v+f,n=0===b?o(v-1,11):o(v,b-1),s=1;n>=s;s++)c.push(this.template({text:s,type:"day prev",disabled:!0}));for(a=new Date(v,b,1,0,0,0,0),r=(7+(a.getDay()-w))%7,r=r>0?r:7,c=c.slice(n-r),n=11===b?o(v+1,0):o(v,b+1),s=1;n>=s;s++)u.push(this.template({text:s,type:"day next",disabled:!0}));for(n=o(v,b),a=new Date(v,b,n,0,0,0,0),r=(7-(a.getDay()+1-w))%7,r=r>=42-(c.length+n)?r:r+7,u=u.slice(0,r),s=1;n>=s;s++)e=v===m&&b===y&&s===g,i=this.options.isDisabled(new Date(v,b,s)),h.push(this.template({text:s,type:i?"day disabled":e?"day selected":"day",selected:e,disabled:i}));t.merge(d,c),t.merge(d,h),t.merge(d,u),this.$picker.find('[data-type="month current"]').html(l),this.$picker.find('[data-type="days"]').empty().html(d.join(""))},click:function(e){var i,n,a,o,s,r=t(e.target),l=/^\d{2,4}$/,d=!1;if(e.stopPropagation(),e.preventDefault(),0!==r.length)switch(i=this.viewDate.getFullYear(),n=this.viewDate.getMonth(),a=this.viewDate.getDate(),s=r.data().type){case"years prev":case"years next":i="years prev"===s?i-10:i+10,o=r.text(),d=l.test(o),d&&(i=parseInt(o,10),this.date=new Date(i,n,Math.min(a,28),0,0,0,0)),this.viewDate=new Date(i,n,Math.min(a,28),0,0,0,0),this.fillYears(),d&&(this.showView(1),this.change());break;case"year prev":case"year next":i="year prev"===s?i-1:i+1,this.viewDate=new Date(i,n,Math.min(a,28),0,0,0,0),this.fillMonths();break;case"year current":this.format.year&&this.showView(2);break;case"year selected":this.format.month?this.showView(1):this.hideView();break;case"year":i=parseInt(r.text(),10),this.date=new Date(i,n,Math.min(a,28),0,0,0,0),this.viewDate=new Date(i,n,Math.min(a,28),0,0,0,0),this.format.month?this.showView(1):this.hideView(),this.change();break;case"month prev":case"month next":n="month prev"===s?n-1:"month next"===s?n+1:n,this.viewDate=new Date(i,n,Math.min(a,28),0,0,0,0),this.fillDays();break;case"month current":this.format.month&&this.showView(1);break;case"month selected":this.format.day?this.showView(0):this.hideView();break;case"month":n=r.parent().children().index(r),this.date=new Date(i,n,Math.min(a,28),0,0,0,0),this.viewDate=new Date(i,n,Math.min(a,28),0,0,0,0),this.format.day?this.showView(0):this.hideView(),this.change();break;case"day prev":case"day next":case"day":n="day prev"===s?n-1:"day next"===s?n+1:n,a=parseInt(r.text(),10),this.date=new Date(i,n,a,0,0,0,0),this.viewDate=new Date(i,n,a,0,0,0,0),this.fillDays(),"day"===s&&this.hideView(),this.change();break;case"day selected":this.hideView(),this.change();break;case"day disabled":this.hideView()}}},h.DEFAULTS={date:!1,dateFormat:"mm/dd/yyyy",disabledClass:"disabled",selectedClass:"selected",autoClose:!1,inline:!1,trigger:!1,container:!1,showMonthAfterYear:!1,zIndex:1,viewStart:0,weekStart:0,yearSuffix:"",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],itemTag:"li",template:'<div class="datepicker-container" data-type="datepicker"><div class="datepicker-arrow"></div><div class="datepicker-content"><div class="content-years" data-type="years picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="years prev">&lsaquo;</li><li class="col-5" data-type="years current"></li><li class="datepicker-next" data-type="years next">&rsaquo;</li></ul><ul class="datepicker-years" data-type="years"></ul></div><div class="content-months" data-type="months picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="year prev">&lsaquo;</li><li class="col-5" data-type="year current"></li><li class="datepicker-next" data-type="year next">&rsaquo;</li></ul><ul class="datepicker-months" data-type="months"></ul></div><div class="content-days" data-type="days picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="month prev">&lsaquo;</li><li class="col-5" data-type="month current"></li><li class="datepicker-next" data-type="month next">&rsaquo;</li></ul><ul class="datepicker-week" data-type="week"></ul><ul class="datepicker-days" data-type="days"></ul></div></div></div>',isDisabled:function(){return!1}},h.setDefaults=function(e){t.extend(h.DEFAULTS,e)},h.other=t.fn.datepicker,t.fn.datepicker=function(e){var a,o=n(arguments,1);return this.each(function(){var i,n=t(this),s=n.data("datepicker");s||n.data("datepicker",s=new h(this,e)),"string"==typeof e&&t.isFunction(i=s[e])&&(a=i.apply(s,o))}),i(a)?this:a},t.fn.datepicker.Constructor=h,t.fn.datepicker.setDefaults=h.setDefaults,t.fn.datepicker.noConflict=function(){return t.fn.datepicker=h.other,this}}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e="qor.alert",i="click."+e;t(function(){t(document).on(i,'[data-dismiss="alert"]',function(){t(this).closest(".qor-alert").remove()}),setTimeout(function(){t('.qor-alert[data-dismissible="true"]').remove()},3e3)})}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(t){return"string"==typeof t&&(t=t.charAt(0).toUpperCase()+t.substr(1)),t}function i(e){var i,n={};if(t.isPlainObject(e))for(i in e)e.hasOwnProperty(i)&&(n[String(i).toLowerCase()]=e[i]);return n}function n(i){var n,a={};if(t.isPlainObject(i))for(n in i)i.hasOwnProperty(n)&&(a[e(n)]=i[n]);return a}function a(i,n){var a=String(n),o=a.toLowerCase(),s=a.toUpperCase(),r=e(a);return t.isPlainObject(i)?i[o]||i[r]||i[s]:void 0}var o=window.URL||window.webkitURL,s="qor.cropper",r="change."+s,l="click."+s,d="shown.bs.modal",c="hidden.bs.modal",h=/x|y|width|height/,u=function(e,i){this.$element=t(e),this.options=t.extend(!0,{},u.DEFAULTS,i),this.data=null,this.init()};return u.prototype={constructor:u,init:function(){var e,i,n=this.$element,a=this.options,o=n.closest(a.parent);o.length||(o=n.parent()),this.$parent=o,this.$output=e=o.find(a.output),this.$list=o.find(a.list),this.$modal=o.find(a.modal);try{i=JSON.parse(t.trim(e.val()))}catch(s){}this.data=t.extend(i||{},a.data),this.build(),this.bind()},build:function(){var t,e=this.$list;e.find("li").append(u.TOGGLE),t=e.find("img"),t.wrap(u.CANVAS),this.center(t)},bind:function(){this.$element.on(r,t.proxy(this.read,this)),this.$list.on(l,t.proxy(this.click,this)),this.$modal.on(d,t.proxy(this.start,this)).on(c,t.proxy(this.stop,this))},unbind:function(){this.$element.off(r,this.read),this.$list.off(l,this.click),this.$modal.off(d,this.start).on(c,this.stop)},click:function(e){var i,n=e.target;e.target!==this.$list[0]&&(i=t(n),i.is("img")||(i=i.closest("li").find("img")),this.$target=i,this.$modal.modal("show"))},read:function(){var t,e=this.$element.prop("files");e&&e.length&&(t=e[0],this.data[this.options.key]={},this.$output.val(JSON.stringify(this.data)),/^image\/\w+$/.test(t.type)&&o?this.load(o.createObjectURL(t)):this.$list.empty().text(t.name))},load:function(t){var e,i=this.$list;i.find("ul").length||(i.html(u.TEMPLATE),this.build()),e=i.find("img"),e.attr("src",t).data("originalUrl",t),this.center(e,!0)},start:function(){var e=this.options,o=this.$modal,s=this.$target,r=s.data(),l=r.sizeName||"original",d=r.sizeResolution,c=t("<img>").attr("src",r.originalUrl),u=d?a(d,"width")/a(d,"height"):0/0,p=this.data,f=this;p[e.key]||(p[e.key]={}),o.find(".modal-body").html(c),c.cropper({aspectRatio:u,data:i(p[e.key][l]),background:!1,zoomable:!1,rotatable:!1,checkImageOrigin:!1,built:function(){o.find(e.save).one("click",function(){var i,a={};t.each(c.cropper("getData"),function(t,e){h.test(t)&&(a[t]=Math.round(e))}),p[e.key][l]=n(a),f.imageData=c.cropper("getImageData"),f.cropData=a;try{i=c.cropper("getCroppedCanvas").toDataURL()}catch(s){}f.output(i),o.modal("hide")})}})},stop:function(){this.$modal.find(".modal-body > img").cropper("destroy").remove()},output:function(t){var e=this.$target;t?this.center(e.attr("src",t)):this.preview(e),this.autoCrop(t),this.$output.val(JSON.stringify(this.data))},preview:function(e){var i,n=e.parent(),a=n.parent(),o=Math.max(a.width(),160),s=Math.max(a.height(),160),r=this.imageData,l=t.extend({},this.cropData),d=l.width/l.height,c=o,h=s;s*d>o?h=c/d:c=h*d,i=l.width/c,t.each(l,function(t,e){l[t]=e/i}),n.css({width:l.width,height:l.height}),e.css({width:r.naturalWidth/i,height:r.naturalHeight/i,maxWidth:"none",maxHeight:"none",marginLeft:-l.x,marginTop:-l.y}),this.center(e)},center:function(e,i){e.each(function(){var e=t(this),n=e.parent(),a=n.parent(),o=function(){var t=a.height(),e=n.height(),i="auto";t>e&&(i=(t-e)/2),n.css("margin-top",i)};i&&n.removeAttr("style"),this.complete?o.call(this):this.onload=o})},autoCrop:function(e){var i=t.extend({},this.cropData),o=i.width/i.height,s=this.data[this.options.key],r=this;this.$list.find("img").not(this.$target).each(function(){var l=t(this),d=l.data(),c=d.sizeName,h=d.sizeResolution,u=h?a(h,"width")/a(h,"height"):0/0;c&&u&&u===o&&!s[c]&&(s[c]=n(i),e?r.center(l.attr("src",e)):r.preview(l))})},destroy:function(){this.unbind(),this.$element.removeData(s)}},u.DEFAULTS={parent:!1,output:!1,list:!1,modal:".qor-cropper-modal",save:".qor-cropper-save",key:"data",data:null},u.TOGGLE='<div class="qor-cropper-toggle"></div>',u.CANVAS='<div class="qor-cropper-canvas"></div>',u.TEMPLATE="<ul><li><img></li></ul>",u.plugin=function(e){return this.each(function(){var i,n=t(this),a=n.data(s);if(!a){if(!t.fn.cropper)return;n.data(s,a=new u(this,e))}"string"==typeof e&&t.isFunction(i=a[e])&&i.apply(a)})},t(function(){var e=".qor-file-input",i={parent:".form-group",output:".qor-file-options",list:".qor-file-list",key:"CropOptions",data:{Crop:!0}};t(document).on("click.qor.cropper.initiator",e,function(){u.plugin.call(t(this),i)}).on("renew.qor.initiator",function(n){var a=t(e,n.target);a.length&&u.plugin.call(a,i)}).triggerHandler("renew.qor.initiator")}),u}),function(t){"function"==typeof define&&define.amd?define("qor-datepicker",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=function(i,n){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,n),this.date=null,this.formatDate=null,this.built=!1,this.init()};return e.prototype={init:function(){t.fn.datepicker&&(this.$element.on("click",t.proxy(this.show,this)),this.options.show&&this.show())},build:function(){var i,n,a,o,s,r=this;this.built||(this.$modal=i=t(e.TEMPLATE).appendTo("body"),n=i.find(".qor-datepicker-year"),a=i.find(".qor-datepicker-month"),o=i.find(".qor-datepicker-week"),s=i.find(".qor-datepicker-day"),i.find(".qor-datepicker-embedded").on("change",function(){var e,i=t(this);r.date=e=i.datepicker("getDate"),r.formatDate=i.datepicker("getDate",!0),n.text(e.getFullYear()),a.text(String(i.datepicker("getMonthByNumber",e.getMonth(),!0)).toUpperCase()),o.text(i.datepicker("getDayByNumber",e.getDay())),s.text(e.getDate())}).datepicker({date:this.$element.val(),dateFormat:"yyyy-mm-dd",inline:!0}).triggerHandler("change"),i.find(".qor-datepicker-save").on("click",t.proxy(this.pick,this)),this.built=!0)},show:function(){this.built||this.build(),this.$modal.modal("show")},pick:function(){this.$element.val(this.formatDate),this.$modal.modal("hide")}},e.DEFAULTS={show:!0},e.TEMPLATE='<div class="modal fade qor-datepicker-modal" id="qorDatepickerModal" tabindex="-1" role="dialog" aria-labelledby="qorDatepickerModalLabel" aria-hidden="true"><div class="modal-dialog qor-datepicker"><div class="modal-content"><div class="modal-header sr-only"><h5 class="modal-title" id="qorDatepickerModalLabel">Pick a date</h5></div><div class="modal-body"><div class="qor-datepicker-picked"><div class="qor-datepicker-week"></div><div class="qor-datepicker-month"></div><div class="qor-datepicker-day"></div><div class="qor-datepicker-year"></div></div><div class="qor-datepicker-embedded"></div></div><div class="modal-footer"><button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-link qor-datepicker-save">OK</button></div></div></div></div>',e.plugin=function(i){var n,a=[].slice.call(arguments,1);return this.each(function(){var o,s=t(this),r=s.data("qor.datepicker");r?i="show":s.data("qor.datepicker",r=new e(this,i)),"string"==typeof i&&t.isFunction(o=r[i])&&(n=o.apply(r,a))}),"undefined"==typeof n?this:n},t(function(){t.fn.datepicker&&(t(document).on("click.qor.datepicker.initiator",'[data-toggle="qor.datepicker"]',function(){var i=t(this);e.plugin.call(i,i.data())}),t(document).on("click.datepicker.initiator",'[data-toggle="datepicker"]',function(){var e=t(this);e.data("datepicker")||e.datepicker({autoClose:!0}),e.datepicker("show")}))}),e}),function(t){"function"==typeof define&&define.amd?define("qor-filter",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(e,a){var o,s=n.search;return t.isArray(e)&&(o=i(s),t.each(e,function(e,i){e=t.inArray(i,o),-1===e?o.push(i):a&&o.splice(e,1)}),s="?"+o.join("&")),s}function i(e){var i=[];return e&&e.indexOf("?")>-1&&(e=e.split("?")[1],e&&e.indexOf("#")>-1&&(e=e.split("#")[0]),e&&(i=t.map(e.split("&"),function(e){var i,n=[];return e=e.split("="),i=e[1],n.push(e[0]),i&&(i=t.trim(decodeURIComponent(i)),i&&n.push(i)),n.join("=")}))),i}var n=window.location,a="qor.filter",o="click."+a,s="change."+a,r=function(e,i){this.$element=t(e),this.options=t.extend({},r.DEFAULTS,i),this.init()};return r.prototype={constructor:r,init:function(){this.parse(),this.bind()},bind:function(){var e=this.options;this.$element.on(o,e.label,t.proxy(this.toggle,this)).on(s,e.group,t.proxy(this.toggle,this))},unbind:function(){this.$element.off(o,this.toggle).off(s,this.toggle)},parse:function(){var e=this.options,a=this.$element,o=i(n.search);a.find(e.label).each(function(){var e=t(this);t.each(i(e.attr("href")),function(i,n){var a=t.inArray(n,o)>-1;return e.toggleClass("active",a),a?!1:void 0})}),a.find(e.group).each(function(){var e=t(this),i=e.attr("name");e.find("option").each(function(){var e=t(this),n=[i,e.prop("value")].join("=");return t.inArray(n,o)>-1?(e.attr("selected",!0),!1):void 0})})},toggle:function(a){var o,s,r,l,d,c,h,u=t(a.currentTarget),p={};u.is("select")?(o=i(n.search),l=u.attr("name"),d=u.val(),s=[l],d&&s.push(d),s=s.join("="),p=[s],u.find("option").each(function(){var e=t(this),i=[l],n=t.trim(e.prop("value"));return n&&i.push(n),i=i.join("="),c=t.inArray(i,o),c>-1?(h=i,!1):void 0}),h?(p.push(h),r=e(p,!0)):r=e(p)):u.is("a")&&(a.preventDefault(),p=i(u.attr("href")),r=u.hasClass("active")?e(p,!0):e(p)),n.search=r},destroy:function(){this.unbind(),this.$element.removeData(a)}},r.DEFAULTS={label:!1,group:!1},r.plugin=function(e){return this.each(function(){var i=t(this);i.data(a)||i.data(a,new r(this,e))})},t(function(){t(document).on("renew.qor.initiator",function(e){var i=t(".qor-label-container",e.target);i.length&&r.plugin.call(i,{label:".qor-label",group:".qor-label-group"})}).triggerHandler("renew.qor.initiator")}),r}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(i,n){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,t.isPlainObject(n)&&n),this.init()}var i=t(window),n="qor.fixer",a="scroll."+n;e.prototype={constructor:e,init:function(){var t=this.$element,e=t.parent();t.is(":hidden")||t.find("tbody:visible > tr:visible").length<=1||("static"===e.css("position")&&e.css("position","relative"),this.maxTop=t.outerHeight()-t.find("thead").height()-t.find("tbody:last > tr:last").height()-t.find("tfoot").height(),this.clone(),this.place(),this.bind())},clone:function(){var e=this.$element,i=e.clone(),n=i.find("thead > tr > th");e.find("thead > tr > th").each(function(e){n.eq(e).prepend(t("<div>").css({height:0,width:t(this).width(),overflow:"hidden"}))}),i.find("tbody, tfoot").remove(),i.css({position:"absolute",top:0,left:0,width:e.outerWidth()}),this.$clone=i.insertAfter(e)},bind:function(){var t=this;i.on(a,this._place=function(){t.place()})},unbind:function(){i.off(a,this._place)},place:function(){var t=i.scrollTop()-this.$element.offset().top,e=this.maxTop;t=0>t?0:t>e?e:t,this.$clone.css("top",t)},destroy:function(){this.unbind(),this.$clone.remove(),this.$element.removeData(n)}},e.DEFAULTS={},e.plugin=function(i){return this.each(function(){var a,o=t(this),s=o.data(n);s||o.data(n,s=new e(this,i)),"string"==typeof i&&t.isFunction(a=s[i])&&a.call(s,i)})},t(function(){e.plugin.call(t(".qor-list"))})}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(e){var i=[];return t.isPlainObject(e)&&t.each(e,function(){i.push(arguments[1])}),i.join()}function i(t){var e=t&&t.split(",");return t=null,e&&4===e.length&&(t={x:Number(e[0]),y:Number(e[1]),width:Number(e[2]),height:Number(e[3])}),t}function n(t){return"string"==typeof t&&(t=t.charAt(0).toUpperCase()+t.substr(1)),t}function a(e){var i,a={};if(t.isPlainObject(e))for(i in e)e.hasOwnProperty(i)&&(a[n(i)]=e[i]);return a}var o="qor.redactor",s="click."+o,r="focus."+o,l="blur."+o,d="imageupload."+o,c="imagedelete."+o,h=/x|y|width|height/,u=function(e,i){this.$element=t(e),this.options=t.extend(!0,{},u.DEFAULTS,i),this.init()};return u.prototype={constructor:u,init:function(){var e=this,i=this.$element,n=this.options,a=i.closest(n.parent),o=t.proxy(this.click,this);a.length||(a=i.parent()),this.$button=t(u.BUTTON),this.$modal=a.find(n.modal),i.on(d,function(e,i){t(i).on(s,o)}).on(c,function(e,i){t(i).off(s,o)}).on(r,function(){a.find("img").off(s,o).on(s,o)}).on(l,function(){a.find("img").off(s,o)}),t("body").on(s,function(){e.$button.off(s).detach()})},click:function(e){var i=this,n=t(e.target);e.stopPropagation(),setTimeout(function(){i.$button.insertBefore(n).off(s).one(s,function(){i.crop(n)})},1)},crop:function(n){var o=this.options,s=n.attr("src"),r=s,l=t("<img>"),d=this.$modal;t.isFunction(o.replace)&&(r=o.replace(r)),l.attr("src",r),d.one("shown.bs.modal",function(){l.cropper({data:i(n.attr("data-crop-options")),background:!1,zoomable:!1,rotatable:!1,checkImageOrigin:!1,built:function(){d.find(o.save).one("click",function(){var i={};t.each(l.cropper("getData"),function(t,e){h.test(t)&&(i[t]=Math.round(e))}),t.ajax(o.remote,{type:"POST",contentType:"application/json",data:JSON.stringify({Url:s,CropOptions:{original:a(i)},Crop:!0}),dataType:"json",success:function(a){t.isPlainObject(a)&&a.url&&(n.attr("src",a.url).attr("data-crop-options",e(i)).removeAttr("style").removeAttr("rel"),t.isFunction(o.complete)&&o.complete(),d.modal("hide"))}})})}})}).one("hidden.bs.modal",function(){l.cropper("destroy").remove()}).modal("show").find(".modal-body").append(l)}},u.DEFAULTS={remote:!1,toggle:!1,parent:!1,modal:".qor-cropper-modal",save:".qor-cropper-save",replace:null,complete:null},u.BUTTON='<span class="redactor-image-cropper">Crop</span>',u.plugin=function(){return this.each(function(){var e,i=t(this);if(!i.data(o)){if(!t.fn.redactor)return;i.data(o,!0),e=i.data(),i.redactor({imageUpload:e.uploadUrl,fileUpload:e.uploadUrl,initCallback:function(){i.data(o,new u(i,{remote:e.cropUrl,toggle:".redactor-image-cropper",parent:".form-group",replace:function(t){return t.replace(/\.\w+$/,function(t){return".original"+t})},complete:t.proxy(function(){this.code.sync()},this)}))},focusCallback:function(){i.triggerHandler(r)},blurCallback:function(){i.triggerHandler(l)},imageUploadCallback:function(){i.triggerHandler(d,arguments[0])},imageDeleteCallback:function(){i.triggerHandler(c,arguments[1])}})}})},t(function(){t(document).on("renew.qor.initiator",function(e){var i=t(".qor-textarea",e.target);i.length&&u.plugin.call(i)}).triggerHandler("renew.qor.initiator")}),u}),function(t){"function"==typeof define&&define.amd?define("qor-replicator",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=function(i,n){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,n),this.index=0,this.init()};return e.prototype={constructor:e,init:function(){var t,e=this.$element,i=this.options,n=e.find(i.itemClass);n.length&&(t=n.filter(i.newClass),t.length||(t=n.last()),this.$template=t,this.template=t.clone().removeClass("hide").prop("outerHTML"),this.parse(),this.bind())},parse:function(){var t=0;this.template=this.template.replace(/(\w+)\="(\S*\[\d+\]\S*)"/g,function(e,i,n){return n=n.replace(/^(\S*)\[(\d+)\]([^\[\]]*)$/,function(e,a,o,s){return e===n?("name"===i&&(t=o),a+"[{{index}}]"+s):void 0}),i+'="'+n+'"'}),this.index=parseFloat(t)},bind:function(){var e=this.$element,i=this.options;e.on("click",i.addClass,t.proxy(this.add,this)),e.on("click",i.delClass,t.proxy(this.del,this))},add:function(e){var i,n=this.$template;return n.hasClass("hide")?void n.removeClass("hide"):(i=t(e.target).closest(this.options.addClass),void(i.length&&i.before(this.template.replace(/\{\{index\}\}/g,++this.index))))},del:function(e){var i,n=this.options,a=t(e.target).closest(n.itemClass);a.is(n.newClass)?a.remove():(a.children(":visible").addClass("hidden").hide(),i=t(n.alertTemplate.replace("{{name}}",this.parseName(a))),i.find(n.undoClass).one("click",function(){i.remove(),a.children(".hidden").removeClass("hidden").show()}),a.append(i))},parseName:function(t){var e=t.find("input[name]").attr("name");return e?e.replace(/[^\[\]]+$/,""):void 0}},e.DEFAULTS={itemClass:"",newClass:"",addClass:"",delClass:"",alertTemplate:""},e.plugin=function(i){return this.each(function(){var n=t(this);n.data("qor.replicator")||n.data("qor.replicator",new e(this,i))})},t(function(){var i=".qor-collection-group",n={itemClass:".qor-collection",newClass:".qor-collection-new",addClass:".qor-collection-add",delClass:".qor-collection-del",undoClass:".qor-collection-undo",alertTemplate:'<div class="alert alert-danger"><input type="hidden" name="{{name}}._destroy" value="1"><a href="javascript:void(0);" class="alert-link qor-collection-undo">Undo Delete</a></div>'};t(document).on("click.qor.replicator.initiator",i,function(){e.plugin.call(t(this),n)}).on("renew.qor.initiator",function(a){var o=t(i,a.target);o.length&&e.plugin.call(o,n)}).triggerHandler("renew.qor.initiator")}),e}),function(t){"function"==typeof define&&define.amd?define("qor-selector",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(){var e=t(this);e.prop("multiple")||e.find("option[selected]").length||e.prepend('<option value="" selected></option>'),e.chosen()}t(function(){t.fn.chosen&&t(document).on("renew.qor.initiator",function(i){var n=t('select[data-toggle="qor.selector"]',i.target);n.length&&e.call(n)}).triggerHandler("renew.qor.initiator")})}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=t(document),i=window.FormData,n="qor.slideout",a="click."+n,o="submit."+n,s="show."+n,r="shown."+n,l="hide."+n,d="hidden."+n,c=function(e,i){this.$element=t(e),this.options=t.extend({},c.DEFAULTS,i),this.active=!1,this.disabled=!1,this.animating=!1,this.init()};return c.prototype={constructor:c,init:function(){var e;this.$element.find(".qor-list").length&&(this.$slideout=e=t(c.TEMPLATE).appendTo("body"),this.$title=e.find(".slideout-title"),this.$body=e.find(".slideout-body"),this.bind())},bind:function(){this.$slideout.on(o,"form",t.proxy(this.submit,this)),e.on(a,t.proxy(this.click,this))},unbind:function(){this.$slideout.off(o,this.submit),e.off(a,this.click)},click:function(e){var i,n,a,o=this.$element,s=this.$slideout.get(0),r=e.target;if(!e.isDefaultPrevented()){for(;r!==document&&(i=!1,n=t(r),r!==s);){if(n.data("url")){e.preventDefault(),a=n.data(),this.load(a.url,a);break}if("slideout"===n.data("dismiss")){this.hide();break}if(n.is("tbody > tr")){n.hasClass("active")||(o.find("tbody > tr").removeClass("active"),n.addClass("active"),this.load(n.find(".qor-action-edit").attr("href")));break}if(n.is(".qor-action-new")){e.preventDefault(),o.find("tbody > tr").removeClass("active"),this.load(n.attr("href"));break}if((n.is(".qor-action-edit")||n.is(".qor-action-delete"))&&e.preventDefault(),!r)break;i=!0,r=r.parentNode}i&&(o.find("tbody > tr").removeClass("active"),this.hide())}},submit:function(e){var n=e.target,a=t(n),o=this;i&&(e.preventDefault(),t.ajax(a.prop("action"),{method:a.prop("method"),data:new i(n),processData:!1,contentType:!1,success:function(){var t=a.data("returnUrl");t?o.load(t):o.refresh()},error:function(){window.alert(arguments[1]+(arguments[2]||""))}}))},load:function(e,i){var n=this,a=t.isPlainObject(i)?i:{},o=a.method?a.method:"GET",s=function(){t.ajax(e,{method:o,data:a,success:function(e){var i,s;"GET"===o?(i=t(e),s=i.is(".qor-form-container")?i:i.find(".qor-form-container"),s.find(".qor-action-cancel").attr("data-dismiss","slideout").removeAttr("href"),n.$title.html(i.find(".qor-title").html()),n.$body.html(s.html()),n.$slideout.one(r,function(){t(this).trigger("renew.qor.initiator")}),n.show()):a.returnUrl?(n.disabled=!1,n.load(a.returnUrl)):n.refresh()},complete:function(){n.disabled=!1}})};e&&!this.disabled&&(this.disabled=!0,this.active?(this.hide(),this.$slideout.one(d,s)):s())},show:function(){var e,i=this.$slideout;this.active||this.animating||(e=t.Event(s),i.trigger(e),e.isDefaultPrevented()||(i.addClass("active").get(0).offsetWidth,i.addClass("in"),this.animating=setTimeout(t.proxy(this.shown,this),350)))},shown:function(){this.active=!0,this.animating=!1,this.$slideout.trigger(r)},hide:function(){var e,i=this.$slideout;this.active&&!this.animating&&(e=t.Event(l),i.trigger(e),e.isDefaultPrevented()||(i.removeClass("in"),this.animating=setTimeout(t.proxy(this.hidden,this),350)))},hidden:function(){this.active=!1,this.animating=!1,this.$element.find("tbody > tr").removeClass("active"),this.$slideout.removeClass("active").trigger(d);

},refresh:function(){this.hide(),setTimeout(function(){window.location.reload()},350)},toggle:function(){this.active?this.hide():this.show()},destroy:function(){this.unbind(),this.$element.removeData(n)}},c.DEFAULTS={},c.TEMPLATE='<div class="qor-slideout"><div class="slideout-dialog"><div class="slideout-header"><button type="button" class="slideout-close" data-dismiss="slideout" aria-div="Close"><span class="md md-24">close</span></button><h3 class="slideout-title"></h3></div><div class="slideout-body"></div></div></div>',c.plugin=function(e){return this.each(function(){var i=t(this);i.data(n)||i.data(n,new c(this,e))})},t(function(){t(document).on("renew.qor.initiator",function(e){var i=t(".qor-theme-slideout",e.target);i.length&&c.plugin.call(i)}).triggerHandler("renew.qor.initiator")}),c}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(i,n){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,t.isPlainObject(n)&&n),this.$modal=null,this.built=!1,this.init()}var i="qor.textviewer",n="click."+i;e.prototype={constructor:e,init:function(){this.$element.find(this.options.toggle).each(function(){var i=t(this);this.scrollHeight>i.height()&&i.addClass("active").wrapInner(e.INNER)}),this.bind()},build:function(){this.built||(this.built=!0,this.$modal=t(e.TEMPLATE).modal({show:!1}).appendTo("body"))},bind:function(){this.$element.on(n,this.options.toggle,t.proxy(this.click,this))},unbind:function(){this.$element.off(n,this.click)},click:function(e){var i,n=e.currentTarget,a=t(n);this.built||this.build(),a.hasClass("active")&&(i=this.$modal,i.find(".modal-title").text(a.closest("td").attr("title")),i.find(".modal-body").html(a.html()),i.modal("show"))},destroy:function(){this.unbind(),this.$element.removeData(i)}},e.DEFAULTS={toggle:".qor-list-text"},e.INNER='<div class="text-inner"></div>',e.TEMPLATE='<div class="modal fade qor-list-modal" id="qorListModal" tabindex="-1" role="dialog" aria-labelledby="qorListModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="qorPublishModalLabel"></h4></div><div class="modal-body"></div></div></div></div>',e.plugin=function(n){return this.each(function(){var a,o=t(this),s=o.data(i);if(!s){if(!t.fn.modal)return;o.data(i,s=new e(this,n))}"string"==typeof n&&t.isFunction(a=s[n])&&a.apply(s)})},t(function(){e.plugin.call(t(".qor-list"))})}),function(t){"function"==typeof define&&define.amd?define("qor-widgets",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e={};return e.init=function(){this.confirm(),this.checkAll(),this.tooltip()},e.confirm=function(){t(document).on("click.qor.confirmer","[data-confirm]",function(e){var i,n=t(this),a=n.data();a.confirm&&(window.confirm(a.confirm)?/DELETE/i.test(a.method)&&(e.preventDefault(),i=a.url||n.attr("href"),a=t.extend({},a,{_method:"DELETE"}),t.post(i,a,function(){window.location.reload()})):e.preventDefault())})},e.checkAll=function(){t(".qor-check-all").each(function(){var e=t(this);e.attr("title","Check all").tooltip().on("click",function(){this.disabled||t(this).attr("data-original-title",this.checked?"Uncheck all":"Check all").closest("table").find(":checkbox:not(.qor-check-all)").prop("checked",this.checked)}),this.checked&&e.triggerHandler("click")})},e.tooltip=function(){t('[data-toggle="tooltip"]').tooltip()},t(function(){e.init()}),e});