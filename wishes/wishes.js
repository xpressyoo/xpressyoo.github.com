/*
The MIT License (MIT)
Copyright (c) 2012 Florian Bersier

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Tele Type Function
$.fn.teletype = function(opts) {
    var $this = this,
        defaults = {
            animDelay: 50
        },
        settings = $.extend(defaults, opts);
    $.each(settings.text, function(i, letter) {
        setTimeout(function() {
            $this.html($this.html() + letter);
        }, settings.animDelay * i);
    });
};

// Capitalize first letter function
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// Year
var d = new Date();
var yr = d.getFullYear();
//var yr = 2013;

// Fullscreen

function goFullscreen(id) {
    var element = document.getElementById(id);
    if (element.mozRequestFullScreen) {
        // This is how to go into fullscren mode in Firefox
        // Note the "moz" prefix, which is short for Mozilla.
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        // This is how to go into fullscreen mode in Chrome and Safari
        // Both of those browsers are based on the Webkit project, hence the same prefix.
        element.webkitRequestFullScreen();
    }
    // Hooray, now we're in fullscreen mode!
}

// jQuery ready
$(function() {
    $('#welcome').teletype({
        animDelay: 20,
        text: '> New entry detected! Tracking initialized...'
    });
    
    // Geo Location, IP based
    $.getJSON('http://api.wipmania.com/jsonp?callback=?', function(data) {
        // Location
        var country = data.address.country;
        var longitude = data.longitude;
        var latitude = data.latitude;
        var img, credits;
        if (country === 'United Kingdom') {
            img = 'en';
            credits = 'London at Night';
        } else if (country === 'Canada') {
            img = 'ca';
            credits = 'Aurora Borealis Over Canada';
        } else if (country === 'Switzerland' || country === 'France' || country === 'Italy' || country === 'Spain') {
            img = 'eu';
            credits = 'South of Europe at Night';
        } else if (country === 'United States of America' || country === 'USA' || country === 'United States') {
            img = 'us';
            credits = 'U.S. East Coast at Night';
        } else {
            img = 'ca';
            credits = 'Aurora Borealis Over Canada';
        }
        // Language Detection
        var lt, happy, txt;
        var lang = (navigator.language) ? navigator.language : navigator.userLanguage;
        var lanc = lang;
        if (lang.indexOf('en') > -1) {
            lang = 'English';
            lt = 'Hello and welcome on behalf of Florian!';
            happy = 'Happy';
            txt = 'I wish you a beautiful, magical new year';
        } else if (lang.indexOf('de') > -1) {
            lang = 'German';
            lt = 'Hallo und herzlich willkommen!';
            happy = 'Happy';
            txt = 'Ein glückliches, erfolgreiches neues Jahr';
        } else if (lang.indexOf('it') > -1) {
            lang = 'Italian';
            lt = 'Ciao e benvenuto!';
            happy = 'Happy';
            txt = 'Tutti i miei migliori auguri per questo nuovo anno';
        } else if (lang.indexOf('fr') > -1) {
            lang = 'French';
            lt = 'Salut et bienvenue de la part de Florian!';
            happy = 'Bonne Année';
            txt = 'Tous mes voeux de bonheur pour cette nouvelle année';
        } else if (lang.indexOf('es') > -1) {
            lang = 'Spanish';
            lt = 'Hola y bienvenidos!';
            happy = 'Happy';
            txt = 'Todos mis mejores deseos para este nuevo año';
        } else if (lang.indexOf('cn') > -1) {
            lang = 'Chinese';
            lt = 'Hello and welcome on behalf of Florian!';
            happy = 'Happy';
            txt = 'I wish you a beautiful, magical new year';
        } else if (lang.indexOf('gr') > -1) {
            lang = 'Greek';
            lt = 'Γεια σας και καλώς ήρθατε!';
            happy = 'Happy';
            txt = 'ΤIΣ ΚΑΛΥΤΕΡΕΣ ΕΥΧΕΣ ΓΙΑ ΤΟ ΝΕΟ ΕΤΟΣ';
        } else if (lang.indexOf('pl') > -1) {
            lang = 'Polish';
            lt = 'Witam i zapraszam!';
            happy = 'Happy';
            txt = 'Wszystkie moje najlepsze życzenia dla nowego roku';
        } else if (lang.indexOf('jp') > -1) {
            lang = 'Japanese';
            lt = 'Γεια σας και καλώς ήρθατε!';
            happy = 'Happy';
            txt = 'I wish you a beautiful, magical new year';
        } else if (lang.indexOf('in') > -1) {
            lang = 'Hindi';
            lt = 'नमस्ते और आपका स्वागत है!';
            happy = 'Happy';
            txt = 'इस नए साल के लिए सभी शुभकामनाएं';
        } else if (lang.indexOf('ru') > -1) {
            lang = 'Russian';
            lt = 'Здравствуйте и добро пожаловать!';
            happy = 'Happy';
            txt = 'Все мои наилучшие пожелания в новом году';
        } else if (lang.indexOf('kr') > -1) {
            lang = 'Korean';
            lt = 'Hello and welcome on behalf of Florian!';
            happy = 'Happy';
            txt = 'I wish you a beautiful, magical new year';
        } else {
            lang = 'English';
            lt = 'Hello and welcome on behalf of Florian!';
            happy = 'Happy';
            txt = 'I wish you a beautiful, magical new year';
        }
        // Referrer
        var referer = document.referrer;
        if (referer === '') {
            referer = 'Direct link';
        }
        // Technology, Browser Interrogation
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
            }, {
                // for newer Netscapes (6+)
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
            }, {
                // for older Netscapes (4-)
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
        var os = BrowserDetect.OS;
        var browser = BrowserDetect.browser;
        var version = BrowserDetect.version;
        var width = screen.width;
        var height = screen.height;
        
        // TeleType
        setTimeout(function() {
            $('#referrer').teletype({
                animDelay: 20,
                text: '> Request-Origin: ' + referer
            });
        }, 900);
        setTimeout(function() {
            $('#tech').teletype({
                animDelay: 20,
                text: '> Tech footprint... OS: ' + os + '... Browser: ' + browser + ' ' + version + '... Screen res: ' + width + 'x' + height + '(px)'
            });
        }, 2000);
        setTimeout(function() {
            $('#tracking').teletype({
                animDelay: 20,
                text: '> Visitor located... latitude: ' + latitude + ' - longitude: ' + longitude + '... Country: ' + country
            });
        }, 4100);
        setTimeout(function() {
            $('#language').teletype({
                animDelay: 20,
                text: '> Spoken language is ' + lang + '... ' + lt
            });
        }, 6400);
        setTimeout(function() {
            $('#inp').removeClass('hide').teletype({
                animDelay: 35,
                text: '> Please type your first name and press enter:'
            });
        }, 8000);
        // Generating Wishes
        $('#form').submit(function() {
            var fname = $('#fname').val().capitalize();

            $('#loading').empty().append('Florian says:/$ Thank you ' + fname + '. Generating message based on your location, language and first name...');
            setTimeout(function() {
                $('#nav,#footer,#wishes').hide('slow');
                $('#msg').fadeIn('slow').removeClass('hide').css({
                    'background': 'url("' + img + '.jpg") no-repeat 0 0'
                });
                $('h1').append(happy + ' ' + yr + ' ' + fname + '!');
                $('h2').append(txt + '...');
                $('#infots').append(credits + ' - NASA (ISS, 2012)');
            }, 2500);
            goFullscreen('msg');
            //////////Youtube
            $('#play i').live('click', function() {
                $("#play").empty().append('Press Enter to close video').delay(1500).fadeOut('slow');
                setTimeout(function() {
                    $('#msg').css('opacity', '0.1');
                    $('h1,h2,#details,#play').fadeOut('fast');
                    $("#video").removeClass('hide').append('<iframe id="frame" width="800" height="450" src="https://www.youtube-nocookie.com/embed/Ip2ZGND1I9Q?showinfo=0&theme=dark&autoplay=1" frameborder="0" allowfullscreen></iframe>').fadeIn('slow');
                }, 1500);
            }); //#Youtube

            function Escape() {
                $("#video").empty().addClass('hide');
                $("#play").empty().append('<i class="icon-play"></i>');
                $('h1,h2,#details,#play').fadeIn('fast');
                $('#msg').css('opacity', '1');
            }
            $('#closevid').live('click', function() {
                Escape();
            });
            $(document).keyup(function(e) {
                if (e.keyCode == 13) {
                    Escape();
                }
            });
            return false;
        });
        // #JSON
    });
    // End jQuery Ready
});
