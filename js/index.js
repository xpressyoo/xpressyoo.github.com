var map,marker1,marker2,conversion;$(function(){var D=((60*$(window).height())/100)-55;var u=$(window).width();var r=new google.maps.LatLng(51.75527,-1.25894);var B=(navigator.language)?navigator.language:navigator.userLanguage;var w="lib/fb.png";var y="lib/you.png";map=E();$(window).resize(function(){$("#mapcanvas,#mapcanvasno,#mapcanvasd").css("height",$(window).height());$("#mapcanvas,#mapcanvasno,#mapcanvasd").css("width",$(window).width());google.maps.event.trigger(map,"resize");map.setZoom(map.getZoom())});function E(){$.getJSON("http://api.wipmania.com/jsonp?callback=?",function(f){$("#mapcanvasd,#mapcanvas").css("display","none");var d=document.createElement("div");d.id="mapcanvasno";d.style.height=D+"px";d.style.width=u+"px";document.querySelector("#artmap").appendChild(d);var a=new google.maps.LatLng(f.latitude,f.longitude);var c=google.maps.geometry.spherical.computeDistanceBetween(r,a);if(c>999){conversion=Math.round((c/1000)*0.621371192)+' <span class="small">mi</span>';c=Math.round(c/1000)+' <span class="small">kms</span>'}else{conversion=Math.round(c*1.0936133)+' <span class="small">yd</span>';c=Math.round(c)+' <span class="small">m</span>'}if(B==="en-GB"||B==="en-US"||B==="en-us"||B==="en-gb"){$("#distance").empty().append(conversion)}else{$("#distance").empty().append(c)}$("#distanced").empty().append("You are in "+f.address.country+".");var m=[{stylers:[{visibility:"on"},{weight:0.1},{hue:"#007fff"},{saturation:-94},{lightness:69},{gamma:0.66}]},{featureType:"administrative.province",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"on"},{lightness:25}]},{featureType:"poi",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"off"}]}];var k={zoom:2,center:r,scrollwheel:false,mapTypeControl:false,navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},mapTypeId:google.maps.MapTypeId.ROADMAP};var l=new google.maps.Map(document.getElementById("mapcanvasno"),k);var h=new google.maps.Marker({position:a,map:l,icon:y,title:"You are here!"});var j=new google.maps.Marker({position:r,map:l,icon:w,title:"I'm here!"});var b=[r,a];var e=new google.maps.Polyline({path:b,strokeColor:"#aaa",strokeOpacity:0.6,geodesic:true,strokeWeight:5});var n=new google.maps.LatLngBounds();for(var g=0;g<b.length;g++){n.extend(b[g])}e.setMap(l);l.fitBounds(n);l.setOptions({styles:m});$("#whym").attr("title","This is the aerial distance between you and me.")})}var s={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(a){for(var d=0;d<a.length;d++){var c=a[d].string;var b=a[d].prop;this.versionSearchString=a[d].versionSearch||a[d].identity;if(c){if(c.indexOf(a[d].subString)!=-1){return a[d].identity}}else{if(b){return a[d].identity}}}},searchVersion:function(a){var b=a.indexOf(this.versionSearchString);if(b==-1){return}return parseFloat(a.substring(b+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};s.init();var v=s.OS;var t=s.browser;var z,A;if(v==="Linux"&&t==="Chrome"){z=5}else{if(v==="Linux"&&t==="Firefox"){z=4}else{if(v==="Linux"&&t==="Opera"){z=4}}}if(v==="Mac"&&t==="Chrome"){z=3}else{if(v==="Mac"&&t==="Firefox"){z=3}else{if(v==="Mac"&&t==="Opera"){z=3}else{if(v==="Mac"&&t==="Safari"){z=2}}}}if(v==="Windows"&&t==="Chrome"){z=2}else{if(v==="Windows"&&t==="Firefox"){z=2}else{if(v==="Windows"&&t==="Opera"){z=2}else{if(v==="Windows"&&t==="Explorer"){z=1}}}}if(z==5){A="Excellent!"}else{if(z==4){A="Good!"}else{if(z==3){A="Not bad!"}else{if(z==2){A="Not bad!"}else{if(z==1){A="Bad!"}}}}}$("#grade").append(" is "+z+"/5. "+A);$("#why,#whyb").attr("title",A+" You are using "+v+" with "+t);for(i=0;i<z;i++){stars='<i class="icon-star"></i>';$("#stars").append(stars)}for(i=0;i<5-z;i++){nostars='<i class="icon-star-empty"></i>';$("#nostars").append(nostars)}$("#infos").fadeIn(3000).css("display","block");if(t==="Safari"||t==="Explorer"||t==="Firefox"){$("#webcambtn").addClass("hidden")}var x=null;function q(a){if(a.code==1){console.log("You denied access to your camera.")}else{alert("Your browser sucks. Install Chrome or Opera.")}}window.URL=window.URL||window.webkitURL;navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;var C=document.querySelector("video");$("#webcambtn").on("click",function(){if(navigator.getUserMedia){navigator.getUserMedia({video:true},function(a){$("#artmap").addClass("hidden");$("#vid").removeClass("hidden");$("#webcambtn").addClass("webon");$("#webcambtn span").replaceWith("<span>Disconnect</span>");$("#webcambtn i").css("color","#2584d4");C.src=window.URL.createObjectURL(a);x=a;$("#webcambtn.webon").on("click",function(){$("#webcambtn").removeClass("webon");$("#webcambtn i").css("color","#999");$("#webcambtn span").replaceWith("<span>Say cheers</span>");$("#vid").addClass("hidden");$("#artmap").removeClass("hidden");C.pause();x.stop()})},q)}else{alert("Your browser sucks. Install Chrome or Opera.")}})});
