httpRequestObserver = {
    isRunning : false,
    observe: function (subject, topic, data) {
        if (topic != "http-on-modify-request") {
            return;
        }

        onAuthorizationCatched(subject);
    },

    register: function() {
        var observerService = Cc["@mozilla.org/observer-service;1"]
            .getService(Ci.nsIObserverService);
        observerService.addObserver(this, "http-on-modify-request", false);
        this.isRunning = true;
        console.log('register');
    },

    unregister: function() {
        var observerService = Cc["@mozilla.org/observer-service;1"]
            .getService(Ci.nsIObserverService);
        observerService.removeObserver(this, "http-on-modify-request");
        this.isRunning = false;
        console.log('unregister');


    }
};

function onAuthorizationCatched (subject) {
    var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
    var authorization, urlArray, summonerID, region;
    try {
        authorization = httpChannel.getRequestHeader('Authorization');
        urlArray = window.location.href.split('/');
        summonerID = urlArray.pop();
        region = urlArray[urlArray.length - 1];

        httpRequestObserver.unregister();

        console.log('Authorization2', region, summonerID, authorization);
        MatchHistory.authorization = authorization;
        MatchHistory.region = region;
        MatchHistory.sumID = summonerID;

        MatchHistory.download();

    } catch(e){
        //console.error(e.message)
    }
}

function btnClicked () {
    window = doc.defaultView.content;

    include(thisAddon, "content/LOLmatch.js");

    var currentUrl = window.location.href;
    var regex = new RegExp("//matchhistory.[a-z]{2,4}.leagueoflegends.com/");
    if (regex.test(currentUrl)) {
        httpRequestObserver.register();
        doc.defaultView.openUILinkIn(currentUrl, 'tab');
        window.setTimeout(function () {
            // automatic uregister after a while
            if (httpRequestObserver.isRunning) {
                httpRequestObserver.unregister();
                window.confirm('Needed data not found. You must to log in and open your match history and click again');
            }
        }, 10000);
    } else {
        var answer = window.confirm('Log in and open your match history and click again');
        if (answer) {
            window.location = 'https://leagueoflegends.com';
        } else {
            //window.alert("Goodbye.")
        }
    }
}

function addToolbarBtn(buttonId, label, iconPath, tooltipTxt) {

    var toolbox = doc.querySelector('#navigator-toolbox');

    var button = doc.getElementById(buttonId);
    if (!button) {
        // create the button only once
        button = doc.createElement('toolbarbutton');
        button.setAttribute('id', buttonId);
        button.setAttribute('label', label);
        if (tooltipTxt) {
            button.setAttribute('tooltiptext', tooltipTxt);
        }
        button.setAttribute('class', 'toolbarbutton-1 chromeclass-toolbar-additional');
        button.style.listStyleImage = 'url("'+iconPath+'")';
        button.addEventListener('command', btnClicked, false);

        toolbox.palette.appendChild(button);
    }

    //move button into last postion in nav-bar
    var navBar = doc.querySelector('#nav-bar');
    navBar.insertItem(buttonId);
    navBar.removeChild(button);
}
