var map,marker1,marker2;$(function(){var b=((60*$(window).height())/100)-55;var l=$(window).width();var d=(navigator.language)?navigator.language:navigator.userLanguage;var j="lib/fb.png";var g="lib/you.png";map=a();$(window).resize(function(){$("#mapcanvas,#mapcanvasno,#mapcanvasd").css("height",$(window).height());$("#mapcanvas,#mapcanvasno,#mapcanvasd").css("width",$(window).width());google.maps.event.trigger(map,"resize");map.setZoom(map.getZoom())});function a(){var p=setTimeout(q,10);if(navigator&&navigator.geolocation){navigator.geolocation.getCurrentPosition(r,q)}else{$("#distanced").empty().append("Geolocation is not supported.")}function r(y){clearTimeout(p);$("#mapcanvasd,#mapcanvasno").css("display","none");var z=document.createElement("div");z.id="mapcanvas";z.style.height=b+"px";z.style.width=l+"px";document.querySelector("#artmap").appendChild(z);var t=new google.maps.LatLng(y.coords.latitude,y.coords.longitude);var D=new google.maps.LatLng(51.75527,-1.25894);var E=t;var B=google.maps.geometry.spherical.computeDistanceBetween(D,E);if(B>999){var w=Math.round((B/1000)*0.621371192)+' <span class="small">mi</span>';var B=Math.round(B/1000)+' <span class="small">kms</span>'}else{var w=Math.round(B*1.0936133)+' <span class="small">yd</span>';var B=Math.round(B)+' <span class="small">m</span>'}if(d==="en-GB"||d==="en-US"||d==="en-us"||d==="en-gb"){$("#distance").empty().append(w)}else{$("#distance").empty().append(B)}$("#distanced").empty().append("Aerial distance between you and me.");var G=[{stylers:[{visibility:"on"},{weight:0.1},{hue:"#007fff"},{saturation:-94},{lightness:69},{gamma:0.66}]},{featureType:"administrative.province",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"on"},{lightness:25}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"},]},{featureType:"poi",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"off"}]}];var H={zoom:2,center:D,mapTypeControl:false,scrollwheel:false,navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},mapTypeId:google.maps.MapTypeId.ROADMAP};var s=new google.maps.Map(document.getElementById("mapcanvas"),H);var v=new google.maps.Marker({position:t,map:s,icon:g,title:"You are here!"});var u=new google.maps.Marker({position:D,map:s,icon:j,title:"I'm here!"});var C=[D,E];var A=new google.maps.Polyline({path:C,strokeColor:"#aaa",strokeOpacity:0.6,geodesic:true,strokeWeight:5});var F=new google.maps.LatLngBounds();for(var x=0;x<C.length;x++){F.extend(C[x])}A.setMap(s);s.fitBounds(F);s.setOptions({styles:G});$("#whym").attr("title","This is the aerial distance between you and me.")}function q(z){$("#mapcanvasno,#mapcanvas").css("display","none");var t=document.createElement("div");t.id="mapcanvasd";t.style.height=b+"px";t.style.width=l+"px";document.querySelector("#artmap").appendChild(t);var u=new google.maps.LatLng(51.7,-1.22728010000003);var y=[{stylers:[{visibility:"on"},{weight:0.1},{hue:"#007fff"},{saturation:-94},{lightness:69},{gamma:0.66}]},{featureType:"administrative.province",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"on"},{lightness:25}]},{featureType:"poi",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"off"}]}];var s={zoom:2,center:u,scrollwheel:false,mapTypeControl:false,navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},mapTypeId:google.maps.MapTypeId.ROADMAP};var v=new google.maps.Map(document.getElementById("mapcanvasd"),s);var x=new google.maps.Marker({position:u,map:v,icon:j,title:"I'm here!"});v.setOptions({styles:y});if(z.code===1){clearTimeout(p);$("#mapcanvasd,#mapcanvas").css("display","none");var w=document.createElement("div");w.id="mapcanvasno";w.style.height=b+"px";w.style.width=l+"px";document.querySelector("#artmap").appendChild(w);var u=new google.maps.LatLng(51.7,-1.22728010000003);var y=[{stylers:[{visibility:"on"},{weight:0.1},{hue:"#007fff"},{saturation:-94},{lightness:69},{gamma:0.66}]},{featureType:"administrative.province",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"on"},{lightness:25}]},{featureType:"poi",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"off"}]}];var s={zoom:2,center:u,scrollwheel:false,mapTypeControl:false,navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},mapTypeId:google.maps.MapTypeId.ROADMAP};var v=new google.maps.Map(document.getElementById("mapcanvasno"),s);var x=new google.maps.Marker({position:u,map:v,icon:j,title:"I'm here!"});v.setOptions({styles:y})}}}var n={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(s){for(var p=0;p<s.length;p++){var q=s[p].string;var r=s[p].prop;this.versionSearchString=s[p].versionSearch||s[p].identity;if(q){if(q.indexOf(s[p].subString)!=-1){return s[p].identity}}else{if(r){return s[p].identity}}}},searchVersion:function(q){var p=q.indexOf(this.versionSearchString);if(p==-1){return}return parseFloat(q.substring(p+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};n.init();var k=n.OS;var m=n.browser;var f,e;if(k==="Linux"&&m==="Chrome"){f=5}else{if(k==="Linux"&&m==="Firefox"){f=4}else{if(k==="Linux"&&m==="Opera"){f=4}}}if(k==="Mac"&&m==="Chrome"){f=3}else{if(k==="Mac"&&m==="Firefox"){f=3}else{if(k==="Mac"&&m==="Opera"){f=3}else{if(k==="Mac"&&m==="Safari"){f=2}}}}if(k==="Windows"&&m==="Chrome"){f=2}else{if(k==="Windows"&&m==="Firefox"){f=2}else{if(k==="Windows"&&m==="Opera"){f=2}else{if(k==="Windows"&&m==="Explorer"){f=1}}}}if(f==5){e="Excellent!"}else{if(f==4){e="Good!"}else{if(f==3){e="Not bad!"}else{if(f==2){e="Not too bad!"}else{if(f==1){e="No comment!"}}}}}$("#grade").append(" is "+f+"/5. "+e);$("#why,#whyb").attr("title",e+" You are using "+k+" with "+m);for(i=0;i<f;i++){stars='<i class="icon-star"></i>';$("#stars").append(stars)}for(i=0;i<5-f;i++){nostars='<i class="icon-star-empty"></i>';$("#nostars").append(nostars)}$("#infos").fadeIn(3000).css("display","block");if(m==="Safari"||m==="Explorer"||m==="Firefox"){$("#webcambtn").addClass("hidden")}var h=null;function o(p){if(p.code==1){console.log("You denied access to your camera.")}else{alert("Your browser sucks. Install Chrome or Opera.")}}window.URL=window.URL||window.webkitURL;navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;var c=document.querySelector("video");$("#webcambtn").live("click",function(){if(navigator.getUserMedia){navigator.getUserMedia({video:true},function(p){$("#artmap").addClass("hidden");$("#vid").removeClass("hidden");$("#webcambtn").addClass("webon");$("#webcambtn span").replaceWith("<span>Disconnect</span>");$("#webcambtn i").css("color","#2584d4");c.src=window.URL.createObjectURL(p);h=p;$("#webcambtn.webon").live("click",function(){$("#webcambtn").removeClass("webon");$("#webcambtn i").css("color","#999");$("#webcambtn span").replaceWith("<span>Say cheers</span>");$("#vid").addClass("hidden");$("#artmap").removeClass("hidden");c.pause();h.stop()})},o)}else{alert("Your browser sucks. Install Chrome or Opera.")}})});
