if (!window.gdeslon_q || window.gdeslon_q instanceof Array) {
    var hasPerformance = "undefined" !== typeof performance && "function" === typeof performance.now;
    var perf = hasPerformance ? performance.now() : null;
    var oldQueue = window.gdeslon_q || [];
    window.gdeslon_q = function() {
        var _exceptions = [],
            _state = {},
            appendScript = function(url) {
                var gss = document.createElement("script");
                gss.type = "text/javascript";
                gss.async = true;
                gss.src = url;
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(gss, s)
            },
            serializeObject = function(obj) {
                return Object.keys(obj).map(function(key) {
                    return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
                }).join("&")
            },
            deserializeObject = function(str, pairsSeparator, keyValueSeparator) {
                var result = {},
                    pairs, pair, key, value, i, l;
                if (!keyValueSeparator) {
                    keyValueSeparator = "="
                }
                if (!str) {
                    return result
                }
                pairs = str.split(pairsSeparator);
                for (i = 0, l = pairs.length; i < l; i++) {
                    pair = pairs[i].replace(/^\s+|\s+$/g, "").split(keyValueSeparator);
                    try {
                        key = decodeURIComponent(pair[0]);
                        value = decodeURIComponent(pair[1]);
                        result[key] = value
                    } catch (e) {
                        console.log(e.message)
                    }
                }
                return result
            },
            location = function() {
                return document.location
            }(),
            domain = function() {
                var domain = location.hostname || location.host.split(":")[0];
                var domainParts = domain.split(".");
                var l = domainParts.length;
                if (l > 1) {
                    domain = domainParts[l - 2] + "." + domainParts[l - 1]
                }
                return domain
            }(),
            queryParams = function() {
                return deserializeObject(location.search.slice(1), "&")
            }(),
            cookieTtl = function() {
                var cookieTtl = parseInt(queryParams._gs_cttl, 10);
                if (!cookieTtl || isNaN(cookieTtl)) {
                    cookieTtl = 180
                }
                return cookieTtl
            }(),
            writeCookie = function(name, value, ttlSeconds) {
                if (!(name && value)) {
                    return
                }
                value = encodeURIComponent(value);
                var ttl = ttlSeconds || cookieTtl * 24 * 60 * 60;
                var date = new Date;
                date.setTime(date.getTime() + ttl * 1e3);
                var expires = "; expires=" + date.toUTCString();
                var domainParam = "domain=" + domain + "; ";
                document.cookie = name + "=" + value + expires + "; " + domainParam + "path=/;"
            },
            cookies = function(key) {
                return deserializeObject(document.cookie, ";")[key]
            },
            token = function() {
                return cookies("gdeslon.kokoc.com.__arc_token")
            },
            affiliate_id = function() {
                return cookies("gdeslon.kokoc.com.__arc_aid")
            },
            track_domain = function() {
                return cookies("gdeslon.kokoc.com.__arc_domain") || "gdeslon.kokoc.com"
            },
            pixel_domain = function() {
                return cookies("gdeslon.kokoc.com.__arc_gsp_domain") || "gdeslon.kokoc.com"
            },
            gs_uid = function() {
                return cookies("gdeslon.kokoc.com.user_id")
            },
            processor = function() {
                _state.pushStartedAt = Date.now();
                var pixel = [];
                var track = [];
                if (arguments.length === 0) {
                    return
                }
                var obj = arguments[0];
                var shouldInvokeTrack = false;
                Object.keys(obj).forEach(function(key) {
                    var val = obj[key];
                    var same = "";
                    switch (key) {
                        case "page_type":
                            pixel.mode = val;
                            break;
                        case "merchant_id":
                            pixel.mid = val;
                            track.merchant_id = val;
                            break;
                        case "category_id":
                            pixel.cat_id = val;
                            track.cat_id = val;
                            break;
                        case "products":
                            if (!val || val.constructor !== Array) break;
                            same = val.map(function(l) {
                                var repeats = [];
                                for (var i = 0; i < parseFloat(l.quantity); i++) {
                                    repeats.push(l.id + ":" + parseFloat(l.price))
                                }
                                return repeats.join(",")
                            });
                            pixel.codes = same;
                            track.codes = same;
                            break;
                        case "user_id":
                            pixel.muid = val;
                            track.muid = val;
                            break;
                        default:
                            pixel[key] = val;
                            track[key] = val;
                            break
                    }
                });
                if (obj.page_type === "thanks") {
                    if (obj.hasOwnProperty("deduplication")) {
                        if (Object.prototype.toString.call(obj.deduplication) === "[object String]") {
                            var trueArr = ["gdeslon_cpa", "gdeslon", "gde slon", "", "undefined", "null", "true", "1"];
                            shouldInvokeTrack = trueArr.indexOf(obj.deduplication.toLowerCase()) > -1
                        } else {
                            shouldInvokeTrack = true
                        }
                    } else {
                        shouldInvokeTrack = true
                    }
                }
                pixel.perf = parseInt(perf, 10);
                track.perf = pixel.perf;
                pixel.gs_uid = gs_uid();
                track.gs_uid = pixel.gs_uid;
                pixel._t = Date.now();
                track._t = Date.now();
                pixel.source = window.location.href;
                var url = "//" + pixel_domain() + "/gsp.js?" + serializeObject(pixel);
                appendScript(url);
                if (shouldInvokeTrack) {
                    _state.shouldInvokeTrack = true;
                    track.affiliate_id = affiliate_id();
                    track.token = token();
                    url = "//" + track_domain() + "/purchase.js?" + serializeObject(track);
                    appendScript(url)
                } else {
                    _state.shouldInvokeTrack = false
                }
                _state.pushFinishedAt = Date.now()
            },
            _push = function() {
                try {
                    return processor.apply(null, arguments)
                } catch (c) {
                    _exceptions.push(c);
                    var url = "https://gdeslon.kokoc.com/error.js?" + serializeObject({
                        message: c.message
                    });
                    appendScript(url)
                }
            };
        if (queryParams.gsaid) {
            writeCookie("gdeslon.kokoc.com.__arc_aid", queryParams.gsaid)
        }
        if (queryParams._gs_ref) {
            writeCookie("gdeslon.kokoc.com.__arc_token", queryParams._gs_ref)
        }
        if (queryParams._gs_vm) {
            writeCookie("gdeslon.kokoc.com.__arc_domain", queryParams._gs_vm)
        }
        if (queryParams._gs_ld) {
            writeCookie("gdeslon.kokoc.com.__arc_gsp_domain", queryParams._gs_ld)
        }
        return {
            push: _push,
            exceptions: _exceptions,
            state: _state
        }
    }();
    window.gdeslon_q.push.apply(null, oldQueue)
}
