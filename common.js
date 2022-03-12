//通过server酱微信公众号向我发送反馈信息
function sendwx() {
    content = document.getElementsByTagName("input")[0].value;
    content = content.trim();
    if (content == "") {
        window.alert("请先填写你的意见哦");
        return 0;
    }

    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    }
    else {
        httpRequest = new ActiveXObject();
    }

    httpRequest.open("POST", "https://sctapi.ftqq.com/SCT84716TArbNMjO7XGDLP4BXV8stYVKL.send?title=FeedBack&desp=" + content, false);
    httpRequest.send();
    console.log(httpRequest.status);

    window.alert("已成功收到您的意见!");
    document.getElementsByTagName("input")[0].value = "";
}

/* 实现根据文章自动生成目录
利用文章中的 h3 标签中的内容作为目录内容，点击即可跳转。仅当检测到 div.article-text>h3 时会生成目录
*/
function createIndex(){
    let indexs = document.querySelectorAll('div.article-text>h3');
    console.log(indexs);
}