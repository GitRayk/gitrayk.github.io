function getTips(tips) {
    let tipsElement = document.getElementById("tips");
    tipsElement.style.top = "0%";
    setTimeout(function () { tipsElement.style.top = "-25%" }, 2000);

    tipsElement.firstElementChild.innerHTML = tips;
}

function startGame() {
    //One viewport appear and the other disappear
    document.getElementById("Adventure_main").style.visibility = "visible";
    document.getElementById("Adventure_main").style.opacity = "1";

    document.getElementById("home").style.opacity = "0";
    setTimeout(function () { document.getElementById("home").style.display = "none" }, 1000);

    progress = 0;
    mainViewport = document.getElementById("Adventure_main");
    interactArea = document.getElementById("interact");
    infoArea = document.getElementById("info");
    bottomPosition = document.getElementById("locateBottom");

    //Load the all json resource
    if (window.XMLHttpRequest) {
        eventHttp = new XMLHttpRequest();
        /* talentHttp = new XMLHttpRequest(); */
        adventureHttp = new XMLHttpRequest();
    }
    else {
        eventHttp = new ActiveXObject("Microsoft.XMLHTTP");
        /* talentHttp = new ActiveXObject("Microsoft.XMLHTTP"); */
        adventureHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    eventHttp.onreadystatechange = () => {
        if (eventHttp.readyState == 4 && eventHttp.status == 200) {
            eventList = JSON.parse(eventHttp.responseText);
            commonEventNumber = eventList.length;
        }
    }
    adventureHttp.onreadystatechange = () => {
        if (adventureHttp.readyState == 4 && adventureHttp.status == 200) {
            adventureList = JSON.parse(adventureHttp.responseText);
            adventureNumber = adventureList.length;
        }
    }

    eventHttp.open("POST", "event.json");
    eventHttp.send();
    adventureHttp.open("POST", "adventure.json");
    adventureHttp.send();
}

var eventNumber = 6;    //Every year there will be thingNumber things yielded
/* var commonEventNumber = 25;
var adventureNumber = 9; */

class Player {
    intelligence = 0;
    appearence = 0;
    asset = 0;
    kindness = 0;
    san = 0;    //和克苏鲁事件息息相关
}
player = new Player();

function nextStep() {
    interactArea.innerHTML = "<p>下一步</p>";

    detectEnding();

    if (progress == 0) {
        var p = document.createElement("p");
        p.innerHTML = "你出生了。";
        infoArea.insertBefore(p, bottomPosition);
    }

    if (progress % eventNumber == 0) {
        details = document.createElement("details");
        details.setAttribute("open", "open");

        summary = document.createElement("summary");
        summary.innerHTML = "<b>第" + progress / eventNumber + "年</b>";
        details.appendChild(summary);

        infoArea.insertBefore(details, bottomPosition);

        assetArea = document.createElement("p");
        assetArea.innerHTML = "你的财产: " + player.asset;
        details.appendChild(assetArea);
    }

    //各事件发生概率：
    //普通事件：60%; 奇遇：20%; 物品：15%; 商店：5%
    let rand = Math.random() * 100;
    if (0 <= rand && rand < 60) {
        //抽取事件
        do {
            rand = Math.floor(Math.random() * commonEventNumber);
            eventObj = eventList[rand];
            //判断当前情况下事件是否可能发生
            //若不可能发生，则需要重新抽取事件
            if (eventObj.condition == undefined) {
                break;
            }
        } while (!eval("(" + eventObj.condition + ")")());
        //当抽取到事件时，将其显示到屏幕上
        text = eventObj.name + ": " + eventObj.description;
        if (eventObj.method != undefined) {
            console.log(eventObj.method);
            eval(eventObj.method);
        }
    }
    else if (60 <= rand && rand < 100) {
        //抽取奇遇
        do {
            rand = Math.floor(Math.random() * adventureNumber);
            eventObj = adventureList[rand];
            //判断当前情况下事件是否可能发生
            //若不可能发生，则需要重新抽取事件
            if (eventObj.condition == undefined) {
                break;
            }
        } while (!eval("(" + eventObj.condition + ")")());
        //当抽取到事件时，将其显示到屏幕上
        text = eventObj.description;

        interactArea.onclick = "void(0);";
        eventObj.result[0] += "interactArea.onclick=nextStep;";
        eventObj.result[1] += "interactArea.onclick=nextStep;";

        interactButton = "<button onclick=" + eventObj.result[0] + ">" + eventObj.left + "</button><button onclick=" + eventObj.result[1] + ">" + eventObj.right + "</button>";
        interactArea.innerHTML = interactButton;
    }

    p = document.createElement("p");
    p.innerHTML = text;
    details.appendChild(p);

    //When some new text is added on the mainViewport, we should locate the bottom of the mainViewport
    bottomPosition.scrollIntoView();

    progress++;
    assetArea.innerHTML = "你的财产: " + player.asset;
}

function gameover(reason) {
    if (player.amulet != undefined) {
        p = document.createElement("p");
        p.innerHTML = "你的玉佩碎了，似乎发生了什么";
        details.appendChild(p);

        player.amulet = undefined;
        return 0;
    }

    if (player.kindness >= 10 && player.heaven == undefined && player.infernal == undefined){
        p = document.createElement("p");
        p.innerHTML = "你死后，你的灵魂进入了天堂";
        details.appendChild(p);

        getTips("牌组[天堂]已解锁");
        player.heaven = 1;

        return 0;
    }

    if (player.kindness <= -10 && player.heaven == undefined && player.infernal == undefined){
        p = document.createElement("p");
        p.innerHTML = "你死后，你的灵魂进入了地狱";
        details.appendChild(p);

        getTips("牌组[地狱]已解锁");
        player.infernal = 1;

        return 0;
    }

    interactArea.innerHTML = "<p>" + reason + "</p>";
    interactArea.onclick = function () { document.location.reload() };
}

function greater(a, b) {
    return a > b;
}

function less(a, b) {
    return a < b;
}

function detectEnding(){
    if(player.san <= -6)
    {
        gameover("失心疯");
    }
}