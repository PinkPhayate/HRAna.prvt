/*!
 * YDN JSflat V2 sample for partner - 2013/05/01
 *
 * Copyright (C) 2013 Yahoo Japan Corporation. All Rights Reserved.
 * @author v 1.0.0  Masatoshi Wakizaki
 *
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */
if (typeof YAHOO_YDN_V2 === "undefined") {
    YAHOO_YDN_V2 = {};
}
(function() {
    var Y = YAHOO_YDN_V2;
    if(typeof Y.JSflat !== "undefined"){
        return false;
    }
    Y.JSflat = (function(){
        //Local
        //var _printids = [],
        var _testparam = {},
        _encodeURL = function(str){
            var s0, i, s, u;
            s0 = "";
            for (i = 0; i < str.length; i++){
                s = str.charAt(i);
                u = str.charCodeAt(i);
                if (s == " "){s0 += "+";
                } else {
                    if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){
                        s0 = s0 + s;
                    } else {
                        if ((u >= 0x0) && (u <= 0x7f)){
                            s = "0"+u.toString(16);
                            s0 += "%"+ s.substr(s.length-2);
                        } else if (u > 0x1fffff){
                            s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
                            s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
                            s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                            s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                        } else if (u > 0x7ff){
                            s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
                            s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                            s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                        } else {
                            s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
                            s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                        }
                    }
                }
            }
            return s0;
        },//_encodeURL
        _decodeURL = function(str){
            var s0, i, j, s, ss, u, n, f, sss;
            s0 = "";
            for (i = 0; i < str.length; i++){
                s = str.charAt(i);
                if (s == "+"){s0 += " ";}
                else {
                    if (s != "%"){s0 += s;
                    } else {
                        u = 0;
                        f = 1;
                        while (true) {
                            ss = "";
                                for (j = 0; j < 2; j++ ) {
                                    sss = str.charAt(++i);
                                    if (((sss >= "0") && (sss <= "9")) || ((sss >= "a") && (sss <= "f"))  || ((sss >= "A") && (sss <= "F"))) {
                                        ss += sss;
                                    } else {--i; break;}
                                }
                            n = parseInt(ss, 16);
                            if (n <= 0x7f){u = n; f = 1;}
                            if ((n >= 0xc0) && (n <= 0xdf)){u = n & 0x1f; f = 2;}
                            if ((n >= 0xe0) && (n <= 0xef)){u = n & 0x0f; f = 3;}
                            if ((n >= 0xf0) && (n <= 0xf7)){u = n & 0x07; f = 4;}
                            if ((n >= 0x80) && (n <= 0xbf)){u = (u << 6) + (n & 0x3f); --f;}
                            if (f <= 1){break;}
                            if (str.charAt(i + 1) == "%"){ i++ ;}
                            else {break;}
                        }
                    s0 += String.fromCharCode(u);
                    }
                }
            }
            return s0;
        };//_decodeURL



        //Public
        return {
            //domReady function
            domReady : {
                ready : [],
                done : false,
                timer : null,
                add : function (fn) {
                    if (typeof fn !== "function") {
                        return false;
                    }
                    if (this.done) {
                        return fn();
                    }
                    if (this.timer) {
                        this.ready.push(fn);
                    } else {
                        this.ready = [fn];
                        this.timer = setInterval(function () {
                            var d = document,
                            i,
                            l,
                            myFnc,
                            t = Y.JSflat.domReady;
                            if (t.done) {
                                return false;
                            }
                            if (d && d.getElementsByTagName && d.getElementById && d.body) {
                                clearInterval(t.timer);
                                t.timer = null;
                                for (i = 0, l = t.ready.length; i < l; i = i + 1) {
                                    myFnc = t.ready[i];
                                    myFnc();
                                }
                                t.ready = null;
                                t.done = true;
                            }
                        }, 10);
                    }
                }
            },//domReady

            getim : function(setting) {
                if (!setting){
                    return false;
                }
                //Print Area List
                //_printids = setting.printlist;
                //Test Mode
                if(setting.tests){
                    _testparam = setting.tests;
                }
                //Total Ad count
                var maxnum = 0;
                for (var i = 0, len = setting.printlist.length; i < len; i++) {
                    maxnum = maxnum + setting.printlist[i].num - 0;
                }
                if(maxnum === 0){
                    return false;
                }

                //Set Parameter
                var source = setting.imparam.source || '',
                type = setting.imparam.type || '',
                maxCount = maxnum,
                // サンプルになかったパラメータ
                ctxtKeywords = setting.imparam.ctxtKeywords || '',
                ctxtId = setting.imparam.ctxtId || '',
                keywordCharEnc = setting.imparam.keywordCharEnc || '';
                // サンプルになかったパラメータここまで
                //ctxtUrl
                var mytmp = setting.imparam.ctxtUrl || document.URL;
                var ctxtUrl = (document.URLUencoded) ? document.URLUencoded(mytmp) : (window.encodeURIComponent ? encodeURIComponent(mytmp) : _encodeURL(mytmp));
                //ref
                mytmp = setting.imparam.ref || document.referrer;
                var ref = (document.URLUencoded) ? document.URLUencoded(mytmp) : (window.encodeURIComponent ? encodeURIComponent(mytmp) : _encodeURL(mytmp));
                //Output Encode
                var outputCharEnc;
                if(setting.imparam.outputCharEnc){
                    outputCharEnc = setting.imparam.outputCharEnc;
                }else{
                    mytmp = (document.charset || document.characterSet).toUpperCase();
                    if(mytmp === "SHIFT_JIS"){
                        outputCharEnc = "shiftjis";
                    }else if(mytmp === "EUC-JP"){
                        outputCharEnc = "euc-jp";
                    }else{
                        outputCharEnc = "utf8";
                    }
                }
                //script tag charset set
                var JsCharEnc;
                if( outputCharEnc == "shiftjis" ){
                    JsCharEnc = "Shift_JIS";
                }else if( outputCharEnc == "euc-jp" ){
                    JsCharEnc = "EUC-JP";
                }else{
                    JsCharEnc = "UTF-8";
                }
                //Access to YDN API
                var apiUrl = _testparam.imapi || 'http://im.ov.yahoo.co.jp/js_flat/v2/';
                var cbname = "setNormalim" + Math.floor( Math.random() * 100000 );
                setTimeout(function(){
                    var myrandom = (function(){
                        var mynow = new Date();
                        return mynow.getTime() + "_" + Math.floor( Math.random() * 10000 );
                    })();
                    var mytag = document.createElement('script');
                    mytag.charset = JsCharEnc;
                    // サンプルにないパラメータがあったので書き換え
                    mytag.src = apiUrl + '?' + "callback=YAHOO_YDN_V2%2EJSflat%2E"+ cbname + '%2Eprint&source=' + source +'&type='+ type +'&outputCharEnc='+ outputCharEnc +'&maxCount='+ maxCount +'&ctxtKeywords='+ ctxtKeywords +'&ctxtId='+ ctxtId +'&keywordCharEnc='+ keywordCharEnc +'&ctxtUrl='+ ctxtUrl +'&ref='+ ref +'&_='+ myrandom;
                    document.body.appendChild(mytag);
                }, 1);
                //set Callback Fnc
                this[cbname] = (function(_set){
                    return {
                        print : function(_res){
                            var myResult = [],
                            myHTML = "";
                            if(_res && _res.Results && _res.Results.ResultSet && _res.Results.ResultSet.Listing && _res.Results.ResultSet.Listing.length > 0){
                                myResult = _res.Results.ResultSet.Listing;
                            }else{
                                return false;
                            }

                            //Print Area List
                            var printObj = _set;
                            //save count
                            var startnum = 0;

                            //Loop all Print Area
                            for(var s = 0, len_s = printObj.length; s < len_s; s++ ){
                                if(!document.getElementById(printObj[s].name)){
                                    continue;
                                }
                                //max of this Area
                                var max = printObj[s].num;
                                //Make html
                                myHTML = '<div class="YAHOOYDN_Wrap">';
                                var adnum = 0;

                                for(var i=startnum, len=myResult.length; i<len; i++){
                                    if(max <= 0){
                                        break;
                                    }
                                    myHTML += '<a class="YAHOOYDN_Link" target="_top" href="'+ myResult[i].ClickUrl +'">';  //Link URL
                                    myHTML += '<span class="YAHOOYDN_Title">'+ myResult[i].title +'</span>';             //Title
                                    myHTML += '<span class="YAHOOYDN_Body">'+ myResult[i].description +'</span>';                //Body
                                    myHTML += '<span class="YAHOOYDN_URL">'+ myResult[i].siteHost +'</span>';               //View URL
                                    myHTML += '</a>';
                                    max--;
                                    adnum++;
                                    startnum++;
                                }
                                myHTML += '<span class="YAHOOYDN_Copyright"><a href="'+ _res.Results.ResultSet.Label.InquiryUrl +'">'+ _res.Results.ResultSet.Label.LabelText +'</a></span>';    //About YDN
                                myHTML += '</div>';
                                //Print
                                if(adnum > 0){
                                    document.getElementById(printObj[s].name).innerHTML = myHTML;
                                }
                            }
                        }
                    };
                })(setting.printlist);

            }//getim
        };//Public
    })();//Y.JSflat


})();
