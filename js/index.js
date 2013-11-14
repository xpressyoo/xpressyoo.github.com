var map, marker1, marker2, conversion;
$(function() {
	// Global Variables
	var wh = ((66 * $(window).height()) / 100),
		ww = $(window).width(),
		from = new google.maps.LatLng(51.75527, -1.25894);
	//Language
	var language = navigator.language || navigator.userLanguage,
		lang = language.substring(0, 2),
		img1 = 'lib/fb.png',
		img2 = 'lib/you.png';
	/////////Google Map
	map = initializeMap();
	$(window).resize(function() {
		$('#mapcanvasno').css('height', $(window).height());
		$('#mapcanvasno').css('width', $(window).width());
		google.maps.event.trigger(map, 'resize');
	});

	function initializeMap() {
		MapDefault();

		function MapDefault() {
			$.getJSON('http://api.wipmania.com/jsonp?callback=?', function(data) {
				var mapcanvasno = document.createElement('div');
				mapcanvasno.id = 'mapcanvasno';
				mapcanvasno.style.height = wh + 'px';
				mapcanvasno.style.width = ww + 'px';
				document.querySelector('#artmap').appendChild(mapcanvasno);
				var to = new google.maps.LatLng(data.latitude, data.longitude),
					dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
				if (dist > 999) {
					conversion = Math.round((dist / 1000) * 0.621371192) + '<span class="small">mi</span>';
					dist = Math.round(dist / 1000) + '<span class="small">kms</span>';
				} else {
					conversion = Math.round(dist * 1.0936133) + '<span class="small">yd</span>';
					dist = Math.round(dist) + '<span class="small">m</span>';
				}
				if (lang === 'en') {
					$('#distance').empty().append(conversion);
				} else {
					$('#distance').empty().append(dist);
				}
				var country = data.address.country;
				if (country === 'United Kingdom' || country === 'United States of America' || country === 'United States' || country === 'USA') {
					$('#country').empty().append('the ' + country);
				} else {
					$('#country').empty().append(country);
				}
				var perso = [{
					stylers: [{
						visibility: "on"
					}, {
						"weight": 0.5
					}, {
						hue: "#007fff"
					}, {
						saturation: -70
					}, {
						lightness: 70
					}, {
						gamma: 0.7
					}]
				}, {
					featureType: "administrative.province",
					elementType: "geometry",
					stylers: [{
						visibility: "off"
					}]
				}, {
					featureType: "administrative",
					elementType: "labels",
					stylers: [{
						visibility: "on"
					}, {
						lightness: 25
					}]
				}, {
					featureType: "poi",
					elementType: "geometry",
					stylers: [{
						visibility: "off"
					}]
				}, {
					featureType: "road",
					elementType: "geometry",
					stylers: [{
						visibility: "off"
					}]
				}];
				var myOptions = {
					zoom: 4,
					center: to,
					scrollwheel: false,
					mapTypeControl: false,
					navigationControlOptions: {
						style: google.maps.NavigationControlStyle.SMALL
					},
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				var map = new google.maps.Map(document.getElementById("mapcanvasno"), myOptions);
				var marker1 = new google.maps.Marker({
					position: to,
					map: map,
					icon: img2,
					title: "You are here!"
				});
				var marker2 = new google.maps.Marker({
					position: from,
					map: map,
					icon: img1,
					title: "I'm here!"
				});
				var flightPlanCoordinates = [from, to];
				var flightPath = new google.maps.Polyline({
					path: flightPlanCoordinates,
					strokeColor: "#aaa",
					strokeOpacity: 0,
					geodesic: true,
					strokeWeight: 4
				});
				var latlngbounds = new google.maps.LatLngBounds();
				for (var i = 0; i < flightPlanCoordinates.length; i++) {
					latlngbounds.extend(flightPlanCoordinates[i]);
				}
				flightPath.setMap(map);
				map.fitBounds(latlngbounds);
				map.setOptions({
					styles: perso
				});
				$('#whym').attr('data-hint', 'This is the aerial distance between you and me.');
			}); // Get JSON
		}
	} // Initialize Map
	var BrowserDetect = {
		init: function() {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function(data) {
			for (var i = 0; i < data.length; i++) {
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
				} else if (dataProp) return data[i].identity;
			}
		},
		searchVersion: function(dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		},
		dataBrowser: [{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		}, {
			string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		}, {
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		}, {
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		}, {
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		}, {
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		}, {
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		}, {
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		}, { // for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		}, {
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		}, {
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		}, { // for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}],
		dataOS: [{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		}, {
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		}, {
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
		}, {
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}]
	};
	BrowserDetect.init();
	var os = BrowserDetect.OS,
		browser = BrowserDetect.browser;
	//Webcam
	if (browser === 'Safari' || browser === 'Explorer') {
		$('#webcambtn').addClass('hidden');
	}
	var localMediaStream = null;

	function onFailSoHard(e) {
		if (e.code == 1) {
			$('#say').empty().append('Error');
			$('#webcambtn').empty().append('<i id="warns" class="icon-warning-sign"></i>');
			$('#descam').empty().append('You denied access to your camera.')
		} else {
			$('#say').empty().append('Error');
			$('#webcambtn').empty().append('<i id="warns" class="icon-warning-sign"></i>');
			$('#descam').empty().append('Feature not supported in your browser.')
		}
	}
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	var video = document.querySelector('video');
	$('#webcambtn').on('click', function() {
		if (navigator.getUserMedia) {
			navigator.getUserMedia({
				video: true,
				audio: false
			}, function(stream) {
				if (video.mozSrcObject !== undefined) {
					video.mozSrcObject = stream;
				} else {
					video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
				}
				$('#vidin').addClass('hidden');
				$('video').removeClass('hidden');
				$('#camsignal').removeClass('off').addClass('on');
				$('#webcambtn.webon').on('click', function() {
					$('#webcambtn').removeClass('webon');
					$('#webcambtn span').replaceWith('<span>Say cheers</span>');
					$('video').addClass('hidden');
					$('#artmap').removeClass('hidden');
					video.pause();
					localMediaStream.stop();
				});
			}, onFailSoHard);
		} else {
			alert('Feature not supported in your browser. Install Chrome!');
		}
	});
	// Language
	var langtxt;
	if (lang === 'fr') {
		langtxt = 'Bonjour';
	} else if (lang === 'it') {
		langtxt = 'Ciao';
	} else if (lang === 'de') {
		langtxt = 'Hallo';
	} else if (lang === 'es') {
		langtxt = 'Hola';
	} else if (lang === 'pt') {
		langtxt = 'Olá';
	} else if (lang === 'zh') {
		langtxt = '你好';
	} else if (lang === 'ja') {
		langtxt = 'こんにちは';
	} else if (lang === 'ko') {
		langtxt = '안녕하세요';
	} else if (lang === 'he') {
		langtxt = 'שלום';
	} else if (lang === 'ru') {
		langtxt = 'привет';
	} else if (lang === 'hi') {
		langtxt = 'नमस्ते';
	} else if (lang === 'ar') {
		langtxt = 'مرحبا';
	} else {
		langtxt = 'Hello';
	}
	$('#hello').append(langtxt);
}); //#ready Fn
