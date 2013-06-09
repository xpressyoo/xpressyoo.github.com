$(function() {
	$("#back-top").hide();
	var a, f, m, A;
	$(".myem").append('<n uers="znvygb:sybev@aorefvre.pbz" ery="absbyybj" gnetrg="_oynax">Rznvy</n>'.replace(/[a-zA-Z]/g, function(d) {
		return String.fromCharCode((d <= "Z" ? 90 : 122) >= (d = d.charCodeAt(0) + 13) ? d : d - 26)
	}));
	$("#myemb").append('<n uers="znvygb:sybev@aorefvre.pbz" ery="absbyybj" gnetrg="_oynax">sybev@aorefvre.pbz</n>'.replace(/[a-zA-Z]/g, function(d) {
		return String.fromCharCode((d <= "Z" ? 90 : 122) >= (d = d.charCodeAt(0) + 13) ? d : d - 26)
	}));
	// More Scrolling
	$("#remo").on('click', function(event) {
		$('html, body').animate({
			scrollTop: $("#more").offset().top
		}, 1000);
	});
	// Legend Pictures
	$("#infopic").hover(

	function() {
		$('#logo,#nav ul').fadeOut(200);
		$('#legend').fadeIn(400).removeClass('none');
	}, function() {
		$('#legend').fadeOut(200).addClass('none');
		$('#logo,#nav ul').fadeIn(400);
	});
	// Footnotes
	$("sup").hover(

	function() {
		$('#footnotes #p' + $(this).attr('id')).fadeIn(200).delay(4000).fadeOut(300).addClass('none');
	}, function() {
		//$('#footnotes #p' + $(this).attr('id') ).addClass('none');
	});
	// End Footnotes
	// Lightbox
	function openLight() {
		$(".global").addClass("contact-active");
		$('#lightbox').removeClass('none');
	}

	function closeLight() {
		$('#lightbox div').css('background', 'none');
		$(".global").removeClass("contact-active");
		$('#lightbox').addClass('none');
	}

	function closeContact() {
		$("#contact-box").hide().addClass("hidden");
		$("#contact").removeClass("selected");
		$(".global").removeClass("contact-active");
	}
	$('#lightbox .close').on('click', function() {
		closeLight()
	});

	$('.about a.lightbox').on('click', function() {
		var imgcid = document.getElementById('prix');
		var idimg = imgcid.getAttribute('data-img');
		openLight();
		$('#lightbox div').css('background', 'url(\'../lib/' + idimg + '\') no-repeat top center');
	});

	// End Lightbox
	// Contact Box
	$("#contact, #talk, #ttalk, #followbtn, #contact-box .close").on("click", function() {
		if ($("#contact-box").hasClass("hidden")) {
			$("#contact").addClass("selected");
			$(".global").addClass("contact-active");
			$("#contact-box").fadeIn("fast").removeClass("hidden");
		} else {
			closeContact()
		}
	});
	$(document).keyup(function(d) {
		if (d.keyCode === 27) {
			closeContact();
			closeLight();
			history.back();
		}
	});
	var t = new Date();
	var i = t.getFullYear();
	var w = t.getUTCMonth();
	var q = t.getUTCDay();
	var g = t.getUTCHours();
	var n = t.getUTCMinutes();
	$("#yr").append(i);
	$("#exp").append(i - 2002);
	if (n < 10) {
		n = "0" + n
	}
	$("#time").append((g + 1) + ":" + n);
	// Back to top
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$("#back-top").fadeIn()
		} else {
			$("#back-top").fadeOut()
		}
	});
	$(window).load(function() {
		$("#back-top").raptorize();
		$("#back-top").click(function() {
			$(this).raptorize();
			$("body,html").animate({
				scrollTop: 0
			}, 1100);
			return false
		})
	});
	//End Back to top
	// Time ago
	var h = "en";
	var r = "a year";
	var p = "years";
	var y = "a month";
	var j = "months";
	var z = "a day";
	var l = "days";
	var k = "an hour";
	var s = "hours";
	var o = "a minute";
	var e = "minutes";
	var x = "now";
	var u = null;
	var v = null;
	var b = "ago";
	var c = "from now";
	(function(F) {
		F.timeago = function(d) {
			if (d instanceof Date) {
				return C(d)
			} else {
				if (typeof d === "string") {
					return C(F.timeago.parse(d))
				} else {
					return C(F.timeago.datetime(d))
				}
			}
		};
		var D = F.timeago;
		F.extend(F.timeago, {
			settings: {
				refreshMillis: 60000,
				allowFuture: false,
				strings: {
					prefixAgo: u,
					prefixFromNow: v,
					suffixAgo: b,
					suffixFromNow: c,
					seconds: x,
					minute: o,
					minutes: "%d " + e,
					hour: k,
					hours: "%d " + s,
					day: z,
					days: "%d " + l,
					month: y,
					months: "%d " + j,
					year: r,
					years: "%d " + p,
					numbers: []
				}
			},
			inWords: function(L) {
				var K = this.settings.strings;
				var O = K.prefixAgo;
				var d = K.suffixAgo;
				if (this.settings.allowFuture) {
					if (L < 0) {
						O = K.prefixFromNow;
						d = K.suffixFromNow
					}
					L = Math.abs(L)
				}
				var I = L / 1000;
				var Q = I / 60;
				var J = Q / 60;
				var H = J / 24;
				var N = H / 365;

				function P(U, S) {
					var T = F.isFunction(U) ? U(S, L) : U;
					var R = (K.numbers && K.numbers[S]) || S;
					return T.replace(/%d/i, R)
				}
				var M = I < 45 && P(K.seconds, Math.round(I)) || I < 90 && P(K.minute, 1) || Q < 45 && P(K.minutes, Math.round(Q)) || Q < 90 && P(K.hour, 1) || J < 24 && P(K.hours, Math.round(J)) || J < 48 && P(K.day, 1) || H < 30 && P(K.days, Math.floor(H)) || H < 60 && P(K.month, 1) || H < 365 && P(K.months, Math.floor(H / 30)) || N < 2 && P(K.year, 1) || P(K.years, Math.floor(N));
				return F.trim([O, M, d].join(" "))
			},
			parse: function(d) {
				var H = F.trim(d);
				H = H.replace(/\.\d\d\d+/, "");
				H = H.replace(/-/, "/").replace(/-/, "/");
				H = H.replace(/T/, " ").replace(/Z/, " UTC");
				H = H.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
				return new Date(H)
			},
			datetime: function(H) {
				var d = F(H).get(0).tagName.toLowerCase() === "time";
				var I = d ? F(H).attr("datetime") : F(H).attr("title");
				return D.parse(I)
			}
		});
		F.fn.timeago = function() {
			var d = this;
			d.each(G);
			var H = D.settings;
			if (H.refreshMillis > 0) {
				setInterval(function() {
					d.each(G)
				}, H.refreshMillis)
			}
			return d
		};

		function G() {
			var d = B(this);
			if (!isNaN(d.datetime)) {
				F(this).text(C(d.datetime))
			}
			return this
		}

		function B(H) {
			H = F(H);
			if (!H.data("timeago")) {
				H.data("timeago", {
					datetime: D.datetime(H)
				});
				var d = F.trim(H.text());
				if (d.length > 0) {
					H.attr("title", d)
				}
			}
			return H.data("timeago")
		}

		function C(d) {
			return D.inWords(E(d))
		}

		function E(d) {
			return (new Date().getTime() - d.getTime())
		}
		document.createElement("abbr");
		document.createElement("time")
	}(jQuery));
});
// Raptor
(function(a) {
	a.fn.raptorize = function(b) {
		var c = {
			enterOn: "click",
			delayTime: 5000
		};
		var b = a.extend(c, b);
		return this.each(function() {
			var g = a(this);
			var i = true;
			var e = '<img id="elRaptor" class="mob" style="display: none" src="http://florianbersier.com/lib/raptor.png" />';
			var j = '<audio id="elRaptorShriek" preload="auto"><source src="http://florianbersier.com/lib/raptor-sound.mp3" /><source src="http://florianbersier.com/lib/raptor-sound.ogg" /></audio>';
			var f = false;
			a("body").append(e);
			if (i) {
				a("body").append(j)
			}
			var l = a("#elRaptor").css({
				position: "fixed",
				"z-index": "999999",
				bottom: "-700px",
				right: "0",
				display: "block"
			});

			function k() {
				f = true;
				if (i) {
					function m() {
						document.getElementById("elRaptorShriek").play()
					}
					m()
				}
				l.animate({
					bottom: "0"
				}, function() {
					a(this).animate({
						bottom: "-130px"
					}, 100, function() {
						var n = ((a(this).position().left) + 400);
						a(this).delay(300).animate({
							right: n
						}, 2200, function() {
							l = a("#elRaptor").css({
								bottom: "-700px",
								right: "0"
							});
							f = false
						})
					})
				})
			}
			if (b.enterOn == "timer") {
				setTimeout(k, b.delayTime)
			} else {
				if (b.enterOn == "click") {
					g.bind("click", function(m) {
						m.preventDefault();
						if (!f) {
							k()
						}
					})
				} else {
					if (b.enterOn == "konami-code") {
						var h = [],
							d = "38,38,40,40,37,39,37,39,66,65";
						a(window).bind("keydown.raptorz", function(m) {
							h.push(m.keyCode);
							if (h.toString().indexOf(d) >= 0) {
								k();
								a(window).unbind("keydown.raptorz")
							}
						}, true)
					}
				}
			}
		})
	}
})(jQuery);
