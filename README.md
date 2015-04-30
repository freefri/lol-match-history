# League of Legends match history stats viewer
Download all your matches from League of Legends and watch a summary of your stats grouped by champion

## Install Firefox Addon (easy)
Just open Firefox and install the addon from https://addons.mozilla.org/en-US/firefox/addon/lol-match-history-stats/

This addon will transform your League of Legends match history into a table with usefull stats of your normal matches sorted by champion.

1. **Log in** into your LOL account in <a href="http://leagueoflegends.com">leagueoflegends.com</a>
2. Go to your match history and click the addon button in Firefox toolbar.
3. A new tab of your match history will open and in few seconds a table will appear replacing the old tab.

**Pro tip**: you can short the table by clicking the headers. 


### Run javascript manually (hard core)
This script is not using the official Riot API and it should run from leagueoflegends.com In order to do so you will need to use your browser's developer tools. Use the following instructions:

1. Go to http://matchhistory.{REGION}.leagueoflegends.com (remember to change your region: euw, na, etc)
1. Click *login* and enter your user and password
1. Open the developer tool by pressing F12 or doing right click and *Inspect element*
1. In the developer tool go to network and in the bottom press XHR in order to filter the network trafic
1. In the Match History site, click in view my match history (if you already see your matches, just reload the page - F5)
1. In the developer tool you should be able to see how new requests appear. One of them should be something similar to `GET auth?betIndex=0&...`. Click on it and copy the *Authorization* string from *request headers*, you will need to include this code as *{AUTH_CODE}* (The code will be something like `Vapor eyJk...0ifQ`)
1. Get your numeric summoner id from the url of the Match history `http://matchhistory.euw.leagueoflegends.com/en/#match-history/EUW1/{your SUMMONER_ID}`. You will need to replace *{SUMMONER_ID}* with this ID.
1. In the developer tool go to *Console* and **paste the following code** (**Remember to replace** *{AUTH_CODE}*, *{SUMMONER_ID}* and *{REGION}* - the double quotation marks *"* are needed. May be that your region has a number, for example the correct input for euw is **"EUW1"**):

```javascript
var MatchHistory = window.MatchHistory || {};
(function (url, id, cb) {
    if (MatchHistory.download) {if(cb){cb();}return;}
    var d = document, s = 'script',
        js = d.createElement(s),
        fjs = d.getElementsByTagName(s)[0];
    js.id = id;js.src = '//' + url;
    if (!d.getElementById(id)) {
        if (cb) {js.addEventListener('load', function (e) {cb(null, e);}, false);}
        fjs.parentNode.insertBefore(js, fjs);
    } else {if(cb){cb();}}
})('rawgit.com/freefri/lol-match-history/master/src/content/LOLmatch.js', 'lolmatch', function () {
    MatchHistory.authorization = "{AUTH_CODE}";
    MatchHistory.region = "{REGION}";
    MatchHistory.sumID = "{SUMMONER_ID}";
    MatchHistory.download();
});
```
