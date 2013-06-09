/*
 *   JavaScript interface for the SoundCloud Player widget
 *   Author: Matas Petrikas, matas@soundcloud.com
 *   Copyright (c) 2009  SoundCloud Ltd.
 *   Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function() {
    var b = (/msie/i).test(navigator.userAgent) && !(/opera/i).test(navigator.userAgent);
    var a = window.soundcloud = {
        version: "0.1",
        debug: false,
        _listeners: [],
        _redispatch: function(c, n, g) {
            var j, m = this._listeners[c] || [],
                d = "soundcloud:" + c;
            try {
                j = this.getPlayer(n)
            } catch (k) {
                if (this.debug && window.console) {
                    console.error("unable to dispatch widget event " + c + " for the widget id " + n, g, k)
                }
                return
            }
            if (window.jQuery) {
                jQuery(j).trigger(d, [g])
            } else {
                if (window.Prototype) {
                    $(j).fire(d, g)
                } else {}
            }
            for (var h = 0, f = m.length; h < f; h += 1) {
                m[h].apply(j, [j, g])
            }
            if (this.debug && window.console) {
                console.log(d, c, n, g)
            }
        },
        addEventListener: function(c, d) {
            if (!this._listeners[c]) {
                this._listeners[c] = []
            }
            this._listeners[c].push(d)
        },
        removeEventListener: function(e, g) {
            var f = this._listeners[e] || [];
            for (var d = 0, c = f.length; d < c; d += 1) {
                if (f[d] === g) {
                    f.splice(d, 1)
                }
            }
        },
        getPlayer: function(f) {
            var c;
            try {
                if (!f) {
                    throw "The SoundCloud Widget DOM object needs an id atribute, please refer to SoundCloud Widget API documentation."
                }
                c = b ? window[f] : document[f];
                if (c) {
                    if (c.api_getFlashId) {
                        return c
                    } else {
                        throw "The SoundCloud Widget External Interface is not accessible. Check that allowscriptaccess is set to 'always' in embed code"
                    }
                } else {
                    throw "The SoundCloud Widget with an id " + f + " couldn't be found"
                }
            } catch (d) {
                if (console && console.error) {
                    console.error(d)
                }
                throw d
            }
        },
        onPlayerReady: function(c, d) {
            this._redispatch("onPlayerReady", c, d)
        },
        onMediaStart: function(c, d) {
            this._redispatch("onMediaStart", c, d)
        },
        onMediaEnd: function(c, d) {
            this._redispatch("onMediaEnd", c, d)
        },
        onMediaPlay: function(c, d) {
            this._redispatch("onMediaPlay", c, d)
        },
        onMediaPause: function(c, d) {
            this._redispatch("onMediaPause", c, d)
        },
        onMediaBuffering: function(c, d) {
            this._redispatch("onMediaBuffering", c, d)
        },
        onMediaSeek: function(c, d) {
            this._redispatch("onMediaSeek", c, d)
        },
        onMediaDoneBuffering: function(c, d) {
            this._redispatch("onMediaDoneBuffering", c, d)
        },
        onPlayerError: function(c, d) {
            this._redispatch("onPlayerError", c, d)
        }
    }
})();
/*
 *   SoundCloud Custom Player jQuery Plugin
 *   Author: Matas Petrikas, matas@soundcloud.com
 *   Copyright (c) 2009  SoundCloud Ltd.
 *   Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
/*
 *   SoundCloud Custom Player jQuery Plugin
 *   Author: Matas Petrikas, matas@soundcloud.com
 *   Copyright (c) 2009  SoundCloud Ltd.
 *   Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 *   Usage:
 *   <a href="http://soundcloud.com/matas/hobnotropic" class="sc-player">My new dub track</a>
 *   The link will be automatically replaced by the HTML based player
 */
