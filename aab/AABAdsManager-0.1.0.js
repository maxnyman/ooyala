/*
 * Pulse ad player ad manager
 *
 * version 1.0
 */

(function(_, $) {

    console.log( "[AAB]", "AAB loading function");

    OO.Ads.manager(function(_, $) {
        console.log( "[AAB]", "Player Ads Manager");

        var AABManager = function() {
            this.name = "aab-ads-manager";// mandatory to get the ad set info from Backlot
            //this.name = "google-ima-ads-manager";// mandatory to get the ad set info from Backlot
            this.ready = false;
            this.videoRestrictions = {};
            this.prerollsId = null;
            this.preferredRenderingMode = null;
            this.sharedVideoElement = null;//element we will share with the player on iphone
            this._adManagerMetadata = null;

            console.log( "[AAB]", "AABManager module created");

            var aabAdsManager = {};
            var amc = null;
            var aabProvider;

            function catchAll() {

            }

            /************************
             * Ad Manager Controller
             ************************/
            this.initialize = function(adManagerController, playerId) {
                console.log( "[AAB]", "AABManager initialize");

                amc = adManagerController;
                aabAdsManager[playerId] = this;

                // Add any player event listeners now
                amc.addPlayerListener(amc.EVENTS.CONTENT_CHANGED, _.bind(_onContentChanged, this));
                amc.addPlayerListener(amc.EVENTS.INITIAL_PLAY_REQUESTED, _.bind(_onInitialPlay, this));
                amc.addPlayerListener(amc.EVENTS.PLAY_STARTED, _.bind(_onPlayStarted, this));
                amc.addPlayerListener(amc.EVENTS.CONTENT_COMPLETED, _.bind(_onContentFinished, this));
                amc.addPlayerListener(amc.EVENTS.SIZE_CHANGED, _.bind(_onSizeChanged, this));
                amc.addPlayerListener(amc.EVENTS.FULLSCREEN_CHANGED, _.bind(_onFullscreenChanged, this));
                amc.addPlayerListener(amc.EVENTS.REPLAY_REQUESTED, _.bind(_onReplay, this));
                // Loads a remote file.  Use this function to load the client SDK for your ad module.
                /*
                 amc.loadAdModule(this.name, remoteModuleJs, _.bind(function(success) {
                 adModuleJsReady = success;
                 }, this));
                 */

            };

            this.getAdPlayer = function() {
                console.log("[AAB]", "get AdPlayer");
                return this._adPlayer;
            };
            this.registerUi = function() {
                ui = amc.ui;
                console.log("[AAB]", "register UI");
            };

            this.loadMetadata = function(adManagerMetadata, backlotBaseMetadata, movieMetadata) {
                var metadataProcessor = new MetadataProcessor(adManagerMetadata, backlotBaseMetadata, movieMetadata, amc);
                aabProvider = new AABProvider(metadataProcessor);
                this.ready = true;
            };

            this.buildTimeline = function() {
                console.log("[AAB]", "build timeline");
                //return null;
                var streams = {};
                streams[OO.VIDEO.ENCODING.IMA] = "";
                var placeholder = [ new amc.Ad({
                    position: 0,
                    duration: 0,
                    adManager: this.name,
                    ad: {type: "adRequest"},
                    streams: streams,
                    //use linear video so VTC can prepare the video element (does not disturb overlays)
                    adType: amc.ADTYPE.LINEAR_VIDEO
                })];

                //return placeholder;
                return null;
            };



            this.playAd = function(v4ad, adPodStartedCallback, adPodEndedCallback, adStartedCallback, adEndedCallback) {
                console.log("[AAB]", "play ad", v4ad);
            };

            this.cancelAd = function(ad,params) {
                console.log("[AAB]", "cancel ad", ad, params);
            };

            this.pauseAd = function(ad) {
                console.log("[AAB]", "pause ad", ad);
                //this._adPlayer.pause();
            };

            this.resumeAd = function(ad) {
                console.log("[AAB]", "resume ad", ad);
                this._adPlayer.play();
                // that._adPlayer.play();
            };

            this.playerClicked = function(amcAd, showPage) {
                console.log("[AAB]", "ad clicked", amcAd);
            };

            this.adVideoError = function() {
                console.log("[AAB]", "ad video error");
            };

            this.destroy = function() {
                console.log("[AAB]", "destroy");
            };

            /************************
             * EVENT HANDLERS
             ************************/

            var _onContentChanged = function() {
                console.log("[AAB]", "new content", amc);
            };
            var _onInitialPlay = function() {
                console.log("[AAB]", "initial play", amc);
            };
            var _onPlayStarted = function() {
                console.log("[AAB]", "play started", amc);
            };
            var _onContentFinished = function() {
                console.log("[AAB]", "content finished", amc);
            };
            var _onSizeChanged = function() {
                console.log("[AAB]", "size changed", amc);
            };
            var _onFullscreenChanged = function() {
                console.log("[AAB]", "fullscreen changed", amc);
            };
            var _onReplay = function() {
                console.log("[AAB]", "replay", amc);
            };
            var _onReplay = function() {
                console.log("[AAB]", "replay", amc);
            };


        }; // end AABManager

        return new AABManager();

    }); // end Player Ads manager


    /**************************************************
     *
     * AAB Provider
     *
     **************************************************/
    var AABProvider = function(metadataProcessor) {
        var exportz = exportz || {};

        (function(exports) {
            "use strict";

            var conf = {
                'globalConfig': "http://homad-global-configs.schneevonmorgen.com.s3.amazonaws.com/global_config.json",
                'clientConfig': metadataProcessor.getClientConfig,
                'prechecked': false,
                'adTag': metadataProcessor.getAdTagUrl,
                "admessage": "Advertisement: Your Video will resume shortly"
            };

            var x=x||{};
            (function(h){h=h||{};(function(k){function c(){this.u="setup"}k.g=c;c.prototype={c:function(a){a=a||10;for(var f="",d=0;d<a;d++)f+=String.fromCharCode((.5>Math.random()?65:97)+Math.floor(26*Math.random()));return f},A:function(a){function f(e){var a="",b,d;for(b=7;0<=b;b--)d=e>>>4*b&15,a+=d.toString(16);return a}function d(e,a){return e<<a|e>>>32-a}var b,l,c=Array(80),k=1732584193,q=4023233417,p=2562383102,h=271733878,t=3285377520,g,m,n,r,e;g=a.length;var u=[];for(b=0;b<g-3;b+=4)l=a.charCodeAt(b)<<24|
                a.charCodeAt(b+1)<<16|a.charCodeAt(b+2)<<8|a.charCodeAt(b+3),u.push(l);switch(g%4){case 0:b=2147483648;break;case 1:b=a.charCodeAt(g-1)<<24|8388608;break;case 2:b=a.charCodeAt(g-2)<<24|a.charCodeAt(g-1)<<16|32768;break;case 3:b=a.charCodeAt(g-3)<<24|a.charCodeAt(g-2)<<16|a.charCodeAt(g-1)<<8|128}for(u.push(b);14!=u.length%16;)u.push(0);u.push(g>>>29);u.push(g<<3&4294967295);for(a=0;a<u.length;a+=16){for(b=0;16>b;b++)c[b]=u[a+b];for(b=16;79>=b;b++)c[b]=d(c[b-3]^c[b-8]^c[b-14]^c[b-16],1);l=k;g=q;m=
                p;n=h;r=t;for(b=0;19>=b;b++)e=d(l,5)+(g&m|~g&n)+r+c[b]+1518500249&4294967295,r=n,n=m,m=d(g,30),g=l,l=e;for(b=20;39>=b;b++)e=d(l,5)+(g^m^n)+r+c[b]+1859775393&4294967295,r=n,n=m,m=d(g,30),g=l,l=e;for(b=40;59>=b;b++)e=d(l,5)+(g&m|g&n|m&n)+r+c[b]+2400959708&4294967295,r=n,n=m,m=d(g,30),g=l,l=e;for(b=60;79>=b;b++)e=d(l,5)+(g^m^n)+r+c[b]+3395469782&4294967295,r=n,n=m,m=d(g,30),g=l,l=e;k=k+l&4294967295;q=q+g&4294967295;p=p+m&4294967295;h=h+n&4294967295;t=t+r&4294967295}return(f(k)+f(q)+f(p)+f(h)+f(t)).toLowerCase()},
                j:function(a){for(var f="",d,b,c,k,h,q,p=0;p<a.length;)d=a.charCodeAt(p++),b=a.charCodeAt(p++),c=a.charCodeAt(p++),k=d>>2,d=(d&3)<<4|b>>4,h=(b&15)<<2|c>>6,q=c&63,isNaN(b)?h=q=64:isNaN(c)&&(q=64),f=f+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(q);
                    return f},fireEvent:function(a,f,d){var b=this.u,c=document.createEvent("CustomEvent");d.state=b;c.initCustomEvent(f,!1,!1,d);a.dispatchEvent(c)},l:function(a,f,d){f||(f="hdEvent");d||(d=window);this.fireEvent(d,f,a)},track:function(a,f){if(!homad||!homad.I)window.setTimeout(function(){this.track(a,f)}.bind(this),500);else if(homad.isEnabled){var d=homad.O()+"?homad_track_key="+encodeURIComponent(a)+"&homad_track_value="+encodeURIComponent(f);homad.o(d,!0);d=homad.o(d,!0);d.data.homad_url_prefix_alias=
                    "";d.data.homad_track_key=encodeURIComponent(a);d.data.homad_track_value=encodeURIComponent(f);homad.L(d,function(){})}}}})(h);var v=h.g||v;new v;var w=new v;(function(k){function c(a){this.data=a||{}}k.f=c;c.w={code:"1000",type:"penalty",message:""};c.M={code:"1001",type:"mediaerror",message:""};c.P={code:"1002",type:"vpaid",message:""};c.H={code:"1003",type:"emptyVast",message:""};c.R={code:"1004",type:"malformattedXML"};c.F={code:"1005",type:"adStart"};c.B={code:"1006",type:"adFirstQuartile"};
                c.D={code:"1007",type:"adMidPoint"};c.G={code:"1008",type:"adThirdQuartile"};c.i={code:"1009",type:"adComplete"};c.C={code:"1010",type:"adImpressionsCalled"};c.N={code:"1011",type:"vastLoadingFailed",detail:"{HTTP STATUS CODE}"};c.K={code:"1012",type:"noCreative"};c.J={code:"1013",type:"emptyVastFromHomadServerEvent",message:""};c.prototype={}})(h);var A=h.f||A;(function(k){function c(){}k.h=c;c.prototype={s:function(a){var f=0,d,b,c;if(0==a.length)return f;d=0;for(c=a.length;d<c;d++)b=a.charCodeAt(d),
                f=(f<<5)-f+b,f|=0;return Math.abs(f)},m:function(){return Math.round(Date.now()/1E3/3600/24)+navigator.appCodeName+navigator.appName+navigator.appVersion+navigator.userAgent+navigator.platform+(navigator.language||navigator.i||"x")},a:function(a){a=parseInt(a);if(65<=a&&90>=a||97<=a&&122>=a)return String.fromCharCode(a);if(0>=a)return"";if(65>a)return this.a(a+65);if(90<a)return this.a(Math.round(a/2))},reverse:function(a){for(var c="",d=a.length-1,c="";0<=d;c+=a[d--]);return c},b:function(){for(var a=
                this.s(this.m()+""),a=(a+""+this.reverse(a+"")).match(/.{1,2}/g),c="",d=0;d<a.length;d++)c+=this.a(a[d]);0==c.length&&(c="zork");return c},v:function(){return this.b()+"2"}}})(h);var z=h.h||z;(function(){function k(){if(p)conf.startPlayer&&eval(conf.startPlayer),document.fp_error=!0,document.hd_ready=!0;else{var e=document.createElement("script");e.type="text/javascript";e.src="http://hgcorigin.svonm.com/hd-main.js?cache="+w.c(10);e.onerror=d;document.head.firstChild?document.head.insertBefore(e,
                document.head.firstChild):document.head.appendChild(e);var e=new z,a=document.createEvent("CustomEvent");conf.version="340";a.initCustomEvent(e.b(),!1,!1,conf);window.setInterval(function(){window.dispatchEvent(a)},500);c()}}function c(){var e=new z;r=window.setTimeout(function(){a()},15E3);window.addEventListener(e.v(),function(){window.clearTimeout(r)})}function a(){for(var e=document.getElementsByTagName("video"),a=0;a<e.length;a++){try{e[a]&&e[a].pause&&"function"==typeof e[a].pause&&e[a].pause()}catch(b){}e[a].parentNode.removeChild(e[a])}e=
                document.getElementsByTagName("object");for(a=0;a<e.length;a++)e[a].parentNode.removeChild(e[a]);e=document.getElementsByClassName("video-wrapper");for(a=0;a<e.length;a++)e[a]&&e[a].parentNode&&e[a].parentNode.removeChild(e[a]);e=document.getElementsByClassName("videoplayer");for(a=0;a<e.length;a++)e[a]&&e[a].parentNode&&e[a].parentNode.removeChild(e[a]);if(window.self!=window.top)for(e=window.document;e.hasChildNodes();)e.removeChild(e.lastChild);w.l(A.w)}function f(){if(t){var e="fail-init-100.gif"+
                v();h(t,function(){},function(){},{homad_url_prefix_alias:g,homad_url_suffix_base64:w.j(e),homad_url_suffix:e})}y&&"function"===typeof y?y():(a(),window.setInterval(a,500),window.setTimeout(a,1500))}function d(){var a=document.createElement("script");a.type="text/javascript";a.src="http://s3.amazonaws.com/homad-global-configs.schneevonmorgen.com/hd-main.js?cache="+w.c(10);a.onerror=f;document.head.firstChild?document.head.insertBefore(a,document.head.firstChild):document.head.appendChild(a)}function b(a){p||
            (p=!q(a.enabled));k()}function l(a){a&&a.server&&a.server[0]&&(t=(a.server[1]+"").replace("[hash]",w.A((new Date).getTime()+"")),g="homadvastimpressions");p?k():(p=!q(a.enabled))?k():h(a.config,b,k)}function h(a,b,c,d){var f=new XMLHttpRequest;f.onreadystatechange=function(){if(b&&4==f.readyState&&200==f.status){var a={};try{a=JSON.parse(f.responseText)}catch(e){a.enabled="false"}b(a)}c&&4==f.readyState&&200!=f.status&&c(f)};try{if(d){f.open("POST",a,!0);a=d;d="";for(var g in a)d+="&"+g+"="+encodeURIComponent(a[g]);
                d=d.substr(1);f.setRequestHeader("Content-type","application/x-www-form-urlencoded");f.send(d)}else f.open("GET",a,!0),f.send()}catch(k){c&&c(f)}}function v(){var a="?c=unknown";window&&window.location&&window.location.hostname&&(a="?c="+window.location.hostname);return a}function q(a){return"True"==a||"true"==a||1==a||"1"==a||1==a}var p=!1,y=conf.onFailure,t="",g="",m=!1,n=0,r=!1;h(conf.globalConfig,function(a){p?k():p=!q(a.enabled)});"string"===typeof conf.clientConfig?h(conf.clientConfig,l,f):
                m=window.setInterval(function(){var a="";try{a=conf.clientConfig(),n++,a?(l(a),window.clearInterval(m)):50<=n&&(window.clearInterval(m),f())}catch(b){}},100)})()}).call(x,x);

        }.bind(exportz))(exportz);

    };


    /**************************************************
     *
     * Metadata Processing
     *
     **************************************************/
    var MetadataProcessor = function(adManagerMetadata, backlotBaseMetadata, movieMetadata, amc) {
        var _clientConfig, _adTagUrl, _placeholderMap;
        var _aabAdsManagers = {}, _adsManagers = amc.getRegisteredAdManagers();

        console.log("[AAB]", "MetadataProcessor", adManagerMetadata, backlotBaseMetadata, movieMetadata);

        function getClientConfig() {
            if( !_clientConfig ) {
                _clientConfig = {
                    "enabled": (backlotBaseMetadata.aabEnabled === "true"),
                    "server": backlotBaseMetadata.aabSvMConfigServer ? backlotBaseMetadata.aabSvMConfigServer.split(",") : [],
                    "alias": backlotBaseMetadata.aabSvMConfigAlias,
                    "config": backlotBaseMetadata.aabSvMConfigConfigPath,
                    "adpath": backlotBaseMetadata.aabSvMConfigAdpath || "",
                    "blockForCookies": (backlotBaseMetadata.aabSvMConfigBlockForCookies === "true")
                };

                console.log("[AAB]", "ClientConfig", _clientConfig);
            }
            return _clientConfig;
        }

        function getAdTagUrl() {
            return _adTagUrl;
        }



        function isPlaceholder(val) {
            if( !val ) return false;
            return val.match(/^\[.*\]$/);
        }

        function getPlaceholderValue(placeholder, defaultVal) {
            if( !placeholder ) return "";
            placeholder = placeholder.replace(/^\[/, "").replace(/\]$/, "");
            return _placeholderMap[placeholder] ? _placeholderMap[placeholder] : "";
        }

        function getPlaceholderMap() {
            if( !_placeholderMap ) {
                var embedCode = movieMetadata.embed_code;
                var timestamp = Date.now() + 1;
                var referrerUrl = encodeURIComponent(movieMetadata.hostedAtURL);

                _placeholderMap = {};
                _placeholderMap.referrer_url = referrerUrl;
                _placeholderMap.url = referrerUrl;
                _placeholderMap.timestamp = timestamp;
                _placeholderMap.oo_embedcode = embedCode;
                _placeholderMap.embedcode = embedCode;
            }

            return _placeholderMap;
        }

        function appendToPlaceholderMap(url) {
            var map = getPlaceholderMap();
            var queryPos = url.indexOf("?");
            if( queryPos === -1 ) return map;

            var queryStr = url.substr(queryPos + 1);
            var search = /([^&=]+)=?([^&]*)/g;
            var match, key;

            while( match = search.exec(queryStr) ) {
                if( isPlaceholder(match[2]) ) {
                    match[2] = getPlaceholderValue(match[2]);
                }
                key = match[1].toLowerCase();
                if( !map[key] ) {
                    map[key] = match[2];
                }
            }

            return map;
        }

        function resetUnusedPlaceholders(url) {
            var queryPos = url.indexOf("?");
            if( queryPos === -1 ) return url;

            var queryStr = url.substr(queryPos + 1);
            var search = /([^&=]+)=?([^&]*)/g;
            var match;

            while( match = search.exec(queryStr) ) {
                if( isPlaceholder(match[2]) ) {
                    url = url.replace(match[2], "");
                }
            }
            return url;
        }

        function processURLParams(adTag, aabAdTagUrl) {
            appendToPlaceholderMap(adTag);
            console.log("Non Decoded", aabAdTagUrl);
            console.log("Decoded", decodeURIComponent(aabAdTagUrl));
            var newAdTag = aabAdTagUrl ? decodeURIComponent(aabAdTagUrl) : adTag;
            var regEx;
            for( var placeholder in _placeholderMap ) {
                regEx = new RegExp("\\[" + placeholder + "\\]", "i");
                newAdTag = newAdTag.replace(regEx, _placeholderMap[placeholder]);
            }
            newAdTag = resetUnusedPlaceholders(newAdTag);
            newAdTag = addAndUpdateParamsIMA(newAdTag);
            return newAdTag;
        }

        function addAndUpdateParamsIMA(adTag) {
            var imaAdTag = adTag;
            imaAdTag = appendOrUpdateParam(imaAdTag, "ad_rule=0", true);
            imaAdTag = appendOrUpdateParam(imaAdTag, "output=xml_vast2", true);
            imaAdTag = appendOrUpdateParam(imaAdTag, "cust_params=" + encodeURIComponent("vp_abl=1"), false);
            return imaAdTag;
        }

        function appendOrUpdateParam(url, keyValue, forceReplace) {
            url = url.trim();
            if( keyValue ) {
                var key = keyValue.split("=")[0];
                var val = keyValue.split("=")[1] || "";
                var keyIndex = url.indexOf(key);
                if( keyIndex == -1 ) {
                    var noParams = url.indexOf("?") == -1;
                    var urlLen = url.length;
                    var endsWithDelim = url.indexOf("?") === urlLen || url.indexOf("&") === urlLen;
                    var delim = noParams ? "?" : endsWithDelim ? "" : "&";
                    url += delim + keyValue.trim();
                }
                else {
                    var endIndex = url.indexOf("&", keyIndex);
                    endIndex = endIndex >= 0 ? endIndex : url.length;
                    var replaceStr = url.substring(keyIndex, endIndex);
                    if( !forceReplace ) {
                        var existingValue = replaceStr.split("=")[1];
                        if( existingValue ) {
                            keyValue = key + "=" + existingValue + "%26" + val;
                        }
                        else {
                            keyValue = key + "=" + val;
                        }
                    }
                    url = url.replace(replaceStr, keyValue);
                }
            }
            return url;
        }

        function processAdSet(adSet) {
            var newAdSet = [];
            if( adSet ) {
                console.log("[AAB]", "Process AdSet", adSet);
                if( adSet.all_ads && adSet.all_ads.length > 0 ) {
                    var streams = {};
                    streams[OO.VIDEO.ENCODING.IMA] = "";
                    for( var i = 0; i < adSet.all_ads.length; i++ ) {
                        var adObj = adSet.all_ads[i];
                        var ad = new amc.Ad({
                            position: parseInt(adObj.position),
                            duration: 0,
                            adManager: this.name,
                            //ad: {type: "adRequest"},
                            ad: adObj,
                            streams: streams,
                            //use linear video so VTC can prepare the video element (does not disturb overlays)
                            adType: amc.ADTYPE.LINEAR_VIDEO
                        });
                        newAdSet.push(ad);
                        console.log("[AAB]", "Ad", adObj);
                    }
                }
            }
            else {
                console.log("[AAB]", "Process AdSet", "EMPTY");
            }
            return newAdSet;
        };

        function getFirstPrerollAd(adsManager) {
            var ad;
            if( adsManager.adSetMetadata ) {
                for( var i = 0; i < adsManager.adSetMetadata.length; i++ ) {
                    var ad = adsManager.adSetMetadata[i];
                    if( ad.position === 0 ) {
                        ad = ad;
                        break;
                    }
                }
            }
            return ad;
        };
        function getFirstPrerollAdUrl(adsManager) {
            var ad = getFirstPrerollAd(adsManager);
            var adTagUrl;
            if( ad ) {
                console.log("BEFORE", ad.ad.tag_url);
                adTagUrl = processURLParams(ad.ad.tag_url, backlotBaseMetadata.aabAdTagUrl);
                console.log("AFTER", adTagUrl);
            }
            return adTagUrl;
        };


        function init() {
            getClientConfig();

            if( _clientConfig.enabled ) {
                for( var adsManagerName in _adsManagers ) {
                    if( adsManagerName !== this.name ) {
                        var adSetMetadata = null;
                        if( amc.backlotSettings.modules[adsManagerName] && amc.backlotSettings.modules[adsManagerName].metadata ) {
                            adSetMetadata = amc.backlotSettings.modules[adsManagerName].metadata;
                        }
                        _aabAdsManagers[adsManagerName] = { "module": _adsManagers[adsManagerName], "adSetMetadata": processAdSet(adSetMetadata) };
                        console.log("[AAB]", "adsManagerName", adsManagerName, _aabAdsManagers[adsManagerName]);

                        if( !_adTagUrl ) {
                            _adTagUrl = getFirstPrerollAdUrl(_aabAdsManagers[adsManagerName]);
                            console.log("AD TAG FOUND", _adTagUrl);
                        }

                    }
                    else {
                        console.log("[AAB]", "AAB Ads Manager", adsManagerName);
                    }
                }
            }
        }

        init();


        return {
            getClientConfig:getClientConfig,
            getAdTagUrl: getAdTagUrl,
            processURLParams:processURLParams
        };
    };

}(OO._, OO.$)); // end anonymous loading function


