var __version = 0.55;
var __pageSize = 6;
var __maintain = false;
var __isDebug = location.host.indexOf("localhost") != -1 ? true : false;
var __isTest = location.host.indexOf("wx.mrich.com") != -1 ? false : true;
//var __openID = "oS4ZHv8FJVafgAfJgP6KZL90NIS0";
var __openID = "o-d5PuP6ebknxaBUXcAMyeNNRbmk";
var abPath = "http://test.weixin.com";
var __imgServer = "";
if (__isTest) {
    __imgServer = "http://test.mrich.com:8084";
}
else {
    __imgServer = "http://admin.mrich.cn";
}
function checkAuth() {
    if (__maintain) {
        showTip("服务器正在维护中,请耐心等待^_^");
        exit();
    }
    var version = $.cookie("MrichBusinessversion");
    if (!version || version != __version) {
        $.cookie("MrichBusiness", null);
        $.cookie("MrichBusinessversion", __version, { expires: 365, isZero: true });
        removeSessionData("userData");
    }
    var openID = $.cookie("MrichBusiness");
    if (!openID) {
        doAuth()
    }
}

function doAuth() {
    if (__isDebug) {
        $.cookie("MrichBusiness", __openID, { expires: 365, isZero: true });
    }
    else {
        setLocalData("currentUrl", location.href);
        var appID = "";
        if (__isTest) {
            appID = "wx2ef1303a4d310f6d";
        }
        else {
            appID = "wx93822c7fae8481d6";
        }
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appID + "&redirect_uri=" + getServerURL() + abPath + "Mobile/mrich/authWX.html?m=" + parseInt(Math.random() * 1000000) + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
        location.href = url;
        exit();
    }
}

function getOpenID(code) {
    loading(true);
    $.ajax({
        type: "get",
        url: abPath + "/api/MrichUser/GetWXOpenID?code=" + code,
        success: function (data, textStatus, jqXHR) {
            loading(false);
            var result = $.parseJSON(data);
            if (result.Result) {
                $.cookie("MrichBusiness", result.Data, { expires: 365, isZero: true});
                location.replace(getLocalData("currentUrl"));
            }
            else {
                showTip("获取OpenID错误：" + result.Message);
            }
        },
        error: function () {
            loading(false);
            showTip("获取微信验证信息异常");
        }
    });
}

function getUserData(callback) {
    var userDataStr = getSessionData("userData");
    if (userDataStr) {
        (callback && typeof (callback) === "function") && callback.apply();
    }
    else {
        var openID = $.cookie("MrichBusiness");
        loading(true);
        $.ajax({
            url: abPath + "/api/MrichUser/GetUserInfo",
            type: "get",
            data: { openId: openID },
            success: function (data) {
                loading(false);
                var result = JSON.parse(data);
                if (result.Result) {
                    if (result.Status == 1) {
                        setSessionData("userData", JSON.stringify(result.Data));
                        (callback && typeof (callback) === "function") && callback.apply();
                    }
                    else if (result.Status == 0) {
                        if (parseURL(location.href).fileName.toLowerCase() == "bind.html") {
                            (callback && typeof (callback) === "function") && callback.apply();
                        }
                        else {
                            showTip("您还没有绑定用户,请先绑定!", 1500, function () {
                                location.href = "bind.html?m=" + parseInt(Math.random() * 1000000);
                            });
                        }
                    }
                }
                else {
                    showTip(result.Message);
                }
            },
            error: function () {
                loading(false);
                showTip("获取用户数据异常!");
            }
        });
    }
    
}

function doCheck(callback) {
    var fileName = parseURL(location.href).fileName.toLowerCase()
    var openID = $.cookie("MrichBusiness");
    loading(true);
    $.ajax({
        url: abPath + "/api/MrichUser/ValidateUserPermission",
        type: "get",
        data: { openId: openID, fileName: fileName },
        success: function (data) {
            loading(false);
            var result = JSON.parse(data);
            if (result.Result) {
                if (result.Status==-1) {
                    showTip(result.Message);
                    exit();
                }
                else {
                    (callback && typeof (callback) === "function") && callback();
                }
                
            }
            else {
                showTip(result.Message);
                exit();
            }
        },
        error: function () {
            loading(true);
            showTip("验证权限失败!");
        }
    });

}