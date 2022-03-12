/*要将我已经有的页面修改成可以应用暗夜模式，需要修改以下几个地方：
1. 添加更换皮肤的图标 (o)
2. 添加js文件
3. 删除标题中尼伯龙根里的style
4. 正确的url
5. 在电脑端使用的css那里增加class="sheet" 
目前该模式仅支持电脑端*/

function shiftSkin() {
    if (isNightSkin == "true") {
        var PathPosition = document.getElementsByClassName("sheet")[0].href.lastIndexOf("/");
        var path = document.getElementsByClassName("sheet")[0].href.substring(0, PathPosition) + "/night.css";
    }
    else{
        var PathPosition = document.getElementsByClassName("sheet")[0].href.lastIndexOf("/");
        var path = document.getElementsByClassName("sheet")[0].href.substring(0, PathPosition) + "/sheet.css";     
    }
    document.getElementsByClassName("sheet")[0].href = path;
    var expires = new Date();
    expires.setTime(expires.getTime() + 12*60*60*1000); //cookie的有效期为12小时
    document.cookie = "NightSkin=" + isNightSkin + "; expires=" + expires.toUTCString() + "; path=/";
}

function getCookie(key) {
    key = key + "=";
    var cookiesList = document.cookie;
    cookiesList = cookiesList.split(";");
    for (var i = 0; i < cookiesList.length; i++) {
        if (-1 == cookiesList[i].trim().indexOf(key)) {
            continue
        }
        else {
            return cookiesList[i].trim().substring(key.length, cookiesList[i].trim().length);
        }
    }
    return false;
}

var isNightSkin = getCookie("NightSkin");  //表示是否开启暗夜模式

if ("true" == isNightSkin){
    shiftSkin();
}

var clickSkin = ()=>{
    if (isNightSkin == "true"){
        isNightSkin = "false";
    }
    else{
        isNightSkin = "true";
    }
    shiftSkin();
}