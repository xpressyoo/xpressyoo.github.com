$(function(){$("#back-top").hide();var a,f,m,A;$(".myem").append('<n uers="znvygb:sybev@aorefvre.pbz" ery="absbyybj" gnetrg="_oynax">Rznvy</n>'.replace(/[a-zA-Z]/g,function(d){return String.fromCharCode((d<="Z"?90:122)>=(d=d.charCodeAt(0)+13)?d:d-26)}));$("#myemb").append('<n uers="znvygb:sybev@aorefvre.pbz" ery="absbyybj" gnetrg="_oynax">sybev@aorefvre.pbz</n>'.replace(/[a-zA-Z]/g,function(d){return String.fromCharCode((d<="Z"?90:122)>=(d=d.charCodeAt(0)+13)?d:d-26)}));$("#contact, #followbtn, #close").live("click",function(){if($("#contact-box").hasClass("hidden")){$("#contact").addClass("selected");$(".global").addClass("contact-active");$("#contact-box").fadeIn("slow").removeClass("hidden");history.pushState(null, "contact", "contact");return false}else{$("#contact-box").hide("fast").addClass("hidden");$("#contact").removeClass("selected");$(".global").removeClass("contact-active");history.back()}});$(document).keyup(function(d){if(d.keyCode===27){$("#contact-box").hide("fast").addClass("hidden");$("#contact").removeClass("selected");$(".global").removeClass("contact-active")}});var t=new Date();var i=t.getFullYear();var w=t.getUTCMonth();var q=t.getUTCDay();var g=t.getUTCHours();var n=t.getUTCMinutes();$("#yr").append(i);$("#exp").append(i-2002);if(n<10){n="0"+n}$("#time").append(g+":"+n);if(w>=0&&w<7&&q!=0&&q<6&&time>9&&time<18){a="very busy";f="icon-minus-sign";m="red";A="48"}else{if(w>=0&&w<7&&q!=0&&q<6&&time<=9&&time>=18){a="busy";f="icon-warning-sign";m="orange";A="24"}else{if(w>=0&&w<7&&(q==0||q==6)&&time>9&&time<18){a="busy";f="icon-warning-sign";m="orange";A="24"}else{if(w>=0&&w<7&&(q==0||q==6)&&time<=9&&time>=18){a="good";f="icon-ok-sign";m="green";A="12"}else{a="good";f="icon-ok-sign";m="green";A="12"}}}}$("#mstatusi").addClass(f+" "+m);$("#mstatus").append(a);$("#mdelay").append(A);var h="en";var r="A year";var p="years";var y="A month";var j="months";var z="A day";var l="days";var k="An hour";var s="hours";var o="A minute";var e="minutes";var x="Now";var u=null;var v=null;var b="ago";var c="from now";(function(F){F.timeago=function(d){if(d instanceof Date){return C(d)}else{if(typeof d==="string"){return C(F.timeago.parse(d))}else{return C(F.timeago.datetime(d))}}};var D=F.timeago;F.extend(F.timeago,{settings:{refreshMillis:60000,allowFuture:false,strings:{prefixAgo:u,prefixFromNow:v,suffixAgo:b,suffixFromNow:c,seconds:x,minute:o,minutes:"%d "+e,hour:k,hours:"%d "+s,day:z,days:"%d "+l,month:y,months:"%d "+j,year:r,years:"%d "+p,numbers:[]}},inWords:function(L){var K=this.settings.strings;var O=K.prefixAgo;var d=K.suffixAgo;if(this.settings.allowFuture){if(L<0){O=K.prefixFromNow;d=K.suffixFromNow}L=Math.abs(L)}var I=L/1000;var Q=I/60;var J=Q/60;var H=J/24;var N=H/365;function P(U,S){var T=F.isFunction(U)?U(S,L):U;var R=(K.numbers&&K.numbers[S])||S;return T.replace(/%d/i,R)}var M=I<45&&P(K.seconds,Math.round(I))||I<90&&P(K.minute,1)||Q<45&&P(K.minutes,Math.round(Q))||Q<90&&P(K.hour,1)||J<24&&P(K.hours,Math.round(J))||J<48&&P(K.day,1)||H<30&&P(K.days,Math.floor(H))||H<60&&P(K.month,1)||H<365&&P(K.months,Math.floor(H/30))||N<2&&P(K.year,1)||P(K.years,Math.floor(N));return F.trim([O,M,d].join(" "))},parse:function(d){var H=F.trim(d);H=H.replace(/\.\d\d\d+/,"");H=H.replace(/-/,"/").replace(/-/,"/");H=H.replace(/T/," ").replace(/Z/," UTC");H=H.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");return new Date(H)},datetime:function(H){var d=F(H).get(0).tagName.toLowerCase()==="time";var I=d?F(H).attr("datetime"):F(H).attr("title");return D.parse(I)}});F.fn.timeago=function(){var d=this;d.each(G);var H=D.settings;if(H.refreshMillis>0){setInterval(function(){d.each(G)},H.refreshMillis)}return d};function G(){var d=B(this);if(!isNaN(d.datetime)){F(this).text(C(d.datetime))}return this}function B(H){H=F(H);if(!H.data("timeago")){H.data("timeago",{datetime:D.datetime(H)});var d=F.trim(H.text());if(d.length>0){H.attr("title",d)}}return H.data("timeago")}function C(d){return D.inWords(E(d))}function E(d){return(new Date().getTime()-d.getTime())}document.createElement("abbr");document.createElement("time")}(jQuery));$.ajax({url:"https://api.twitter.com/1/statuses/user_timeline.json?include_entities=false&include_rts=false&screen_name=xpressyoo&count=1",dataType:"jsonp",success:function(D){var C=/([A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+)/g;var B=/[#]+([A-Za-z0-9-_]+)/g;var d=/[@]+([A-Za-z0-9-_]+)/g;$.each(D.slice(0,1),function(E,F){F.text=F.text.replace(C,'<a target="_blank" title="Go to link" href="$1">$1</a>');F.text=F.text.replace(B,'<a target="_blank" title="More on this hashtag?" href="http://search.twitter.com/search?q=$1">#$1</a>');F.text=F.text.replace(d,'<a target="_blank" title="Who is this guy?" href="http://twitter.com/$1">@$1</a>');F.re='<a target="_blank" title="Retweet" href="http://twitter.com/intent/retweet?tweet_id='+F.id_str+'"><i class="icon-retweet"></i></a>';F.rep='<a target="_blank" title="Reply" href="http://twitter.com/intent/tweet?in_reply_to='+F.id_str+'"><i class="icon-share-alt"></i></a>';F.date=($.timeago($.trim(F.created_at)));F.oid=F.id_str.replace('"',"");$("#tweet").append(F.text+'<span class="btt"><span class="tweet-date">'+F.date+'</span><span class="retweet">'+F.re+"&nbsp; "+F.rep+"</span></span>")})}});$(window).scroll(function(){if($(this).scrollTop()>100){$("#back-top").fadeIn()}else{$("#back-top").fadeOut()}});$(window).load(function(){$("#back-top").raptorize();$("#back-top").click(function(){$(this).raptorize();$("body,html").animate({scrollTop:0},1100);return false})})});(function(a){a.fn.raptorize=function(b){var c={enterOn:"click",delayTime:5000};var b=a.extend(c,b);return this.each(function(){var g=a(this);var i=false;if(a.browser.mozilla&&a.browser.version.substr(0,5)>="1.9.2"||a.browser.webkit){i=true}var e='<img id="elRaptor" style="display: none" src="http://florianbersier.com/lib/raptor.png" />';var j='<audio id="elRaptorShriek" preload="auto"><source src="http://florianbersier.com/lib/raptor-sound.mp3" /><source src="http://florianbersier.com/lib/raptor-sound.ogg" /></audio>';var f=false;a("body").append(e);if(i){a("body").append(j)}var l=a("#elRaptor").css({position:"fixed","z-index":"999999",bottom:"-700px",right:"0",display:"block"});function k(){f=true;if(i){function m(){document.getElementById("elRaptorShriek").play()}m()}l.animate({bottom:"0"},function(){a(this).animate({bottom:"-130px"},100,function(){var n=((a(this).position().left)+400);a(this).delay(300).animate({right:n},2200,function(){l=a("#elRaptor").css({bottom:"-700px",right:"0"});f=false})})})}if(b.enterOn=="timer"){setTimeout(k,b.delayTime)}else{if(b.enterOn=="click"){g.bind("click",function(m){m.preventDefault();if(!f){k()}})}else{if(b.enterOn=="konami-code"){var h=[],d="38,38,40,40,37,39,37,39,66,65";a(window).bind("keydown.raptorz",function(m){h.push(m.keyCode);if(h.toString().indexOf(d)>=0){k();a(window).unbind("keydown.raptorz")}},true)}}}})}})(jQuery);