(function(e) {
    var C = function(J) {
            var K = function(L) {
                    return {
                        h: Math.floor(L / (60 * 60 * 1000)),
                        m: Math.floor((L / 60000) % 60),
                        s: Math.floor((L / 1000) % 60)
                    }
                }(J),
                I = [];
            if (K.h > 0) {
                I.push(K.h)
            }
            I.push((K.m < 10 && K.h > 0 ? "0" + K.m : K.m));
            I.push((K.s < 10 ? "0" + K.s : K.s));
            return I.join(".")
        };
    var g = function(I) {
            I.sort(function() {
                return 1 - Math.floor(Math.random() * 3)
            });
            return I
        };
    var x = true,
        b = false,
        k = e(document),
        j = function(I) {
            try {
                if (x && window.console && window.console.log) {
                    window.console.log.apply(window.console, arguments)
                }
            } catch (J) {}
        },
        H = b ? "sandbox-soundcloud.com" : "soundcloud.com",
        o = (document.location.protocol === "https:"),
        v = function(I, L) {
            var K = (o || (/^https/i).test(I) ? "https" : "http") + "://api." + H + "/resolve?url=",
                J = "format=json&consumer_key=" + L + "&callback=?";
            if (o) {
                I = I.replace(/^http:/, "https:")
            }
            if ((/api\./).test(I)) {
                return I + "?" + J
            } else {
                return K + I + "&" + J
            }
        };
    var i = function() {
            var J = function() {
                    var N = false;
                    try {
                        var M = new Audio();
                        N = M.canPlayType && (/maybe|probably/).test(M.canPlayType("audio/mpeg"))
                    } catch (O) {}
                    return N
                }(),
                K = {
                    onReady: function() {
                        k.trigger("scPlayer:onAudioReady")
                    },
                    onPlay: function() {
                        k.trigger("scPlayer:onMediaPlay")
                    },
                    onPause: function() {
                        k.trigger("scPlayer:onMediaPause")
                    },
                    onEnd: function() {
                        k.trigger("scPlayer:onMediaEnd")
                    },
                    onBuffer: function(M) {
                        k.trigger({
                            type: "scPlayer:onMediaBuffering",
                            percent: M
                        })
                    }
                };
            var L = function() {
                    var M = new Audio(),
                        N = function(Q) {
                            var R = Q.target,
                                P = ((R.buffered.length && R.buffered.end(0)) / R.duration) * 100;
                            K.onBuffer(P);
                            if (R.currentTime === R.duration) {
                                K.onEnd()
                            }
                        },
                        O = function(Q) {
                            var R = Q.target,
                                P = ((R.buffered.length && R.buffered.end(0)) / R.duration) * 100;
                            K.onBuffer(P)
                        };
                    e('<div class="sc-player-engine-container"></div>').appendTo(document.body).append(M);
                    M.addEventListener("play", K.onPlay, false);
                    M.addEventListener("pause", K.onPause, false);
                    M.addEventListener("timeupdate", N, false);
                    M.addEventListener("progress", O, false);
                    return {
                        load: function(P, Q) {
                            M.pause();
                            M.src = P.stream_url + (/\?/.test(P.stream_url) ? "&" : "?") + "consumer_key=" + Q;
                            M.load();
                            M.play()
                        },
                        play: function() {
                            M.play()
                        },
                        pause: function() {
                            M.pause()
                        },
                        stop: function() {
                            if (M.currentTime) {
                                M.currentTime = 0;
                                M.pause()
                            }
                        },
                        seek: function(P) {
                            M.currentTime = M.duration * P;
                            M.play()
                        },
                        getDuration: function() {
                            return M.duration * 1000
                        },
                        getPosition: function() {
                            return M.currentTime * 1000
                        },
                        setVolume: function(P) {
                            M.volume = P / 100
                        }
                    }
                };
            var I = function() {
                    var M = "scPlayerEngine",
                        N, O = function(P) {
                            var Q = (o ? "https" : "http") + "://player." + H + "/player.swf?url=" + P + "&amp;enable_api=true&amp;player_type=engine&amp;object_id=" + M;
                            if (e.browser.msie) {
                                return '<object height="100%" width="100%" id="' + M + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" data="' + Q + '"><param name="movie" value="' + Q + '" /><param name="allowscriptaccess" value="always" /></object>'
                            } else {
                                return '<object height="100%" width="100%" id="' + M + '"><embed allowscriptaccess="always" height="100%" width="100%" src="' + Q + '" type="application/x-shockwave-flash" name="' + M + '" /></object>'
                            }
                        };
                    soundcloud.addEventListener("onPlayerReady", function(P, Q) {
                        N = soundcloud.getPlayer(M);
                        K.onReady()
                    });
                    soundcloud.addEventListener("onMediaEnd", K.onEnd);
                    soundcloud.addEventListener("onMediaBuffering", function(P, Q) {
                        K.onBuffer(Q.percent)
                    });
                    soundcloud.addEventListener("onMediaPlay", K.onPlay);
                    soundcloud.addEventListener("onMediaPause", K.onPause);
                    return {
                        load: function(P) {
                            var Q = P.uri;
                            if (N) {
                                N.api_load(Q)
                            } else {
                                e('<div class="sc-player-engine-container"></div>').appendTo(document.body).html(O(Q))
                            }
                        },
                        play: function() {
                            N && N.api_play()
                        },
                        pause: function() {
                            N && N.api_pause()
                        },
                        stop: function() {
                            N && N.api_stop()
                        },
                        seek: function(P) {
                            N && N.api_seekTo((N.api_getTrackDuration() * P))
                        },
                        getDuration: function() {
                            return N && N.api_getTrackDuration && N.api_getTrackDuration() * 1000
                        },
                        getPosition: function() {
                            return N && N.api_getTrackPosition && N.api_getTrackPosition() * 1000
                        },
                        setVolume: function(P) {
                            if (N && N.api_setVolume) {
                                N.api_setVolume(P)
                            }
                        }
                    }
                };
            return J ? L() : I()
        }();
    var F, u = false,
        c = [],
        q = {},
        E, l = function(M, I, K) {
            var J = 0,
                N = {
                    node: M,
                    tracks: []
                },
                L = function(O) {
                    var P = v(O.url, F);
                    e.getJSON(P, function(Q) {
                        J += 1;
                        if (Q.tracks) {
                            N.tracks = N.tracks.concat(Q.tracks)
                        } else {
                            if (Q.duration) {
                                Q.permalink_url = O.url;
                                N.tracks.push(Q)
                            } else {
                                if (Q.creator) {
                                    I.push({
                                        url: Q.uri + "/tracks"
                                    })
                                } else {
                                    if (Q.username) {
                                        if (/favorites/.test(O.url)) {
                                            I.push({
                                                url: Q.uri + "/favorites"
                                            })
                                        } else {
                                            I.push({
                                                url: Q.uri + "/tracks"
                                            })
                                        }
                                    } else {
                                        if (e.isArray(Q)) {
                                            N.tracks = N.tracks.concat(Q)
                                        }
                                    }
                                }
                            }
                        }
                        if (I[J]) {
                            L(I[J])
                        } else {
                            N.node.trigger({
                                type: "onTrackDataLoaded",
                                playerObj: N,
                                url: P
                            })
                        }
                    })
                };
            F = K;
            c.push(N);
            L(I[J])
        },
        f = function(I, J) {
            if (J) {
                return '<div class="sc-loading-artwork">Loading Artwork</div>'
            } else {
                if (I.artwork_url) {
                    return '<img src="' + I.artwork_url.replace("-large", "-t300x300") + '"/>'
                } else {
                    return '<div class="sc-no-artwork">No Artwork</div>'
                }
            }
        },
        z = function(J, I) {
            e(".sc-info", J).each(function(L) {
                var K = I.title;
                e("h3", this).html('<a href="' + I.permalink_url + '">' + K.replace(/\s*\(.*?\)\s*/g, "") + "</a>");
                e("h4", this).html('by <a href="' + I.user.permalink_url + '">' + I.user.username + "</a>");
                e("p", this).html(I.description || "no Description")
            });
            e(".sc-artwork-list li", J).each(function(M) {
                var K = e(this),
                    L = K.data("sc-track");
                if (L === I) {
                    K.addClass("active").find(".sc-loading-artwork").each(function(N) {
                        e(this).removeClass("sc-loading-artwork").html(f(I, false))
                    })
                } else {
                    K.removeClass("active")
                }
            });
            e(".sc-duration", J).html(C(I.duration));
            e(".sc-waveform-container", J).html('<img src="' + I.waveform_url + '" />');
            J.trigger("onPlayerTrackSwitch.scPlayer", [I])
        },
        D = function(I) {
            var J = I.permalink_url;
            if (E === J) {
                i.play()
            } else {
                E = J;
                i.load(I, F)
            }
        },
        t = function(I) {
            return c[e(I).data("sc-player").id]
        },
        s = function(J, I) {
            if (I) {
                e("div.sc-player.playing").removeClass("playing")
            }
            e(J).toggleClass("playing", I).trigger((I ? "onPlayerPlay" : "onPlayerPause"))
        },
        w = function(J, K) {
            var I = t(J).tracks[K || 0];
            z(J, I);
            q = {
                $buffer: e(".sc-buffer", J),
                $played: e(".sc-played", J),
                position: e(".sc-position", J)[0]
            };
            s(J, true);
            D(I)
        },
        B = function(I) {
            s(I, false);
            i.pause()
        },
        G = function() {
            var I = q.$played.closest(".sc-player"),
                J;
            q.$played.css("width", "0%");
            q.position.innerHTML = C(0);
            s(I, false);
            i.stop();
            I.trigger("onPlayerTrackFinish")
        },
        A = function(I, J) {
            i.seek(J);
            e(I).trigger("onPlayerSeek")
        },
        n = function(I) {
            var J = e(I);
            j("track finished get the next one");
            $nextItem = e(".sc-trackslist li.active", J).next("li");
            if (!$nextItem.length) {
                $nextItem = J.nextAll("div.sc-player:first").find(".sc-trackslist li.active")
            }
            $nextItem.click()
        },
        m = function() {
            var K = 80,
                I = document.cookie.split(";"),
                L = new RegExp("scPlayer_volume=(\\d+)");
            for (var J in I) {
                if (L.test(I[J])) {
                    K = parseInt(I[J].match(L)[1], 10);
                    break
                }
            }
            return K
        }(),
        a = function(K) {
            var J = Math.floor(K);
            var I = new Date();
            I.setTime(I.getTime() + (365 * 24 * 60 * 60 * 1000));
            m = J;
            document.cookie = ["scPlayer_volume=", J, "; expires=", I.toUTCString(), '; path="/"'].join("");
            i.setVolume(m)
        },
        p;
    k.bind("scPlayer:onAudioReady", function(I) {
        j("onPlayerReady: audio engine is ready");
        i.play();
        a(m)
    }).bind("scPlayer:onMediaPlay", function(I) {
        clearInterval(p);
        p = setInterval(function() {
            var L = i.getDuration(),
                J = i.getPosition(),
                K = (J / L);
            q.$played.css("width", (100 * K) + "%");
            q.position.innerHTML = C(J);
            k.trigger({
                type: "onMediaTimeUpdate.scPlayer",
                duration: L,
                position: J,
                relative: K
            })
        }, 500)
    }).bind("scPlayer:onMediaPause", function(I) {
        clearInterval(p);
        p = null
    }).bind("scPlayer:onVolumeChange", function(I) {
        a(I.volume)
    }).bind("scPlayer:onMediaEnd", function(I) {
        G()
    }).bind("scPlayer:onMediaBuffering", function(I) {
        q.$buffer.css("width", I.percent + "%")
    });
    e.scPlayer = function(S, K) {
        var I = e.extend({}, e.scPlayer.defaults, S),
            L = c.length,
            P = K && e(K),
            T = P[0].className.replace("sc-player", ""),
            Q = I.links || e.map(e("a", P).add(P.filter("a")), function(U) {
                return {
                    url: U.href,
                    title: U.innerHTML
                }
            }),
            M = e('<div class="sc-player loading"></div>').data("sc-player", {
                id: L
            }),
            R = e('<ol class="sc-artwork-list"></ol>').appendTo(M),
            J = e('<div class="sc-info"><h3></h3><h4></h4><p></p><a href="#" class="sc-info-close">X</a></div>').appendTo(M),
            O = e('<div class="sc-controls"></div>').appendTo(M),
            N = e('<ol class="sc-trackslist"></ol>').appendTo(M);
        if (T || I.customClass) {
            M.addClass(T).addClass(I.customClass)
        }
        M.find(".sc-controls").append('<a href="#play" class="sc-play"><i class="icon-play"></i></a> <a href="#pause" class="sc-pause"><i class="icon-pause"></i></a>').end().append('<a href="#info" class="sc-info-toggle">Info</a>').append('<div class="sc-scrubber"></div>').find(".sc-scrubber").append('<div class="sc-volume-slider"><span class="sc-volume-status" style="width:' + m + '%"></span></div>').append('<div class="sc-time-span"><div class="sc-waveform-container"></div><div class="sc-buffer"></div><div class="sc-played"></div></div>').append('<div class="sc-time-indicators"><i class="icon-volume-down"></i><span class="sc-position"></span> | <span class="sc-duration"></span></div>');
        l(M, Q, I.apiKey);
        M.bind("onTrackDataLoaded.scPlayer", function(V) {
            var U = V.playerObj.tracks;
            if (I.randomize) {
                U = g(U)
            }
            e.each(U, function(X, W) {
                var Y = X === 0;
                e('<li><a href="' + W.permalink_url + '">' + W.title + '</a><span class="sc-track-duration">' + C(W.duration) + "</span></li>").data("sc-track", {
                    id: X
                }).toggleClass("active", Y).appendTo(N);
                e("<li></li>").append(f(W, X >= I.loadArtworks)).appendTo(R).toggleClass("active", Y).data("sc-track", W)
            });
            M.each(function() {
                if (e.isFunction(I.beforeRender)) {
                    I.beforeRender.call(this, U)
                }
            });
            e(".sc-duration", M)[0].innerHTML = C(U[0].duration);
            e(".sc-position", M)[0].innerHTML = C(0);
            z(M, U[0]);
            if (I.continuePlayback) {
                M.bind("onPlayerTrackFinish", function(W) {
                    n(M)
                })
            }
            M.removeClass("loading").trigger("onPlayerInit");
            if (I.autoPlay && !u) {
                w(M);
                u = true
            }
        });
        P.each(function(U) {
            e(this).replaceWith(M)
        });
        return M
    };
    e.scPlayer.stopAll = function() {
        e(".sc-player.playing a.sc-pause").click()
    };
    e.scPlayer.destroy = function() {
        e(".sc-player, .sc-player-engine-container").remove()
    };
    e.fn.scPlayer = function(I) {
        u = false;
        this.each(function() {
            e.scPlayer(I, this)
        });
        return this
    };
    e.scPlayer.defaults = e.fn.scPlayer.defaults = {
        customClass: null,
        beforeRender: function(I) {
            var J = e(this)
        },
        onDomReady: function() {
            e("a.sc-player, div.sc-player").scPlayer()
        },
        autoPlay: false,
        continuePlayback: true,
        randomize: false,
        loadArtworks: 5,
        apiKey: "htuiRd1JP11Ww0X72T1C3g"
    };
    e("a.sc-play, a.sc-pause").live("click", function(J) {
        var I = e(this).closest(".sc-player").find("ol.sc-trackslist");
        I.find("li.active").click();
        return false
    });
    e("a.sc-info-toggle, a.sc-info-close").live("click", function(J) {
        var I = e(this);
        I.closest(".sc-player").find(".sc-info").toggleClass("active").end().find("a.sc-info-toggle").toggleClass("active");
        return false
    });
    e(".sc-trackslist li").live("click", function(I) {
        var M = e(this),
            J = M.closest(".sc-player"),
            L = M.data("sc-track").id,
            K = J.is(":not(.playing)") || M.is(":not(.active)");
        if (K) {
            w(J, L)
        } else {
            B(J)
        }
        M.addClass("active").siblings("li").removeClass("active");
        e(".artworks li", J).each(function(N) {
            e(this).toggleClass("active", N === L)
        });
        return false
    });
    var r = function(L, O) {
            var K = e(L).closest(".sc-time-span"),
                J = K.find(".sc-buffer"),
                I = K.find(".sc-waveform-container img"),
                N = K.closest(".sc-player"),
                M = Math.min(J.width(), (O - I.offset().left)) / I.width();
            A(N, M)
        };
    var d = function(I) {
            if (I.targetTouches.length === 1) {
                r(I.target, I.targetTouches && I.targetTouches.length && I.targetTouches[0].clientX);
                I.preventDefault()
            }
        };
    e(".sc-time-span").live("click", function(I) {
        r(this, I.pageX);
        return false
    }).live("touchstart", function(I) {
        this.addEventListener("touchmove", d, false);
        I.originalEvent.preventDefault()
    }).live("touchend", function(I) {
        this.removeEventListener("touchmove", d, false);
        I.originalEvent.preventDefault()
    });
    var y = function(N, J) {
            var K = e(N),
                L = K.offset().left,
                I = K.width(),
                M = function(P) {
                    return Math.floor(((P - L) / I) * 100)
                },
                O = function(P) {
                    k.trigger({
                        type: "scPlayer:onVolumeChange",
                        volume: M(P.pageX)
                    })
                };
            K.bind("mousemove.sc-player", O);
            O(J)
        };
    var h = function(J, I) {
            e(J).unbind("mousemove.sc-player")
        };
    e(".sc-volume-slider").live("mousedown", function(I) {
        y(this, I)
    }).live("mouseup", function(I) {
        h(this, I)
    });
    k.bind("scPlayer:onVolumeChange", function(I) {
        e("span.sc-volume-status").css({
            width: I.volume + "%"
        })
    });
    e(function() {
        if (e.isFunction(e.scPlayer.defaults.onDomReady)) {
            e.scPlayer.defaults.onDomReady()
        }
    })
})(jQuery);
